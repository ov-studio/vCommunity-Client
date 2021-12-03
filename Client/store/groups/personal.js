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
  personalGroups: {} 
})

export const actions = {
  /*
  onClientProcessOption(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit(payload.optionData.event, payload.UID, payload.optionData.type)
  }
  */
}

export const mutations = {
  onSyncGroups(state, groupData) {
    console.log(groupData)
    if (!state.personalGroups[(groupData.groupUID)]) {
      const groupUID = groupData.groupUID
      delete groupData.groupUID 
      vue.set(state.personalGroups, groupUID, groupData)
    }
    Object.entries(groupData.groupMessages).forEach(async function(messageData) {
      state.personalGroups[(groupData.groupUID)].messages[(messageData[0])] = {UID: messageData[0], message: messageData[1].message}
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:onSyncPersonalGroups", function(groupData) {
    $nuxt.$store.commit("groups/personal/onSyncGroups", groupData)
  })
  // TODO: ... WIP
  appSocket.socket.on("roomTestEmit", function(something) {
    console.log("Room Test STARTED? ")
  })
}, false)