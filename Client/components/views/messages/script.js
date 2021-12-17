import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      cache: {
        messageView: {}
      },
      selections: {
        personalGroup: false //TODO: REMOVE..
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
    personalGroups() {
      return this.$store.state.groups.personal.userGroups || false
    },

    navigationHeader() {
      if (this.$store.state.app.serverGroup) {
        return this.$store.state.app.serverGroup
      } else if (this.$store.state.app.personalGroup) {
        return "Private Messages"
      }
    },
  
    isServerSelected() {
      return this.$store.state.app.serverGroup
    },

    viewHeader() {
      if (this.$store.state.app.serverGroup) {
        return ''
      } else if (this.$store.state.app.personalGroup) {
        return "@" + this.$store.state.groups.personal.userGroups[(this.$store.state.app.personalGroup)].participantUID
      }
    },

    viewMessages() {
      if (this.$store.state.app.serverGroup) {

      } else if (this.$store.state.app.personalGroup) {
        return (this.$store.state.groups.personal.userGroups[(this.$store.state.app.personalGroup)] && this.$store.state.groups.personal.userGroups[(this.$store.state.app.personalGroup)].messages) || false
      }
      return false
    }
  },

  methods: {
    parseTimeStamp(milliseconds) {
      return (new Date(milliseconds)).toLocaleString()
    },

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
    },

    onClientForceMessageViewScroll(event) {
      const contentContainer = this.$el.querySelector(".content-container")
      if (!event.detail) {
        this.$nextTick(() => {
          contentContainer.scrollTop = contentContainer.scrollHeight
        })
      } else {
        const selection = this.selections[(event.detail.type)] || false
        if (!selection) return false
        if (selection == event.detail.UID) {
          if (event.detail.cacheScroll) {
            this.cache.messageView.scrollValue = contentContainer.scrollTop
            this.cache.messageView.scrollHeight = contentContainer.scrollHeight
          } else if (event.detail.restoreScroll) {
            this.$nextTick(() => {
              contentContainer.scrollTop = (contentContainer.scrollHeight - this.cache.messageView.scrollHeight) + this.cache.messageView.scrollValue
            })
          } else if (event.detail.requestScroll) {
            if ((contentContainer.scrollTop + contentContainer.clientHeight) >= contentContainer.scrollHeight) {
              this.$nextTick(() => {
                contentContainer.scrollTop = contentContainer.scrollHeight
              })
            }
          }
        }
      }
    },
  
    onClientUpdateMessageView(event) {
      if (event.target.scrollTop > 0) return false
      if (this.selections.serverGroup) {

      } else if (this.$store.state.app.personalGroup) {
        this.$store.commit("groups/personal/onClientFetchMessages", {
          UID: this.$store.state.app.personalGroup
        })
      }
    },
  
    onClientSendMessage(event) {
      if ((event.keyCode != 13) || (event.target.value.length <= 0)) return false
      event.preventDefault()
      if (this.selections.serverGroup) {

      } else if (this.$store.state.app.personalGroup) {
        this.$store.dispatch("groups/personal/onClientSendMessage", {
          UID: this.$store.state.app.personalGroup,
          message: event.target.value
        })
      }
      event.target.value = ""
    }
  }
}