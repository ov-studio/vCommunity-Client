export default {
  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    createWidget() {
      if (this.isVisible) return false

      this.isVisible = true
      this.$emit("created")
    },

    destroyWidget() {
      if (!this.isVisible) return false

      this.isVisible = false
      this.$emit("destroyed")
    }
  }
}