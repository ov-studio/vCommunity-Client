export default {
  data() {
    return {}
  },

  mounted() {},

  computed: {
    personalGroups() {
      return this.$store.state.groups.personal.personalGroups || false
    }
  },

  methods: {
    getParticipantDatas(participantUID) {
      console.log(participantUID)
      if (this.$store.state.views.contacts.userContacts["friends"] && this.$store.state.views.contacts.userContacts["friends"][participantUID]) {
        return this.$store.state.views.contacts.userContacts["friends"][participantUID]
      }
      return false
    }
  }
}