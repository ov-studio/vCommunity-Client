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
  /*
  onSyncContacts(state, contacts) {
    Object.entries(contacts).forEach(async function(contactCategory) {
      vue.set(state.userContacts, contactCategory[0], {})
      Object.entries(contactCategory[1]).forEach(async function(contactData) {
        state.userContacts[(contactCategory[0])][(contactData[0])] = {name: contactData[0], avatar: "https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg"}
      })
    })
  }
  */
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  /*
  appSocket.socket.on("App:onSyncContacts", function(contacts) {
    $nuxt.$store.commit("views/contacts/onSyncContacts", contacts)
  })
  */
  // TODO: ... WIP
  appSocket.socket.on("roomTestEmit", function(something) {
      console.log("WOW TIS STARTED? ")
    //$nuxt.$store.commit("views/contacts/onSyncContacts", contacts)
  })
}, false)