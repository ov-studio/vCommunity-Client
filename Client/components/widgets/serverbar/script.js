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
      this.onClientSelectGroup(this.$store.state.app.serverGroup.group)
      return this.$store.state.groups.server.userGroups || false
    }
  },

  methods: {
    isGroupSelected(selection) {
      return this.$store.state.app.serverGroup.group == selection
    },

    onClientSelectGroup(selection) {
      const serverGroups = this.$store.state.groups.server.userGroups
      if (!serverGroups) return false
  
      selection = (selection && serverGroups[selection] && selection) || false
      if (this.$store.state.app.serverGroup.group == selection) return false
      this.$store.commit("app/setServerGroupSelection", {
        group: selection
      })
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
      } 
      else {
        if (this.creator.controlInput.length <= 0) return false

        const currentPhase = this.creator.currentPhase
        if (currentPhase == "create") {
          this.$store.dispatch("groups/server/onClientCreateGroup", {
            name: this.creator.controlInput
          })
        } else if (currentPhase == "join") {
          this.$store.dispatch("groups/server/onClientJoinGroup", {
            REF: this.creator.controlInput
          })
        }
        this.$refs["server-creator"].destroyWidget()
      }
    }
  }
}