/*
 * @Descripttion: 封装 websocket
 * @Author: SUI
 */

let log = require('@/common/log.js')

class Websocket {
  constructor(host, edge, siteid, c3id) {
    // console.log(host, edge, siteid, c3id)
    let index = host.indexOf('://')
    if (index == -1) {
      this.scheme = 'http'
      this.ip = host
    } else {
      this.scheme = host.substring(0, index)
      this.ip = host.substring(index + 3)
    }
    this.edge = edge
    this.siteid = siteid
    this.c3id = c3id
    this.userId = uni.getStorageSync('userId')
    this.socketTask = null
    this.pingTimeout = 5000
    this.pongTimeout = 1000
    this.reconnectTimeout = 5000
    this.loginTimeout = 2000
    this.loginok = false
    this.onClose = () => {}
    this.onError = () => {}
    this.onOpen = () => {
      let that = this
      let login = {
        cmd: 'login',
        seq: that.sendId(),
        data: {
          token: that.getToken().token,
          type: 1
        }
      }
      if (that.edge) log.writeFile(JSON.stringify(login))
      that.sendTask(JSON.stringify(login), 'login')
    }
    this.sendPull = () => {
      let that = this
      let pull = {
        cmd: 'pull',
        seq: that.sendId(),
        data: {}
      }
      if (that.edge) log.writeFile(JSON.stringify(pull))
      that.sendTask(JSON.stringify(pull))
    }
    this.onMessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.cmd == 'login') {
        if (this.edge) log.writeFile(JSON.stringify(data))
        let code = data.response.code
        if (code == 0) {
          console.log('登录成功', this.ip, this.siteid)
          this.loginok = true
          this.sendPull()
          this.onLogin(data.response.data)
          this.loginReset()
          this.heartCheck()
        } else if (code == 255) {
          // token expire
          this.refreshToken()
        } else {
          // invalid
        }
      } else {
        if (data.cmd == 'msg') {
          if (this.edge) log.writeFile(JSON.stringify(data))
          this.onChat(data)
        } else if (data.cmd == 'notify') {
          if (this.edge) log.writeFile(JSON.stringify(data))
          this.onNotify(data)
        } else if (data.cmd == 'heartbeat') {
          if (this.edge) log.writeFile(JSON.stringify(data))
          this.heartCheck()
        } else if (data.cmd == 'revoke') {
          this.onRevoke(data)
        } else if (data.cmd == 'pull') {
          this.onPull(data.response.data)
        }
      }
    }
    this.onReconnect = () => {}
    this.onLogin = (data) => {}
    this.onChat = (data) => {}
    this.onNotify = (data) => {}
    this.onRevoke = (data) => {}
    this.onPull = (data) => {}

    this.createWebSocket()
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  sendId() {
    let timeStamp = new Date().getTime()
    let randId = this.randomNumber(100000, 999999)
    let id = timeStamp + '-' + randId
    return id
  }

  refreshToken() {
    let that = this
    let { scheme, ip, siteid, c3id } = that
    let url = `${scheme}://${ip}/${siteid}/user/refresh_token`
    let refresh_token = that.getToken().refresh_token
    uni.request({
      url: url,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      sslVerify: false,
      data: { refresh_code: refresh_token, c3id: c3id },
      success(res) {
        if (res.statusCode == 200) {
          if (that.edge) log.writeFile('refreshToken' + JSON.stringify(res.data))
          if (res.data.code == 0) {
            let tokenObj = {
              token: res.data.AccessToken,
              refresh_token: refresh_token
            }
            that.setToken(tokenObj)
          }
        }
      }
    })
  }

  getToken() {
    return uni.getStorageSync('token')
  }

  setToken(token) {
    uni.setStorageSync('token', token)
  }

  createWebSocket() {
    let that = this
    let { scheme, ip, siteid } = that
    that.loginok = false
    let url = `${scheme}://${ip}/${siteid}/ws`
    if (that.edge) log.writeFile(url)
    that.socketTask = uni.connectSocket({
      url: url,
      complete: () => {
        that.registerEvent()
      }
    })
  }

  //注册心跳和钩子函数
  registerEvent() {
    let that = this
    that.socketTask.onClose((e) => {
      // console.warn('onClose', that.ip, that.siteid, e)
      if (that.edge) log.writeFile('onClose')
      that.onClose()
      that.reconnect()
    })
    that.socketTask.onError((e) => {
      // console.error('onError', that.ip, that.siteid, e)
      if (that.edge) log.writeFile('onError')
      that.onError()
      that.reconnect()
    })
    that.socketTask.onOpen(() => {
      if (that.edge) log.writeFile('onOpen')
      that.onOpen()
      that.loginCheck()
    })
    that.socketTask.onMessage((event) => {
      that.onMessage(event)
    })
  }

  reconnect() {
    if (this.lockReconnect || this.forbidReconnect) return
    this.lockReconnect = true
    this.onReconnect()
    setTimeout(() => {
      this.createWebSocket()
      this.lockReconnect = false
    }, this.reconnectTimeout)
  }

  sendTask(data, action) {
    this.socketTask.send({
      data,
      success() {
        let text = ''
        if (action === 'login') text = '连接成功'
        // console.log(text, host, siteid)
      }
    })
  }

  heartCheck() {
    this.heartReset()
    this.heartStart()
  }

  loginCheck() {
    this.loginReset()
    this.loginStart()
  }

  heartStart() {
    if (this.forbidReconnect) return
    this.pingTimeoutId = setTimeout(() => {
      let heartbeat = {
        cmd: 'heartbeat',
        seq: this.sendId()
      }
      this.sendTask(JSON.stringify(heartbeat))
      this.pongTimeoutId = setTimeout(() => {
        this.socketTask.close()
      }, this.pongTimeout)
    }, this.pingTimeout)
  }

  heartReset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }

  loginReset() {
    clearTimeout(this.loginTimeoutId)
  }

  loginStart() {
    if (this.forbidReconnect) return
    this.loginTimeoutId = setTimeout(() => {
      this.socketTask.close()
    }, this.loginTimeout)
  }

  close() {
    let that = this
    that.forbidReconnect = true
    that.ip = ''
    that.heartReset()
    that.socketTask.close({
      success(res) {
        // console.log('关闭成功', that.ip)
        if (that.edge) log.writeFile('关闭成功', res)
      },
      fail(err) {
        // console.error('关闭失败', that.ip)
        if (that.edge) log.writeFile('关闭失败', err)
      }
    })
  }

  closez() {
    let that = this
    that.socketTask.close({
      success(res) {
        if (that.edge) log.writeFile('关闭成功', res)
      },
      fail(err) {
        if (that.edge) log.writeFile('关闭失败', err)
      }
    })
  }
}

module.exports = Websocket
