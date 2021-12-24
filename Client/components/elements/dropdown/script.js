export default {
  props: ["dropdownHeader"],

  data() {
    return {
      isVisible: false,
      position: [0, 0]
    }
  },

  methods: {
    createWidget(posX, posY) {
      if (!posX || !posY || this.isVisible) return false

      this.position = [posX, posY]
      this.isVisible = true
      this.$emit("created")
    },

    destroyWidget() {
      if (!this.isVisible) return false

      this.isVisible = false
      this.position = [0, 0]
      this.$emit("destroyed")
    }
  }
}