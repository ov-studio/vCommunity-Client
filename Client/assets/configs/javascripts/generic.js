/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: assets: configs: javascripts: generic.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Generic Config
----------------------------------------------------------------*/


/*------------------
-- Configurations --
------------------*/

const CONFIG_HOST = {
  devMode: true,
  url: "https://ov-studio.herokuapp.com",
  devURL: "http://localhost:3001"
}

export const appRequirements = {
  age: 13
}

export const routeDatas = {
  authRoute: "/auth"
}

export const socketDatas = {
  auth: {
    autoConnect: true,
    url: ((CONFIG_HOST.devMode && CONFIG_HOST.devURL) || CONFIG_HOST.url) + "/auth"
  },
  app: {
    autoConnect: false,
    url: ((CONFIG_HOST.devMode && CONFIG_HOST.devURL) || CONFIG_HOST.url) + "/app"
  }
}

export const eventDatas = {
  auth: {
    loaded: {name: "App:onClientAuthLoaded"}
  },
  app: {
    connection: {name: "App:onClientConnect"},
    disconnection: {name: "App:onClientDisconnect"}
  },
  messageView: {
    forcescroll: {name: "App:MessageView:onClientForceScroll"}
  }
}

Object.entries(eventDatas).forEach(function(eventCategory) {
  Object.entries(eventCategory[1]).forEach(function(eventData) {
    eventDatas[eventCategory[0]][(eventData[0])].event = new Event(eventData[1].name)
  })
})