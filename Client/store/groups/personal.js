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
  onClientActionInput(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Personal:onClientActionInput", payload)
  }
}

export const mutations = {
  onSyncGroups(state, groups) {
    vue.set(state, "userGroups", {})
    groups.forEach(function(groupData) {
      groupData.messages = []
      vue.set(state.userGroups, groupData.UID, groupData)
    })
  },

  onSyncMessages(state, groupMessages) {
    if (!state.userGroups[(groupMessages.UID)]) return false

    Array.from(groupMessages.messages).forEach(function(messageData) {
      let lastArrayRef = state.userGroups[(groupMessages.UID)].messages[(state.userGroups[(groupMessages.UID)].messages.length - 1)]
      let isArrayToBeAppended = !lastArrayRef || (messageData.owner != lastArrayRef.owner)
      if (!isArrayToBeAppended) {
        const parsedMS = importedJS.Library.Utility.parseMS(messageData.timestamp - lastArrayRef.ownerMessages[(Object.keys(lastArrayRef.ownerMessages)[0])].timestamp)
        if ((parsedMS.hours > 0) || (parsedMS.minutes > 5)) isArrayToBeAppended = true
      }
      if (isArrayToBeAppended) {
        vue.set(state.userGroups[(groupMessages.UID)].messages, state.userGroups[(groupMessages.UID)].messages.length, {
          owner: messageData.owner,
          ownerMessages: {}
        })
      }

      lastArrayRef = state.userGroups[(groupMessages.UID)].messages[(state.userGroups[(groupMessages.UID)].messages.length - 1)]
      vue.set(lastArrayRef.ownerMessages, messageData.UID, messageData)
      let isMessagesToBeScrolled = true //TODO: MODIFY THIS LATER
      if ($nuxt.$store.state.auth.userCredentials && ($nuxt.$store.state.auth.userCredentials.UID == messageData.owner)) {
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
  appSocket.socket.on("App:Groups:Personal:onSync", function(groups) {
    $nuxt.$store.commit("groups/personal/onSyncGroups", groups)
  })
  appSocket.socket.on("App:Groups:Personal:onSyncMessages", function(groupMessages) {
    $nuxt.$store.commit("groups/personal/onSyncMessages", groupMessages)
  })
}, false)