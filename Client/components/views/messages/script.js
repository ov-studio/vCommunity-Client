import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      selections: {
        serverGroup: false,
        personalGroup: false
      }
    }
  },

  mounted() {
    addEventListener(Generic.eventDatas.app.scrollmessages.name, this.onClientScrollContentContainer, false)
  },

  beforeDestroy() {
    removeEventListener(Generic.eventDatas.app.scrollmessages.name, this.onClientScrollContentContainer)
  },

  computed: {
    personalGroups() {
      this.onClientChangeSelection("personalGroup", this.selections.personalGroup)
      return this.$store.state.groups.personal.personalGroups || false
    },

    viewHeader() {
      if (this.selections.serverGroup) {
        return ''
      } else if (this.selections.personalGroup) {
        return "@" + this.selections.personalGroup
      }
    },

    viewMessages() {
      if (this.selections.serverGroup) {

      } else if (this.selections.personalGroup) {
        return (this.$store.state.groups.personal.personalGroups[(this.selections.personalGroup)] && this.$store.state.groups.personal.personalGroups[(this.selections.personalGroup)].groupMessages) || false
      }
      return false
    }
  },

  methods: {
    parseTimeStamp(milliseconds) {
      return (new Date(milliseconds)).toLocaleString()
    },

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
    },

    onClientScrollContentContainer() {
      this.$nextTick(() => {
        const contentContainer = this.$el.querySelector(".content-container")
        contentContainer.scrollTop = contentContainer.scrollHeight
      })
    },
  
    onClientActionInput(event) {
      if ((event.keyCode != 13) || (event.target.value.length <= 0)) return false
      event.preventDefault()
      if (this.selections.serverGroup) {

      } else if (this.selections.personalGroup) {
        this.$store.dispatch("groups/personal/onClientActionInput", {
          groupUID: this.selections.serverGroup || this.selections.personalGroup,
          message: event.target.value
        })
      }
      event.target.value = ""
    }
  }
}