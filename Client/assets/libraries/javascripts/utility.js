/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: assets: libraries: javascripts: utility.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Utility Library
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

const CSocket = require("./socket")


/*-------------------
-- Utility Library --
-------------------*/

exports.getFileExtension = function(url) {
  if (!url) return false

  let index = url.lastIndexOf("/")
  if (index != -1) url = url.substring(index + 1)
  index = url.indexOf("?")
  if (index != -1) url = url.substring(0, index)
  index = url.indexOf("#")
  if (index != -1) url = url.substring(0, index)
  index = url.lastIndexOf(".")
  return (index != -1) ? url.substring(index + 1) : ""
}

exports.getObjectData = function(object, ...parameters) {
  if (!object || (typeof(object) != "object")) return false

  if (parameters.length <= 1) {
    if (parameters[0]) return object[(parameters[0])]
    else return object
  } else {
    return getObjectData(object[(parameters[0])], ...parameters.slice(1))
  }
}

exports.clearObjectStrings = function(object, isRecursive) {
  if (!object || (typeof(object) != "object")) return false

  Object.entries(object).forEach(function(objectData) {
    const dataType = typeof(objectData[1])
    if (dataType == "object") {
      exports.clearObjectStrings(objectData[1], isRecursive)
    } else if (dataType == "string") {
      object[(objectData[0])] = ""
    }
  })
  return true
}

exports.parseMS = function(milliseconds) {
  if (!milliseconds) return false

  return {
    hours: Math.floor((milliseconds/(1000*60 *60)) % 24),
    minutes: Math.floor((milliseconds/(1000*60)) % 60),
    seconds: Math.floor((milliseconds/1000) % 60),
    milliseconds: parseInt((milliseconds%1000) / 100)
  }
}

exports.isDateValid = function(date) {
  if (!date || (typeof(date) != "object")) return false

  const cDate = new Date(date.year + "/" + date.month + "/" + date.day)
  return ((cDate != "Invalid Date") && (!isNaN(cDate)) && cDate) || false
}

exports.isAgeValid = function(date, age) {
  if (!exports.isDateValid(date) || !age || !Number.isInteger(age) || age <= 0) return false

  const nDate = new Date(), cDate = new Date(date.year + "/" + date.month + "/" + date.day)
  const yearDifference = nDate.getFullYear() - cDate.getFullYear()
  if (yearDifference < age) return false
  if (yearDifference == age) {
    const monthDifference = nDate.getMonth() - cDate.getMonth()
    if (monthDifference < 0) return false
    if (monthDifference == 0) {
      if (nDate.getDate() < cDate.getDate()) return false
    }
  }
  return true, yearDifference
}

exports.unsubSocketBuffer = function(buffer) {
  if (!buffer || (typeof(buffer) != "object")) return false

  Object.entries(buffer).forEach(function(socketCategory) {
    let cSocket = CSocket.getSocket(socketCategory[0])
    if (cSocket) {
      Object.entries(socketCategory[1]).forEach(function(socketData) {
        cSocket.socket.off(socketData[0])
      })
    }
  })
  return true
}

exports.clearTimerBuffer = function(buffer) {
  if (!buffer || (typeof(buffer) != "object")) return false

  Object.entries(buffer).forEach(function(timerCategory) {
    Object.entries(timerCategory[1]).forEach(function(timer) {
      clearTimeout(timer[1])
    })
  })
  return true
}