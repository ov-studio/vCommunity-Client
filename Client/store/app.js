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
    state.personalGroup = (group && $nuxt.$store.state.groups.personal.userGroups[group] && group) || Object.keys($nuxt.$store.state.groups.personal.userGroups)[0] || false
  },

  setServerGroupSelection(state, group, channel) {
    state.serverGroup.group = (group && $nuxt.$store.state.groups.server.userGroups[group] && group) || false
    state.serverGroup.channel = (state.serverGroup.group && channel && $nuxt.$store.state.groups.server.userGroups[(state.serverGroup.group)].channels[channel] && channel) || Object.keys($nuxt.$store.state.groups.server.userGroups)[(state.serverGroup.group)].channels[0] || false
  }
}