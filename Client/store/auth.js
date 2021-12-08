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
    if (loginPromise.promise) return loginPromise.promise
    importedJS.Library.Socket.getSocket("auth").socket.emit("Auth:onClientLogin", payload)
    loginPromise.promise = new Promise(function(resolve) {
      loginPromise.resolver = resolve
    })
    return loginPromise.promise
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
    } else {
      importedJS.Library.Socket.getSocket("auth").socket.emit("Auth:onClientLogin", {email: authUser.email}, true)
    }
  }
}

export const mutations = {
  onRefreshAuthNetwork(state) {
    state.isAuthNetworked = importedJS.Library.Socket.isConnected("auth")
  },

  setUserCredentials(state, payload) {
    state.userCredentials = payload
    dispatchEvent(importedJS.Generic.eventDatas.auth.loaded.event)
    if (state.userCredentials) {
      importedJS.Library.Socket.create("app")
      this.$router.push("/")
    }
    else {
      importedJS.Library.Socket.destroy("app")
      this.$router.push(importedJS.Generic.routeDatas.authRoute)
    }
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

const loginPromise = {promise: false, resolver: false}
const authSocket = importedJS.Library.Socket.getSocket("auth")
authSocket.socket.on("Auth:onClientLogin", function(result, isReAuthRequest) {
  if (isReAuthRequest) {
    if (result.status) {
      $nuxt.$store.dispatch("auth/onClientLogout")
    } else {
      $nuxt.$store.commit("auth/setUserCredentials", result)
    }
  } else {
    if (result.status) {
      loginPromise.promise = false
      loginPromise.resolver(result)
    } else {
      $nuxt.$fire.auth.signInWithEmailAndPassword(result.email, result.password)
      .then(function() {
        loginPromise.promise = false
        $nuxt.$store.commit("auth/setUserCredentials", result)
        loginPromise.resolver({status: "auth/successful"})
      })
      .catch(function(error) {
        loginPromise.promise = false
        loginPromise.resolver({status: error.code})
      })
    }
  }
})

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