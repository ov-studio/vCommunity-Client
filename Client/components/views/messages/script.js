import {Generic} from "@/assets/import"

export default {
  data() {
    return {
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
      if (selectionType == "personalGroup") {
        const initialGroup = Object.entries(this.$store.state.groups.personal.userGroups)[0]
        const selectedGroup = (selection && this.$store.state.groups.personal.userGroups[selection] && selection) || (initialGroup && initialGroup[0]) || false
        if (this.selections.personalGroup == selectedGroup) return false
        this.selections.personalGroup = selectedGroup
        dispatchEvent(Generic.eventDatas.messageView.forcescroll.event)
      }
    },

    onClientForceMessageViewScroll() {
      this.$nextTick(() => {
        const contentContainer = this.$el.querySelector(".content-container")
        contentContainer.scrollTop = contentContainer.scrollHeight
      })
    },
  
    onClientUpdateMessageView(event) {
      if (event.target.scrollTop > 0) return false
      const selectedGroup = this.selections.personalGroup
      if (this.selections.serverGroup) {

      } else if(this.selections.personalGroup) {
        console.log(this.selections.personalGroup)
        /*
        importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Personal:onClientFetchMessages", {
          UID: selectedGroup,
          messageUID: Object.keys(state.userGroups[(groupMessages.UID)].messages[0].ownerMessages)[0]
        })
        */
      }
    },
  
    onClientSendMessage(event) {
      if ((event.keyCode != 13) || (event.target.value.length <= 0)) return false
      event.preventDefault()
      if (this.selections.serverGroup) {

      } else if (this.selections.personalGroup) {
        this.$store.dispatch("groups/personal/onClientSendMessage", {
          UID: this.selections.serverGroup || this.selections.personalGroup,
          message: event.target.value
        })
      }
      event.target.value = ""
    }
  }
}