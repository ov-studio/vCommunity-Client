import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      creator: {
        controlInput: "",
        placeholder: "Enter Channel Name",
        text: "Create Channel"
      },

      serverOptions: {
        "copy-inv": {
          name: "Copy Invitation Code"
        },
        "server-roles": {
          name: "Server Roles"
        },
        "server-members": {
          name: "Server Members"
        },
        "server-settings": {
          name: "Server Settings"
        },
        "leave-server": {
          name: "Leave Server"
        }
      }
    }
  },

  computed: {
    serverChannels() {
      return (this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)] && this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)].channels) || false
    },

    containerHeader() {
      return this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)].name
    }
  },

  methods: {
    isChannelSelected(selection) {
      return this.$store.state.app.serverGroup.channel == selection
    },

    onClientServerOptionProcess(optionType, element) {
    console.log("CLCIKE..")
      if (optionType) {
        console.log("CLICKED OPTION TYPE " + optionType)
      } else if (element) {
        const elementRect = element.getBoundingClientRect()
        this.$refs["server-options"].createWidget(elementRect.left + elementRect.width + 8, elementRect.top + 3)
      }
    },

    onChannelCreatorProcess(isChannelCreation, isWidgetDestroyed) {
      if (isWidgetDestroyed) {
        this.creator.controlInput = ""
        return true
      } else if (!isChannelCreation) {
        this.$refs["server-channel-creator"].createWidget()
        return true
      }
      if (this.creator.controlInput.length <= 0) return false

      this.$store.dispatch("groups/server/onClientCreateChannel", {
        UID: this.$store.state.app.serverGroup.group,
        name: this.creator.controlInput
      })
      this.$refs["server-channel-creator"].destroyWidget()
    },

    onClientSelectChannel(selection) {
      const serverChannels = this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)] && this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)].channels
      if (!serverChannels) return false

      selection = (selection && serverChannels[selection] && selection) || false
      if (this.$store.state.app.serverGroup.channel == selection) return false
      this.$store.commit("app/setServerGroupSelection", {
        group: this.$store.state.app.serverGroup.group,
        channel: selection
      })
      dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
    }
  }
}