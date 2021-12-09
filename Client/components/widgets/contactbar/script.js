export default {
  props: ["contactUID", "contactAvatar", "contactOptions", "contactOptionHandler"],
  
  methods: {
    getContactName(contactUID) {
      return this.$store.dispatch("users/onSyncUserDatas", {UID: contactUID})
    }
  }
}