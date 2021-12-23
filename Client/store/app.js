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

  setServerGroupSelection(state, selection) {
    const selectedGroup = (selection && selection.group && $nuxt.$store.state.groups.server.userGroups[(selection.group)] && selection.group) || false
    const selectedChannel = (state.serverGroup.group && selection.channel && $nuxt.$store.state.groups.server.userGroups[(state.serverGroup.group)].channels[(selection.channel)] && selection.channel) || false
    state.serverGroup.group = selectedGroup
    state.serverGroup.channel = selectedChannel || (state.serverGroup.group && Object.keys($nuxt.$store.state.groups.server.userGroups[(state.serverGroup.group)].channels)[0]) || false
  }
}