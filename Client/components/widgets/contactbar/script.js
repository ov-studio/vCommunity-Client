export default {
  props: ["contactUID", "contactAvatar", "contactOptions", "contactOptionHandler"],
  
  methods: {
    getContactName(contactUID) {
      const userDatas = this.$store.getters["users/getUserDatas"](contactUID)
      return (userDatas && userDatas.username) || contactUID
    }
  }
}