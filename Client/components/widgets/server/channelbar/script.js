import {Generic} from "@/assets/import"

export default {
  data() {
    return {}
  },

  computed: {
    personalGroups() {
      return this.$store.state.groups.personal.userGroups || false
    },

    containerHeader() {
      if (this.$store.state.app.serverGroup) {
        return this.$store.state.app.serverGroup
      } else if (this.$store.state.app.personalGroup) {
        return "Private Messages"
      }
    }
  },

  methods: {
    isGroupSelected(selection) {
      return this.$store.state.app.personalGroup == selection
    },

    onClientSelectGroup(selection) {
      const personalGroups = this.$store.state.groups.personal.userGroups
      if (!personalGroups) return false

      selection = (selection && personalGroups[selection] && selection) || false
      if (this.$store.state.app.personalGroup == selection) return false
      this.$store.commit("app/setPersonalGroupSelection", selection)
      dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
    }
  }
}