export default {
  props: ["dropdownHeader"],

  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    createWidget(posX, posY) {
      console.log(posX)
      if (!posX || !posY || this.isVisible) return false
      console.log("Trying to open server option..")

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