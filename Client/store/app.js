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
  setMenuSelection(state, menu) {
    state.menu = menu
  },

  setPersonalGroupSelection(state, group) {
    state.personalGroup = ($nuxt.$store.state.groups.personal.userGroups[group] && group) || Object.keys($nuxt.$store.state.groups.personal.userGroups)[0] || false
  },

  setServerGroupSelection(state, group, channel) {
    state.serverGroup.group = group
    state.serverGroup.channel = (channel && $nuxt.$store.state.groups.server.userGroups[group].channels[channel] && channel) || false
  }
}