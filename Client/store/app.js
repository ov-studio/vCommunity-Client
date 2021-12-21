/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: app.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- App
----------------------------------------------------------------*/


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  menu: false,
  personalGroup: false,
  serverGroup: {
    group: false,
    channel: false
  }
})

export const mutations = {
  setMenuSelection(state, selection) {
    state.menu = selection
  },

  setPersonalGroupSelection(state, selection) {
    state.personalGroup = ($nuxt.$store.state.groups.personal.userGroups[selection] && selection) || Object.keys($nuxt.$store.state.groups.personal.userGroups)[0] || false
  },

  setServerGroupSelection(state, selection) {
    if (state.serverGroup.group == selection) return false

    state.serverGroup.group = selection
    state.serverGroup.channel = false
  }
}