import {Generic} from "@/assets/import"

export default {
  data() {
    return {}
  },

  computed: {
    serverChannels() {
      //return this.$store.state.groups.server.userGroups || false
      return {}
    },

    containerHeader() {
      return this.$store.state.app.serverGroup
    }
  },

  methods: {
    isChannelSelected(selection) {
      return this.$store.state.app.serverChannel == selection
    },

    onClientSelectGroup(selection) {
      const serverChannels = this.$store.state.groups.server.userGroups
      if (!serverChannels) return false

      //selection = (selection && serverChannels[selection] && selection) || false
      //if (this.$store.state.app.serverChannel == selection) return false
      //this.$store.commit("app/setPersonalGroupSelection", selection)
      //dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
    }
  }
}