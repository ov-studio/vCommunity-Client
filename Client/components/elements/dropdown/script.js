export default {
  props: ["dropdownHeader", "dropdownOptions", "dropdownOptionHandler"],

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
      this.$nextTick(() => {
        const componentInstance = this
        setTimeout(function() {
          addEventListener("click", componentInstance.verifyClick)
        }, 1, 1)
      })
    },

    destroyWidget() {
      if (!this.isVisible) return false

      this.isVisible = false
      this.position = [0, 0]
      removeEventListener("click", this.verifyClick)
      this.$emit("destroyed")
    },

    verifyClick(event) {
      if (!this.isVisible) return false
      if (!this.$el.contains(event.target)) this.destroyWidget()
    }
  }
}