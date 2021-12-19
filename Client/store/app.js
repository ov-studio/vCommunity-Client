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
  serverGroup: false
})

export const mutations = {
  setMenuSelection(state, selection) {
    state.menu = selection
  },

  setPersonalGroupSelection(state, selection) {
    state.personalGroup = ($nuxt.$store.state.groups.personal.userGroups[selection] && selection) || false
  },

  setServerGroupSelection(state, selection) {
    state.serverGroup = selection
  }
}