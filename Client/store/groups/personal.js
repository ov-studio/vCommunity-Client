/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: groups: personal.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Personal Groups
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

import vue from "vue"
import * as importedJS from "@/assets/import"


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  userGroups: {}
})

export const actions = {
  onClientFetchMessages(state, payload) {
    if (!state.state.userGroups[(payload.UID)]) return false
    payload.messageUID = Object.keys(state.state.userGroups[(payload.UID)].messages[0].ownerMessages)[0]
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Personal:onClientFetchMessages", payload)
  },

  onClientSendMessage(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Personal:onClientSendMessage", payload)
  }
}

export const mutations = {
  onSyncGroups(state, groups) {
    vue.set(state, "userGroups", {})
    Array.from(groups).forEach(function(groupData) {
      groupData.messages = []
      vue.set(state.userGroups, groupData.UID, groupData)
    })
  },

  onSyncMessages(state, groupMessages) {
    if (!state.userGroups[(groupMessages.UID)] || (groupMessages.messages.length <= 0)) return false
    if (groupMessages.isPostLoad) groupMessages.postLoadIndex = 0

    Array.from(groupMessages.messages).forEach(function(messageData) {
      let containerREF = state.userGroups[(groupMessages.UID)].messages
      containerREF = (groupMessages.isPostLoad && containerREF[groupMessages.postLoadIndex]) || containerREF[(containerREF.length - 1)]
      let isContainerValid = (groupMessages.isPostLoad && !groupMessages.isPostLoaded) || !containerREF
      let isOwnerValid = containerREF && (messageData.owner != containerREF.owner)
      isContainerValid = isContainerValid || isOwnerValid
      if (!isContainerValid) {
        // TODO: THIS IS BUGGY FOR NOW..
        //const parsedMS = importedJS.Library.Utility.parseMS(messageData.timestamp - containerREF.ownerMessages[(Object.keys(containerREF.ownerMessages)[0])].timestamp)
        //if ((parsedMS.hours > 0) || (parsedMS.minutes > 5)) isContainerValid = true
      }
      if (isContainerValid) {
        const appendData = {
          owner: messageData.owner,
          ownerMessages: {}
        }
        if (groupMessages.isPostLoad) {
          if (groupMessages.isPostLoaded && isOwnerValid) groupMessages.postLoadIndex = groupMessages.postLoadIndex + 1
          groupMessages.isPostLoaded = true
          state.userGroups[(groupMessages.UID)].messages.splice(groupMessages.postLoadIndex, 0, appendData)
        } else {
          state.userGroups[(groupMessages.UID)].messages.push(appendData)
        }
      }

      containerREF = state.userGroups[(groupMessages.UID)].messages
      containerREF = (groupMessages.isPostLoad && containerREF[groupMessages.postLoadIndex]) || containerREF[(containerREF.length - 1)]
      vue.set(containerREF.ownerMessages, messageData.UID, messageData)
      let isMessagesToBeScrolled = false
      if (groupMessages.isPostLoad && ($nuxt.$store.state.auth.userCredentials.UID == messageData.owner)) {
        isMessagesToBeScrolled = true
      }
      if (isMessagesToBeScrolled) dispatchEvent(importedJS.Generic.eventDatas.messageView.forcescroll.event)
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:Groups:Personal:onSync", function(...paramaters) {
    $nuxt.$store.commit("groups/personal/onSyncGroups", ...paramaters)
  })
  appSocket.socket.on("App:Groups:Personal:onSyncMessages", function(...paramaters) {
    $nuxt.$store.commit("groups/personal/onSyncMessages", ...paramaters)
  })
}, false)