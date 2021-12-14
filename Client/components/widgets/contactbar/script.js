export default {
  props: ["contactUID", "contactAvatar", "contactOptions", "contactOptionHandler"],
  
  methods: {
    isContactOnline(contactUID) {
      return this.$store.getters["users/getUserData"](contactUID, "isOnline")
    },

    getContactName(contactUID) {
      return this.$store.getters["users/getUserData"](contactUID, "username") || contactUID
    }
  }
}