export default {
  data() {
    return {}
  },

  methods: {
    getClientName() {
      return this.$store.getters["users/getUserData"](this.$store.state.auth.userCredentials.UID, "username")
    },

    onClientLogout() {
      return this.$store.dispatch("auth/onClientLogout")
    }
  }
}