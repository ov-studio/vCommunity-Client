/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: users.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Users
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
  userDatas: {}
})

export const mutations = {
  onFetchUserDatas(state, UID) {
    vue.set(state.userDatas, UID, {
      isFetching: true
    })
    importedJS.Library.Socket.getSocket("app").socket.emit("App:User:Datas:OnSync", UID)
  },

  onSyncUserDatas(state, payload) {
    payload.isFetched = true
    vue.set(state.userDatas, payload.UID, payload)
  }
}

export const getters = {
  getUserData: (state) => (UID, ...parameters) => {
    if (!UID) return false

    if (state.userDatas[UID]) {
      if (state.userDatas[UID].isFetching) return false
      else if (state.userDatas[UID].isFetched) return importedJS.Library.Utility.getObjectData(state.userDatas[UID], ...parameters)
    }
    $nuxt.$store.commit("users/onFetchUserDatas", UID)
    return false
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:User:Datas:OnSync", function(...parameters) {
    $nuxt.$store.commit("users/onSyncUserDatas", ...parameters)
  })
}, false)