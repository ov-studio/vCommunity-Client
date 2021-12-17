import {Generic} from "@/assets/import"

export default {
  data() {
    return {
      cache: {
        messageView: {}
      },
      selections: {
        serverGroup: false,
        personalGroup: false
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
      this.onClientChangeSelection("personalGroup", this.selections.personalGroup)
      return this.$store.state.groups.personal.userGroups || false
    },

    serverGroups() {
      this.onClientChangeSelection("serverGroup", this.selections.serverGroup)
      return this.$store.state.groups.server.userGroups || false
    },

    navigationHeader() {
      if (this.selections.serverGroup) {
        return this.selections.serverGroup
      } else if (this.selections.personalGroup) {
        return "Private Messages"
      }
    },
  
    viewHeader() {
      if (this.selections.serverGroup) {
        return ''
      } else if (this.selections.personalGroup) {
        return "@" + this.$store.state.groups.personal.userGroups[(this.selections.personalGroup)].participantUID
      }
    },

    viewMessages() {
      if (this.selections.serverGroup) {

      } else if (this.selections.personalGroup) {
        return (this.$store.state.groups.personal.userGroups[(this.selections.personalGroup)] && this.$store.state.groups.personal.userGroups[(this.selections.personalGroup)].messages) || false
      }
      return false
    }
  },

  methods: {
    parseTimeStamp(milliseconds) {
      return (new Date(milliseconds)).toLocaleString()
    },

    onClientChangeSelection(selectionType, selection) {
      var categoryStore = false
      if (selectionType == "serverGroup") {
        categoryStore = this.$store.state.groups.server.userGroups
      } else if (selectionType == "personalGroup") {
        categoryStore = this.$store.state.groups.personal.userGroups
      }
      if (!categoryStore) return false
      const initialGroup = Object.entries(categoryStore)[0]
      const selectedGroup = (selection && categoryStore[selection] && selection) || ((selectionType != "serverGroup") && initialGroup && initialGroup[0]) || false
      if (this.selections[selectionType] == selectedGroup) return false
      this.selections[selectionType] = selectedGroup
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

      } else if (this.selections.personalGroup) {
        this.$store.commit("groups/personal/onClientFetchMessages", {
          UID: this.selections.personalGroup
        })
      }
    },
  
    onClientSendMessage(event) {
      if ((event.keyCode != 13) || (event.target.value.length <= 0)) return false
      event.preventDefault()
      if (this.selections.serverGroup) {

      } else if (this.selections.personalGroup) {
        this.$store.dispatch("groups/personal/onClientSendMessage", {
          UID: this.selections.personalGroup,
          message: event.target.value
        })
      }
      event.target.value = ""
    },

    onClientCreateServer(isCreationPhase) {
      if (isCreationPhase) {
        // TODO: ...
        /*
        this.$store.dispatch("groups/server/onClientCreateGroup", {
          name: "test"
        })
        */
       //console.log(this.$refs["option-server-creator"])
       const contentContainer = this.$refs["option-server-creator"].querySelector(".finder-action")
       console.log(contentContainer)
        //this.$refs["option-server-creator"].destroyWidget()
      } else {
        this.$refs["option-server-creator"].createWidget()
      }
    }
  }
}