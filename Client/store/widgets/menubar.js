/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: widgets: menubar.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Menu Bar
----------------------------------------------------------------*/


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  selection: null
})

export const mutations = {
  setSelection(state, selection) {
    state.selection = selection
  }
}