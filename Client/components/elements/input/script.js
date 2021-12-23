export default {
  props: ["value", "inputHolder"],

  methods: {
    syncValue(event) {
      this.$emit("input", event.target.value)
    }
  }
}