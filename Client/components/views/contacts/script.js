import {Library} from "@/assets/import"

export default {
  data() {
    return {
      timerBuffer: {
        invitation: {}
      },
      selectedNavigation: null,
      finderDatas: {
        currentHeader: "void",
        username: "",
        headers: {
          "void": "Hey, I am waiting for you!",
          "invitation/pending": "Oops, You've already invited me!",
          "invitation/recepient-blocked": "Wait, You've blocked me!",
          "invitation/sender-blocked": "Damn, I've blocked you!",
          "invitation/successful": "Hurray! You've successfully invited me",
          "invitation/failed": "Hold Up, Whom are you inviting?"
        }
      },
      navigations: {
        "friends": {
          options: [
            {type: "message"},
            {event: "App:Contacts:onClientFriendRequest", type: "unfriend"},
            {event: "App:Contacts:onClientBlockRequest", type: "block"}
          ]
        },
        "pending": {
          options: [
            {event: "App:Contacts:onClientFriendRequest", type: "accept"},
            {event: "App:Contacts:onClientFriendRequest", type: "reject"}
          ]
        },
        "blocked": {
          options: [
            {event: "App:Contacts:onClientBlockRequest", type: "unblock"}
          ]
        },
        "find friends": {
          isFriendFinder: true,
          option: {event: "App:Contacts:onClientFriendRequest", type: "send"}
        }
      }
    }
  },

  beforeDestroy() {
    Library.Utility.clearTimerBuffer(this.timerBuffer)
  },

  mounted() {
    this.onClientChangeNavigation(Object.entries(this.navigations)[0][0])
  },

  computed: {
    isFriendFinder() {
      return (this.navigations[(this.selectedNavigation)] && this.navigations[(this.selectedNavigation)].isFriendFinder && true) || false
    },

    contactDatas() {
      return {contacts: (this.selectedNavigation && this.$store.state.views.contacts.userContacts[(this.selectedNavigation)]) || false, options: (this.selectedNavigation && this.navigations[(this.selectedNavigation)] && this.navigations[(this.selectedNavigation)].options) || false}
    }
  },

  methods: {
    onClientGetNavigationLength(navigationIndex) {
      if (this.navigations[navigationIndex].isFriendFinder) return ''
      return "(" + ((this.$store.state.views.contacts.userContacts[(navigationIndex)] && Object.entries(this.$store.state.views.contacts.userContacts[(navigationIndex)]).length) || 0) + ")"
    },

    onClientChangeNavigation(navigationIndex) {
      this.selectedNavigation = navigationIndex
    },

    onClientProcessOption(UID, optionData) {
      if (!optionData.event) return false
      this.$store.dispatch("views/contacts/onClientProcessOption", {UID: UID, optionData: optionData})
    },

    onClientProcessInvitation() {
      if (this.finderDatas.username.length <= 0) return false
      const componentInstance = this
      this.$store.dispatch("views/contacts/onClientProcessInvitation", {username: this.finderDatas.username, optionData: this.navigations[(this.selectedNavigation)].option})
      Library.Socket.getSocket("app").socket.on("App:Contacts:onClientFriendRequest", function(result) {
        Library.Socket.getSocket("app").socket.off("App:Contacts:onClientFriendRequest")
        componentInstance.finderDatas.currentHeader = (componentInstance.finderDatas.headers[(result.status)] && result.status) || "void"
        if (componentInstance.finderDatas.currentHeader != "void") {
          if (componentInstance.timerBuffer.invitation.headerResetter) clearTimeout(componentInstance.timerBuffer.invitation.headerResetter)
          componentInstance.timerBuffer.invitation.headerResetter = setTimeout(function() {
            delete componentInstance.timerBuffer.invitation.headerResetter
            componentInstance.finderDatas.currentHeader = "void"
          }, 10000)
        }
      })
    }
  }
}