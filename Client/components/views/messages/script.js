export default {
  data() {
    return {}
  },

  mounted() {},

  computed: {
    groupDatas() {
      return this.$store.state.groups.personal.personalGroups || false
    }
  },

  methods: {}
}