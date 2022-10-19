/*
 * @Descripttion: 封装 websocket
 * @Author: SUI
 * @Date: 2021-11-03 17:03:06
 * @LastEditors: SUI
 * @LastEditTime: 2021-11-03 17:03:16
 * @FilePath: \demo-big-screen\src\common\websocket.js
 */

let Socket = ''
let setIntervalWesocketPush = null

/**初始化 */
export const resetSocket = () => {
  Socket = ''
}


/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = (url, data) => {
  Socket && Socket.close()
  console.log(Socket);
  if (!Socket) {
    console.log(url, data);
    if (url === undefined) {
      url = window.localStorage.getItem("wsUrl")
    }
    if (data === undefined) {
      data = window.localStorage.getItem("wsData")
    }
    console.log(url, data);
    Socket = new WebSocket(url)
    console.log('建立websocket连接')
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS

    // 发送数据
    sendWSPush(data)
  } else {
    console.log('websocket已连接')
  }
}

/**打开WS之后发送心跳 */
const onopenWS = () => {
  // sendPing()
}

/**连接失败重连 */
const onerrorWS = () => {
  console.log(Socket);
  Socket && Socket.close()
  clearInterval(setIntervalWesocketPush)
  console.log('连接失败重连中')
  if (Socket.readyState !== 3) {
    Socket = null
    createSocket()
  }
}

/**WS数据接收统一处理 */
const onmessageWS = e => {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e.data
    }
  }))
}

/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
  setTimeout(() => {
    if (Socket) {
      if (Socket.readyState === 0) {
        connecting(message)
      } else {
        if (typeof message === 'string') {
          Socket.send(message)
        } else {
          Socket.send(JSON.stringify(message))
        }
      }
    }
  }, 1000)
}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
  if (Socket !== null && Socket.readyState === 3) {
    Socket && Socket.close()
    createSocket()
  } else if (Socket.readyState === 1) {
    if (typeof message === 'string') {
      Socket.send(message)
    } else {
      Socket.send(JSON.stringify(message))
    }
  } else if (Socket.readyState === 0) {
    connecting(message)
  }
}

/**断开重连 */
const oncloseWS = () => {
  clearInterval(setIntervalWesocketPush)
  console.log('websocket已断开....正在尝试重连')
  if (Socket.readyState !== 2) {
    Socket = null
    setTimeout(() => {
      createSocket()
    }, 10000);
  }
}

/**发送心跳
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 5000, ping = 'ping') => {
  clearInterval(setIntervalWesocketPush)
  // Socket.send(ping)
  setIntervalWesocketPush = setInterval(() => {
    Socket.send(ping)
  }, time)
}