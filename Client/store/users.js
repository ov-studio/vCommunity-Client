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

export const actions = {
  onSyncUserDatas(state, payload) {
    if (state.state.userDatas[(payload.UID)]) {
      if (state.state.userDatas[(payload.UID)].isFetching) return false
      else if (state.state.userDatas[(payload.UID)].isFetched) return state.state.userDatas[(payload.UID)]
    }
    state.commit("onFetchUserDatas", payload)
    return false
  }
}

export const mutations = {
  onFetchUserDatas(state, payload) {
    vue.set(state.userDatas, payload.UID, {
      isFetching: true
    })
    importedJS.Library.Socket.getSocket("app").socket.emit("App:User:Datas:OnSync", payload.UID)
  },

  onSyncUserDatas(state, payload) {
    payload.isFetched = true
    vue.set(state.userDatas, payload.UID, payload)
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:User:Datas:OnSync", function(userDatas) {
    $nuxt.$store.commit("users/onSyncUserDatas", userDatas)
  })
}, false)