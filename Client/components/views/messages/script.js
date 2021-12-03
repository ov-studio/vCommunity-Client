export default {
  data() {
    return {
      selections: {
        personalGroup: false
      }
    }
  },

  mounted() {},

  computed: {
    personalGroups() {
      const initialGroup = Object.entries(this.$store.state.groups.personal.personalGroups)[0]
      this.selections.personalGroup = (this.selections.personalGroup && this.$store.state.groups.personal.personalGroups[(this.selections.personalGroup)]) || (initialGroup && initialGroup[0]) || false
      return this.$store.state.groups.personal.personalGroups || false
    }
  },

  methods: {
    getParticipantDatas(participantUID) {
      if (this.$store.state.views.contacts.userContacts["friends"] && this.$store.state.views.contacts.userContacts["friends"][participantUID]) {
        return this.$store.state.views.contacts.userContacts["friends"][participantUID]
      }
      return false
    }
  }
}