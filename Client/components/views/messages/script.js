import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      cache: {
        messageView: {}
      }
    }
  },

  mounted() {
    addEventListener(Generic.eventDatas.messageView.forcescroll.name, this.onClientForceMessageViewScroll, false)
  },

  activated() {
    dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
  },

  beforeDestroy() {
    removeEventListener(Generic.eventDatas.messageView.forcescroll.name, this.onClientForceMessageViewScroll)
  },

  computed: {
    isServerGroupSelected() {
      return this.$store.state.app.serverGroup.group
    },

    viewHeader() {
      if (this.$store.state.app.serverGroup.group) {
        const selectedGroup = this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)]
        const selectedChannel = (selectedGroup && selectedGroup.channels[(this.$store.state.app.serverGroup.channel)]) || false
        return (selectedChannel && selectedChannel.description) || ""
      }
      else if (this.$store.state.app.personalGroup) {
        const selectedGroup = this.$store.state.groups.personal.userGroups[(this.$store.state.app.personalGroup)]
        const participantUID = selectedGroup.participantUID
        return "@" + (this.$store.getters["users/getUserData"](participantUID, "username") || participantUID)
      }
    },

    viewMessages() {
      if (this.$store.state.app.serverGroup.group) {
        const selectedGroup = this.$store.state.groups.server.userGroups[(this.$store.state.app.serverGroup.group)]
        const selectedChannel = (selectedGroup && selectedGroup.channels[(this.$store.state.app.serverGroup.channel)]) || false
        return (selectedChannel && selectedChannel.messages) || false
      }
      else if (this.$store.state.app.personalGroup) {
        const selectedGroup = this.$store.state.groups.personal.userGroups[(this.$store.state.app.personalGroup)]
        return (selectedGroup && selectedGroup.messages) || false
      }
      return false
    }
  },

  methods: {
    parseTimeStamp(milliseconds) {
      return (new Date(milliseconds)).toLocaleString()
    },

    onClientForceMessageViewScroll(event) {
      const contentContainer = this.$el.querySelector(".content-container")
      if (!event.detail) {
        this.$nextTick(() => {
          contentContainer.scrollTop = contentContainer.scrollHeight
        })
      }
      else {
        var selection = false
        if (event.detail.type == "serverGroup") {
          selection = this.$store.state.app.personalGroup
        } else if (event.detail.type == "personalGroup") {
          selection = this.$store.state.app.personalGroup
        }
        if (!selection || (selection != event.detail.UID)) return false

        if (event.detail.cacheScroll) {
          this.cache.messageView.scrollValue = contentContainer.scrollTop
          this.cache.messageView.scrollHeight = contentContainer.scrollHeight
        } 
        else if (event.detail.restoreScroll) {
          this.$nextTick(() => {
            contentContainer.scrollTop = (contentContainer.scrollHeight - this.cache.messageView.scrollHeight) + this.cache.messageView.scrollValue
          })
        } 
        else if (event.detail.requestScroll) {
          if ((contentContainer.scrollTop + contentContainer.clientHeight) >= contentContainer.scrollHeight) {
            this.$nextTick(() => {
              contentContainer.scrollTop = contentContainer.scrollHeight
            })
          }
        }
      }
    },
  
    onClientUpdateMessageView(event) {
      if (event.target.scrollTop > 0) return false

      if (this.$store.state.app.serverGroup.group) {

      }
      else if (this.$store.state.app.personalGroup) {
        this.$store.commit("groups/personal/onClientFetchMessages", {
          UID: this.$store.state.app.personalGroup
        })
      }
    },
  
    onClientSendMessage(event) {
      if ((event.keyCode != 13) || (event.target.value.length <= 0)) return false

      event.preventDefault()
      if (this.$store.state.app.serverGroup.group) {
        this.$store.dispatch("groups/server/onClientSendMessage", {
          UID: this.$store.state.app.serverGroup.group,
          channelUID: this.$store.state.app.serverGroup.channel,
          message: event.target.value
        })
      }
      else if (this.$store.state.app.personalGroup) {
        this.$store.dispatch("groups/personal/onClientSendMessage", {
          UID: this.$store.state.app.personalGroup,
          message: event.target.value
        })
      }
      event.target.value = ""
    }
  }
}