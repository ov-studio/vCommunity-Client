export default {
  props: ["contactUID", "contactAvatar", "contactOptions", "contactOptionHandler"],
  
  methods: {
    getContactName(contactUID) {
      //if (this.$store.state.views.contacts.userContacts["friends"] && this.$store.state.views.contacts.userContacts["friends"][contactUID]) {
        //return this.$store.state.views.contacts.userContacts["friends"][contactUID]
      //}
      return contactUID + " heh"
    }
  }
}