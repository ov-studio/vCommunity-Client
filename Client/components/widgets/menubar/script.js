export default {
  data() {
    return {
      logoutMenu: "logout",
      menus: {
        messages: {
          icon: "chat-right-text"
        },
        applications: {
          icon: "grid"
        },
        contacts: {
          icon: "person-lines-fill"
        },
        settings: {
          icon: "gear-fill"
        }
        /*
        TODO: REMOVE LOGOUT FROM HERE
        logout: {
          icon: "box-arrow-in-left"
        }
        */
      }
    }
  },

  mounted() {
    this.onClientChangeMenu(Object.entries(this.menus)[0][0])
  },

  methods: {
    isMenuSelected(menuType) {
      return menuType == this.$store.state.widgets.menubar.selection
    },

    onClientChangeMenu(menuType) {
      // TODO: REMOVE LOGOUT FROM HERE
      //if (menuType == this.logoutMenu) return this.$store.dispatch("auth/onClientLogout")
      this.$store.commit("widgets/menubar/setSelection", menuType)
    }
  }
}