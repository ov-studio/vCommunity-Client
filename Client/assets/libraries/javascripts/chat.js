/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: assets: libraries: javascripts: chat.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Chat Library
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

import vue from "vue"


/*--------------------
-->> Chat Library <<--
--------------------*/


export function push(containerData, messagesData, callbackHandler) {
    if (!containerData || !messagesData) return false

    if (messagesData.isPostLoad) messagesData.postLoadIndex = 0
    Array.from(messagesData.messages).forEach(function(messageData) {
      let containerREF = (messagesData.isPostLoad && containerData[messagesData.postLoadIndex]) || containerData[(containerData.length - 1)]
      let isContainerInvalid = (messagesData.isPostLoad && !messagesData.isPostLoaded) || !containerREF
      let isOwnerValid = containerREF && (messageData.owner != containerREF.owner)
      isContainerInvalid = isContainerInvalid || isOwnerValid

      if (!isContainerInvalid) {
          //TOOD: TIME PARSNG HERE
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