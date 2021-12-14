export default {
  data() {
    return {}
  },

  methods: {
    onClientLogout(menuType) {
      return this.$store.dispatch("auth/onClientLogout")
    }
  }
}