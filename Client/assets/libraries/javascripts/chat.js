/*----------------------------------------------------------------
     Resource: vCommunity-Client
     Script: assets: libraries: javascripts: chat.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Chat Library
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

const vue = require("vue").default
const utilityHandler = require("./utility")


/*--------------------
-->> Chat Library <<--
--------------------*/

module.exports = {
  push: function(containerData, messagesData, callbackHandler) {
    if (!containerData || !messagesData) return false

    if (messagesData.isPostLoad) messagesData.postLoadIndex = 0
    Array.from(messagesData.messages).forEach(function(messageData) {
      let containerREF = (messagesData.isPostLoad && containerData[messagesData.postLoadIndex]) || containerData[(containerData.length - 1)]
      let isContainerInvalid = (messagesData.isPostLoad && !messagesData.isPostLoaded) || !containerREF
      let isOwnerValid = containerREF && (messageData.owner != containerREF.owner)
      isContainerInvalid = isContainerInvalid || isOwnerValid

      if (!isContainerInvalid) {
        const parsedMS = utilityHandler.parseMS((new Date(messageData.createdAt)) - (new Date(containerREF.ownerMessages[(Object.keys(containerREF.ownerMessages)[0])].createdAt)))
        if ((parsedMS.hours > 0) || (parsedMS.minutes > 5)) isContainerInvalid = true
      }
      if (isContainerInvalid) {
        const appendData = {
          owner: messageData.owner,
          ownerMessages: {}
        }
        if (messagesData.isPostLoad) {
          if (messagesData.isPostLoaded && isOwnerValid) messagesData.postLoadIndex = messagesData.postLoadIndex + 1
          messagesData.isPostLoaded = true
          containerData.splice(messagesData.postLoadIndex, 0, appendData)
        } else {
          containerData.push(appendData)
        }
      }
      containerREF = (messagesData.isPostLoad && containerData[messagesData.postLoadIndex]) || containerData[(containerData.length - 1)]
      vue.set(containerREF.ownerMessages, messageData.UID, messageData)
      if (callbackHandler) callbackHandler(messageData)
    })
    return true
  }
}