import {Generic} from "@/assets/import"

export default {
  data() {
    return {}
  },

  computed: {
    serverGroups() {
      this.onClientSelectGroup(this.$store.state.app.serverGroup)
      return this.$store.state.groups.server.userGroups || false
    }
  },

  methods: {
    isGroupSelected(selection) {
      return this.$store.state.app.serverGroup == selection
    },

    onClientSelectGroup(selection) {
      const serverGroups = this.$store.state.groups.server.userGroups
      if (!serverGroups) return false
  
      selection = (selection && serverGroups[selection] && selection) || false
      if (this.$store.state.app.serverGroup == selection) return false
      this.$store.commit("app/setServerGroupSelection", selection)
      dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
    },

    onClientCreateGroup(isCreationPhase) {
      if (isCreationPhase) {
        const controlElement = this.$refs["server-creator"].$el.querySelector(".creator-control")
        const serverName = controlElement.value
        if (serverName.length <= 0) return false
        /*
        this.$store.dispatch("groups/server/onClientCreateGroup", {
          name: serverName
        })*/
        this.$refs["server-creator"].destroyWidget()
      }
      else {
        this.$refs["server-creator"].createWidget()
      }
    },

    onClientJoinGroup() {
      
    }
  }
}