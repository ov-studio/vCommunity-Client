import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      creator: {
        currentPhase: false,
        controlInput: "",
        returnText: "Back",
        phases: {
          create: {
            placeholder: "Enter Server Name",
            text: "Create Server",
            altText: "Create",
          },
          join: {
            placeholder: "Enter Invitation Code",
            text: "Join Server",
            altText: "Join"
          }
        }
      }
    }
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

    onGroupCreatorProcess(phase, isWidgetDestroyed) {
      if (isWidgetDestroyed) {
        this.creator.controlInput = ""
        this.creator.currentPhase = false
        return true
      } else if (!phase) {
        this.$refs["server-creator"].createWidget()
        return true
      } else if (phase == "back") {
        this.creator.currentPhase = false
        return true
      }

      if (!this.creator.phases[phase]) return this.onGroupCreatorProcess('back')
      if (this.creator.currentPhase != phase) {
        this.creator.currentPhase = phase
      } else {
        const currentPhase = this.creator.currentPhase
        const controlValue = controlElement.value
        if (controlValue.length <= 0) return false

        if (currentPhase == "create") {
          this.$store.dispatch("groups/server/onClientCreateGroup", {
            name: controlValue
          })
        } else if (currentPhase == "join") {
          /*
          this.$store.dispatch("groups/server/onClientJoinGroup", {
            REF: controlValue
          })*/
        }
        this.$refs["server-creator"].destroyWidget()
      }
    }
  }
}