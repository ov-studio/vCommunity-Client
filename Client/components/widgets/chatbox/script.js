export default {
  props: ["ownerUID", "ownerAvatar", "ownerTimestamp", "ownerMessages"],

  methods: {
    getOwnerName(ownerUID) {
      return this.$store.getters["users/getUserData"](ownerUID, "username") || ownerUID
    }
  }
}