/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: groups: server.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Server Groups
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
  userGroups: {}
})

export const actions = {
  onClientCreateGroup(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Server:onClientCreateGroup", payload)
  }
}

export const mutations = {
  onSyncGroups(state, groups) {
    vue.set(state, "userGroups", {})
    Array.from(groups).forEach(function(groupData) {
      groupData.messages = []
      vue.set(state.userGroups, groupData.UID, groupData)
    })
  },

  /*
  onClientFetchMessages(state, payload) {
    if (!state.userGroups[(payload.UID)]) return false
    const containerREF = state.userGroups[(payload.UID)].messages[0]
    if (!containerREF || containerREF.isPostFetched) return false

    containerREF.isPostFetched = true
    payload.messageUID = Object.keys(containerREF.ownerMessages)[0]
    importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Server:onClientFetchMessages", payload)
  },

  onSyncMessages(state, groupMessages) {
    if (!state.userGroups[(groupMessages.UID)] || (groupMessages.messages.length <= 0)) return false
    if (groupMessages.isPostLoad) {
      groupMessages.postLoadIndex = 0
      dispatchEvent(new CustomEvent(importedJS.Generic.eventDatas.messageView.forcescroll.name, {
        detail: {
          type: "serverGroup",
          UID: groupMessages.UID,
          cacheScroll: true
        }
      }))
    }

    Array.from(groupMessages.messages).forEach(function(messageData) {
      let containerREF = state.userGroups[(groupMessages.UID)].messages
      containerREF = (groupMessages.isPostLoad && containerREF[groupMessages.postLoadIndex]) || containerREF[(containerREF.length - 1)]
      let isContainerValid = (groupMessages.isPostLoad && !groupMessages.isPostLoaded) || !containerREF
      let isOwnerValid = containerREF && (messageData.owner != containerREF.owner)
      isContainerValid = isContainerValid || isOwnerValid
      if (!isContainerValid) {
        // TODO: THIS IS BUGGY FOR NOW..
        //const parsedMS = importedJS.Library.Utility.parseMS(messageData.timestamp - containerREF.ownerMessages[(Object.keys(containerREF.ownerMessages)[0])].timestamp)
        //if ((parsedMS.hours > 0) || (parsedMS.minutes > 5)) isContainerValid = true
      }
      if (isContainerValid) {
        const appendData = {
          owner: messageData.owner,
          ownerMessages: {}
        }
        if (groupMessages.isPostLoad) {
          if (groupMessages.isPostLoaded && isOwnerValid) groupMessages.postLoadIndex = groupMessages.postLoadIndex + 1
          groupMessages.isPostLoaded = true
          state.userGroups[(groupMessages.UID)].messages.splice(groupMessages.postLoadIndex, 0, appendData)
        } else {
          state.userGroups[(groupMessages.UID)].messages.push(appendData)
        }
      }

      containerREF = state.userGroups[(groupMessages.UID)].messages
      containerREF = (groupMessages.isPostLoad && containerREF[groupMessages.postLoadIndex]) || containerREF[(containerREF.length - 1)]
      vue.set(containerREF.ownerMessages, messageData.UID, messageData)
      if (groupMessages.isPostLoad) {
        dispatchEvent(new CustomEvent(importedJS.Generic.eventDatas.messageView.forcescroll.name, {
          detail: {
            type: "serverGroup",
            UID: groupMessages.UID,
            restoreScroll: true
          }
        }))
      } else if ($nuxt.$store.state.auth.userCredentials.UID != messageData.owner) {
        dispatchEvent(new CustomEvent(importedJS.Generic.eventDatas.messageView.forcescroll.name, {
          detail: {
            type: "serverGroup",
            UID: groupMessages.UID,
            requestScroll: true
          }
        }))
      } else {
        dispatchEvent(importedJS.Generic.eventDatas.messageView.forcescroll.event)
      }
    })
  }
  */
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:Groups:Server:onSync", function(...paramaters) {
    $nuxt.$store.commit("groups/server/onSyncGroups", ...paramaters)
  })
  /*
  appSocket.socket.on("App:Groups:Server:onSyncMessages", function(...paramaters) {
    $nuxt.$store.commit("groups/server/onSyncMessages", ...paramaters)
  })
  */
}, false)