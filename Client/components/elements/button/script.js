export default {
  props: ["isDisabled"],

  methods: {
    clickElement() {
      if (!this.isDisabled) this.$emit("clicked")
    }
  }
}