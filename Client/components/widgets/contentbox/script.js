export default {
  props: ["contentHeader"],

  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    createWidget() {
      this.isVisible = true
    },

    destroyWidget() {
      this.isVisible = false
    },

    clickTest() {
      console.log("CLICKED OUTSIDE CONTAINER..")
    }
  }
}