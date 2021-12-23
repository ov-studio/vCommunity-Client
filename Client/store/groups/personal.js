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

import vue from "vue"
import * as importedJS from "@/assets/import"


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  userGroups: {}
})

export const actions = {
  onClientSendMessage(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Groups:Personal:onClientSendMessage", payload)
  }
}

export const mutations = {
  onSyncGroups(state, groups) {
    groups = Array.from(groups)
    Object.keys(state.userGroups).forEach(function(UID) {
      let isGroupMember = false
      for (const groupIndex in groups) {
        const groupData = groups[groupIndex]
        if (UID == groupData.UID) {
          isGroupMember = true
          break
        }
      }
      if (!isGroupMember) vue.delete(state.userGroups, UID)
    })
    for (const groupIndex in groups) {
      const groupData = groups[groupIndex]
      if (!state.userGroups[(groupData.UID)]) {
        groupData.messages = []
        vue.set(state.userGroups, groupData.UID, groupData)
      }
    }
    $nuxt.$store.commit("app/setPersonalGroupSelection", $nuxt.$store.state.app.personalGroup)
  },

  onClientFetchMessages(state, payload) {
    if (!state.userGroups[(payload.UID)]) return false
    const containerREF = state.userGroups[(payload.UID)].messages[0]
    if (!containerREF || containerREF.isPostFetched) return false

    containerREF.isPostFetched = true
    payload.messageUID = Object.keys(containerREF.ownerMessages)[0]
    importedJS.Library.Socket.getSocket("app").socket.emit("App:Groups:Personal:onClientFetchMessages", payload)
  },

  onSyncMessages(state, groupMessages) {
    if (!state.userGroups[(groupMessages.UID)] || (groupMessages.messages.length <= 0)) return false
    if (groupMessages.isPostLoad) {
      groupMessages.postLoadIndex = 0
      dispatchEvent(new CustomEvent(importedJS.Generic.eventDatas.messageView.forcescroll.name, {
        detail: {
          type: "personalGroup",
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
      if (isContainerValid) {
        const parsedMS = importedJS.Library.Utility.parseMS(messageData.timestamp - containerREF.ownerMessages[(Object.keys(containerREF.ownerMessages)[0])].timestamp)
        if ((parsedMS.hours > 0) || (parsedMS.minutes > 5)) isContainerValid = false
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
            type: "personalGroup",
            UID: groupMessages.UID,
            restoreScroll: true
          }
        }))
      } else if ($nuxt.$store.state.auth.userCredentials.UID != messageData.owner) {
        dispatchEvent(new CustomEvent(importedJS.Generic.eventDatas.messageView.forcescroll.name, {
          detail: {
            type: "personalGroup",
            UID: groupMessages.UID,
            requestScroll: true
          }
        }))
      } else {
        dispatchEvent(importedJS.Generic.eventDatas.messageView.forcescroll.event)
      }
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:Groups:Personal:onSync", function(...paramaters) {
    $nuxt.$store.commit("groups/personal/onSyncGroups", ...paramaters)
  })
  appSocket.socket.on("App:Groups:Personal:onSyncMessages", function(...paramaters) {
    $nuxt.$store.commit("groups/personal/onSyncMessages", ...paramaters)
  })
}, false)