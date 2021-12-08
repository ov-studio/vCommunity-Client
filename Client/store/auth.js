/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: auth.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Auth
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

import * as importedJS from "@/assets/import"


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  isAuthNetworked: false,
  userCredentials: false
})

export const actions = {
  onClientLogin(state, payload) {
    return importedJS.Library.Socket.getSocket("auth").socket.emit("Auth:onClientLogin", payload)
  },

  onClientRegister(state, payload) {
    return importedJS.Library.Socket.getSocket("auth").socket.emit("Auth:onClientRegister", payload)
  },

  onClientLogout(state) {
    return $nuxt.$fire.auth.signOut()
  },

  async onClientStateChange(state, {authUser, claims}) {
    if (!authUser) {
      state.commit("setUserCredentials", false)
      this.$router.push(importedJS.Generic.routeDatas.authRoute)
    } else {
      const {uid, email, displayName} = authUser
      state.commit("setUserCredentials", {UID: uid, email, username: displayName})
      this.$router.push("/")
    }
  }
}

export const mutations = {
  onRefreshAuthNetwork(state) {
    state.isAuthNetworked = importedJS.Library.Socket.isConnected("auth")
  },

  setUserCredentials(state, payload) {
    if (payload) importedJS.Library.Socket.create("app")
    else importedJS.Library.Socket.destroy("app")
    state.userCredentials = payload
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

var isAppNetworked = false
setInterval(function() {
  let __isAppNetworked = importedJS.Library.Socket.isConnected("app")
  $nuxt.$store.commit("auth/onRefreshAuthNetwork")
  if ($nuxt.$store.state.auth.userCredentials && !isAppNetworked && __isAppNetworked) {
    const appSocket = importedJS.Library.Socket.getSocket("app")
    appSocket.socket.removeAllListeners()
    dispatchEvent(importedJS.Generic.eventDatas.app.connection.event)
    appSocket.socket.emit("App:onClientConnect", $nuxt.$store.state.auth.userCredentials.UID)
  }
  isAppNetworked = __isAppNetworked
}, 250)