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
          token: '',
          type: 1
        }
      }
      login.data.token = that.getToken().token
      log.writeFile(JSON.stringify(login))
      that.socketTask.send({
        data: JSON.stringify(login),
        success() {
          // console.log('连接成功', host, siteid)
        }
      })
    }
    this.onMessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.cmd == 'login') {
        log.writeFile(JSON.stringify(data))
        let code = data.response.code
        if (code == 0) {
          console.log('登录成功', host, siteid)
          this.loginok = true
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
          log.writeFile(JSON.stringify(data))
          this.onChat(data)
        } else if (data.cmd == 'notify') {
          log.writeFile(JSON.stringify(data))
          this.onNotify(data)
        } else if (data.cmd == 'heartbeat') {
          log.writeFile(JSON.stringify(data))
          this.heartCheck()
        } else if (data.cmd == 'revoke') {
          this.onRevoke(data)
        }
      }
    }
    this.onReconnect = () => {}
    this.onLogin = (data) => {}
    this.onChat = (data) => {}
    this.onNotify = (data) => {}
    this.onRevoke = (data) => {}

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
          log.writeFile('refreshToken' + JSON.stringify(res.data))
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
    log.writeFile(url)
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
      log.writeFile('onClose')
      that.onClose()
      that.reconnect()
    })
    that.socketTask.onError((e) => {
      // console.error('onError', that.ip, that.siteid, e)
      log.writeFile('onError')
      that.onError()
      that.reconnect()
    })
    that.socketTask.onOpen(() => {
      log.writeFile('onOpen')
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

  send(msg) {
    this.socketTask.send(msg)
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
      this.send({
        data: JSON.stringify(heartbeat)
      })
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
    that.heartReset()
    that.socketTask.close({
      success(res) {
        // console.log('关闭成功', that.ip)
        log.writeFile('关闭成功', res)
      },
      fail(err) {
        // console.error('关闭失败', that.ip)
        log.writeFile('关闭失败', err)
      }
    })
  }

  closez() {
    let that = this
    that.socketTask.close({
      success(res) {
        log.writeFile('关闭成功', res)
      },
      fail(err) {
        log.writeFile('关闭失败', err)
      }
    })
  }
}

module.exports = Websocket
