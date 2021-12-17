export default {
  data() {
    return {
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
      }
    }
  },

  mounted() {
    this.onClientSelectMenu(Object.entries(this.menus)[0][0])
  },

  methods: {
    isMenuSelected(menuType) {
      return menuType == this.$store.state.app.menu
    },

    onClientSelectMenu(menuType) {
      this.$store.commit("app/setMenuSelection", menuType)
    }
  }
}