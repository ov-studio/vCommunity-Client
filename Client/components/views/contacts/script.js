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
        }
      }
    }
  },

  mounted() {
    this.onClientChangeNavigation(Object.entries(this.navigations)[0][0])
  },

  computed: {
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
      return (this.$store.state.views.contacts.userContacts[(navigationIndex)] && Object.entries(this.$store.state.views.contacts.userContacts[(navigationIndex)]).length) || 0
    },

    onClientChangeNavigation(navigationIndex) {
      this.selectedNavigation = navigationIndex
      Array.from(this.$el.querySelectorAll(".navigation")).forEach(function(navigation) {
        let isSelectedNavigation = navigation.attributes.navigationIndex.value == navigationIndex
        if (isSelectedNavigation) navigation.classList.add("selected")
        else navigation.classList.remove("selected")
      })
    }
  }
}