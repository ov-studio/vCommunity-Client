/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: views: contacts.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Contacts
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
  userContacts: {} 
})

export const actions = {
  onClientProcessOption(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit(payload.optionData.event, payload.UID, payload.optionData.type)
  },

  onClientProcessInvitation(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit(payload.optionData.event, payload.username, payload.optionData.type)
  }
}

export const mutations = {
  onSyncContacts(state, contacts) {
    vue.set(state.userContacts, "userContacts", {})
    Object.entries(contacts).forEach(async function(contactCategory) {
      vue.set(state.userContacts, contactCategory[0], {})
      contactCategory[1].forEach(async function(contactData) {
        vue.set(state.userContacts[(contactCategory[0])], contactData.UID, contactData)
      })
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:onSyncContacts", function(contacts) {
    $nuxt.$store.commit("views/contacts/onSyncContacts", contacts)
  })
}, false)