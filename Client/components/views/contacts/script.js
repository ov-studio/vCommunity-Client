export default {
  data() {
    return {
      selectedNavigation: null,
      optionEvents: {
        "unfriend": "App:onClientFriendRequest",
        "accept": "App:onClientFriendRequest",
        "reject": "App:onClientFriendRequest",
        "block": "App:onClientBlockRequest",
        "unblock": "App:onClientBlockRequest",
      },
      finderDatas: {
        currentHeader: "void",
        username: "",
        headers: {
          "void": "Hey, I am waiting for you!",
          "invitation/pre-pending": "Ooops, You've already invited me!",
          "invitation/successful": "Hurray! You've successfully invited me",
          "invitation/failed": "Hold Up, Whom are you inviting?"
        }
      },
      navigations: {
        "friends": {
          options: [
            {type: "message"},
            {event: "App:onClientFriendRequest", type: "unfriend"},
            {event: "App:onClientBlockRequest", type: "block"}
          ]
        },
        "pending": {
          options: [
            {event: "App:onClientFriendRequest", type: "accept"},
            {event: "App:onClientFriendRequest", type: "reject"}
          ]
        },
        "blocked": {
          options: [
            {event: "App:onClientBlockRequest", type: "unblock"}
          ]
        },
        "find friends": {
          isFriendFinder: true
        }
      }
    }
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
    onClientProcessOption(UID, optionData) {
      if (!optionData.event) return false
      this.$store.dispatch("views/contacts/onClientProcessOption", {UID: UID, optionData: optionData})
    },
  
    onClientGetNavigationLength(navigationIndex) {
      if (this.navigations[navigationIndex].isFriendFinder) return ''
      return "(" + ((this.$store.state.views.contacts.userContacts[(navigationIndex)] && Object.entries(this.$store.state.views.contacts.userContacts[(navigationIndex)]).length) || 0) + ")"
    },

    onClientChangeNavigation(navigationIndex) {
      this.selectedNavigation = navigationIndex
    },

    onClientProcessInvitation() {
      if (this.finderDatas.username.length <= 0) return false
      console.log("PROCESSING INVIT...")
      console.log(this.finderDatas.username)
    }
  }
}