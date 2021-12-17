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
    isMenuSelected(selection) {
      return selection == this.$store.state.app.menu
    },

    onClientSelectMenu(selection) {
      this.$store.commit("app/setMenuSelection", selection)
    }
  }
}