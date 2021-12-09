export default {
  props: ["contactUID", "contactAvatar", "contactOptions", "contactOptionHandler"],
  
  methods: {
    getContactName(contactUID) {
      return this.$store.getters["users/getUserData"](contactUID, "username") || contactUID
    }
  }
}