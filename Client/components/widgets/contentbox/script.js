export default {
  props: ["contentHeader", "onCreated", "onDestroyed"],

  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    createWidget() {
      if (this.isVisible) return false

      this.isVisible = true
      if (this.$props.onCreated) this.$props.onCreated()
    },

    destroyWidget() {
      if (!this.isVisible) return false

      this.isVisible = false
      if (this.$props.onDestroyed) this.$props.onDestroyed()
    }
  }
}