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
  onClientFetchUserDatas(state, payload) {
    if (state.userDatas[(payload.UID)]) {
      if (state.userDatas[(payload.UID)].isFetching) return false
      else if (state.userDatas[(payload.UID)].isFetched) return state.userDatas[(payload.UID)]
    }
    vue.set(state.userDatas, payload.UID, {
      isFetching: true
    })
    importedJS.Library.Socket.getSocket("app").socket.emit("App:onClientFetchUserDatas", payload.UID)
    return false
  }
}

export const mutations = {
  setUserDatas(state, payload) {
    payload.isFetched = true
    vue.set(state.userDatas, payload.UID, payload)
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:onClientFetchUserDatas", function(userDatas) {
    console.log("Recieved user datas...")
    console.log(userDatas)
    //$nuxt.$store.commit("users/setUserDatas", userDatas)
  })
}, false)