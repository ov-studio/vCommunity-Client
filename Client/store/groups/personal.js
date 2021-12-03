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

//import vue from "vue"
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
  onSyncGroup(state, groupData) {
    if (!state.personalGroups[(groupData.UID)]) vue.set(state.personalGroups, groupData.UID, {})
    Object.entries(groupData.messages).forEach(async function(messageData) {
      state.personalGroups[(groupData.UID)].messages[(messageData[0])] = {name: messageData[0], message: messageData[1].message}
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:onSyncPersonalGroup", function(groupData) {
    $nuxt.$store.commit("groups/personal/onSyncGroup", groupData)
  })
  // TODO: ... WIP
  appSocket.socket.on("roomTestEmit", function(something) {
      console.log("Room Test STARTED? ")
  })
}, false)