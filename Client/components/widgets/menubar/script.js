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
    this.onClientChangeMenu(Object.entries(this.menus)[0][0], true)
  },

  watch: {
    "$store.state.widgets.menubar.selection": function() {
      this.onClientUpdateMenu()
    }
  },

  methods: {
    onClientUpdateMenu() {
      let currentMenu = this.$store.state.widgets.menubar.selection
      Array.from(this.$el.children).forEach(function(menuContainer) {
        let isSelectedMenu = menuContainer.attributes.menuType.value == currentMenu
        if (isSelectedMenu) menuContainer.classList.add("selected")
        else menuContainer.classList.remove("selected")
        Array.from(menuContainer.querySelectorAll(".menu")).forEach(function(menu) {
          if (isSelectedMenu) menu.classList.add("selected")
          else menu.classList.remove("selected")
        })
      })
    },

    onClientChangeMenu(menuType, invokeUpdate) {
      if (menuType == this.logoutMenu) return this.$store.dispatch("auth/onClientLogout")
      this.$store.commit("widgets/menubar/setSelection", menuType)
      if (invokeUpdate) this.onClientUpdateMenu()
    }
  }
}