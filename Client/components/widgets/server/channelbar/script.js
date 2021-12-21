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
      return this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)].name
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
    },

    onCreateChannel() {
      console.log("TRYING TO CREATE CHANNEL")
      this.$store.dispatch("groups/server/onClientCreateChannel", {
          UID: this.$store.state.app.serverGroup.group,
          name: "test"
      })
    }
  }
}