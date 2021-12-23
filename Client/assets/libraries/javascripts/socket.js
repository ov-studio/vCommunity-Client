/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: assets: libraries: javascripts: socket.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Socket Library
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

const socketIO = require("socket.io-client")
const {socketDatas} = require("@/assets/configs/javascripts/generic")
const socketBuffer = {}


/*----------------------
-->> Socket Library <<--
----------------------*/

const CSocket = {
  io: socketIO,

  create: function(socketName) {
    if (!socketName || !socketDatas[socketName] || socketBuffer[socketName]) return false

    const cSocket = socketIO.connect(socketDatas[socketName].url)
    const cSocketData = {
      name: socketName,
      socket: cSocket
    }
    socketBuffer[socketName] = cSocketData
    return cSocketData
  },

  destroy: function(socketName) {
    if (!socketName || !socketDatas[socketName] || !socketBuffer[socketName]) return false

    socketBuffer[socketName].socket.disconnect()
    delete socketBuffer[socketName]
    return true
  },

  getSocket: function(socketName) {
    if (!socketName || !socketDatas[socketName] || !socketBuffer[socketName]) return false

    return socketBuffer[socketName]
  },

  isConnected: function(socketName) {
    if (!socketName || !socketDatas[socketName] || !socketBuffer[socketName]) return false

    return socketBuffer[socketName].socket.connected
  }
}

Object.entries(socketDatas).forEach(function(socketData) {
  if (socketData[1].autoConnect) CSocket.create(socketData[0])
})

module.exports = CSocket