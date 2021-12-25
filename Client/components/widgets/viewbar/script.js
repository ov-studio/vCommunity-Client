export default {
  data() {
    return {
      clientOptions: {
        "app-store": {
          name: "View Store",
        },
        "open-engine": {
          name: "Launch vEngine",
        },
        "view-documentations": {
          name: "View Documentations",
        },
        "client-applications": {
          name: "View Applications",
          selectMenu: "applications"
        },
        "client-settings": {
          name: "View Settings",
          selectMenu: "settings"
        },
        "client-logout": {
          name: "Logout"
        }
      }
    }
  },

  methods: {
    getClientName() {
      return this.$store.getters["users/getUserData"](this.$store.state.auth.userCredentials.UID, "username")
    },

    onClientOptionProcess(optionType, element) {
      if (optionType) {
        if (this.clientOptions[optionType].selectMenu) {
          this.$store.commit("app/setMenuSelection", this.clientOptions[optionType].selectMenu)
        } 
        else if (optionType == "client-logout") {
          this.$store.dispatch("auth/onClientLogout")
        }
        this.$refs["client-options"].destroyWidget()
      } else if (element) {
        const elementRect = element.getBoundingClientRect()
        this.$refs["client-options"].createWidget(elementRect.left + elementRect.width - 230, elementRect.top + elementRect.height + 5)
      }
    }
  }
}