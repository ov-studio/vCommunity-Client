export default {
  props: ["dropdownHeader"],

  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    createWidget(posX, posY) {
      //if (!posX || !posY || this.isVisible) return false
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