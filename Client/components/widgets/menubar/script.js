export default {
  data() {
    return {
      logoutMenu: "logout",
      menus: {
        messages: {
          icon: "chat-left"
        },
        notifications: {
          icon: "bell"
        },
        contacts: {
          icon: "people"
        },
        settings: {
          icon: "gear"
        },
        logout: {
          icon: "box-arrow-in-left"
        }
      }
    }
  },

  mounted() {
    this.onClientChangeMenu(Object.entries(this.menus)[0][0])
  },

  watch: {
    "$store.state.widgets.menubar.selection": function() {
      this.isMenuSelected()
    }
  },

  methods: {
    isMenuSelected(menuType) {
      return menuType == this.$store.state.widgets.menubar.selection
    },

    onClientChangeMenu(menuType) {
      if (menuType == this.logoutMenu) return this.$store.dispatch("auth/onClientLogout")
      this.$store.commit("widgets/menubar/setSelection", menuType)
    }
  }
}