export default {
  data() {
    return {}
  },

  mounted() {},

  computed: {
    contactDatas() {
      return {contacts: this.$store.state.views.contacts.userContacts["friends"] || false}
    }
  },

  methods: {}
}