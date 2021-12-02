export default {
  data() {
    return {
      defaultMenu: "profile",
      menus: {
        profile: {
          title: "Profile",
          icon: "person-lines-fill",
        },
        privacy: {
          title: "Privacy",
          icon: "person-check-fill"
        },
        appearance: {
          title: "Appearance",
          icon: "grid-1x2-fill"
        },
        notifications: {
          title: "Notifications",
          icon: "soundwave"
        },
        billing: {
          title: "Billing",
          icon: "credit-card-2-front-fill"
        }
      }
    }
  }
}