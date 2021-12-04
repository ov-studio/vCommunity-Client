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
      this.onClientChangeSelection("personalGroup", this.selections.personalGroup)
      return this.$store.state.groups.personal.personalGroups || false
    },

    viewHeader() {
      if (this.selections.personalGroup) {
        return "@" + this.selections.personalGroup
      }
    },
  },

  methods: {
    getParticipantDatas(participantUID) {
      if (this.$store.state.views.contacts.userContacts["friends"] && this.$store.state.views.contacts.userContacts["friends"][participantUID]) {
        return this.$store.state.views.contacts.userContacts["friends"][participantUID]
      }
      return false
    },

    onClientChangeSelection(selectionType, selection) {
      if (selectionType == "personalGroup") {
        const initialGroup = Object.entries(this.$store.state.groups.personal.personalGroups)[0]
        this.selections.personalGroup = (selection && this.$store.state.groups.personal.personalGroups[selection]) || (initialGroup && initialGroup[0]) || false
      }
    }
  }
}