<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: layouts: app.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Layouts -- App
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative vw-100 vh-100 min-vw-100 min-vh-100 max-vw-100 max-vh-100 d-flex flex-row overflow-hidden">
    <widget-menubar/>
    <div class="d-flex flex-column overflow-hidden layout-app-container">
      <widget-viewbar/>
      <div class="overflow-hidden app-container">
        <div class="d-flex flex-row overflow-hidden app-render">
          <keep-alive>
            <component :is="'view-' + this.$store.state.app.menu"/>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<style scoped lang="sass" src="./style.sass"/>