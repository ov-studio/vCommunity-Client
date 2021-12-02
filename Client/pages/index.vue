<template>
  <div class="d-flex flex-row overflow-hidden">
    <!---- Components ---->
    <widget-menubar/>
    <div class="d-flex flex-column overflow-hidden view-render-container">
      <widget-viewbar/>
      <div class="overflow-hidden view-container">
        <div class="d-flex flex-row overflow-hidden view-render">
          <keep-alive>
            <component :is="'view-' + this.$store.state.widgets.menubar.selection"/>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>


<!---------
-- Style --
---------->

<style scoped lang="sass">
@import "@/assets/import"

.view-render-container
  $background-color: map-read($config_palette, "wrapper-primary-color")
  width: 100vw !important
  height: 100vh !important
  background-color: $background-color !important
  .view-container
    $padding: 5px
    $background-color: rgba(5, 5, 5, 1)
    $border-radius: 15px
    $border-width: 5px
    $border-color: rgba(50, 50, 50, 1)
    padding-left: $padding !important
    padding-top: $padding !important
    height: 100% !important
    width: 100% !important
    background-color: $background-color !important
    border-width: 0px !important
    border-top-left-radius: $border-radius !important
    border-left-width: $border-width !important
    border-top-width: $border-width !important
    border-style: solid !important
    border-left-color: $border-color !important
    border-top-color: $border-color !important
    .view-render
      $border-radius: 5px
      height: 100% !important
      width: 100% !important
      background-color: map-read($config_palette, "wrapper-primary-color") !important 
      background-image: url(https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/0220af11729143.560fc51d3ac1b.jpg) !important
      border-top-left-radius: $border-radius !important
      background-size: cover !important
      background-repeat: no-repeat !important
      background-position: 50% 50% !important
</style>