<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: viewbar: viewbar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- View Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-center disable-selection hide-scroller widget-viewbar-container">
    <b-icon class="menu-headerIcon" icon="arrow-return-right"/>
    <div class="menu-header">{{this.$store.state.widgets.menubar.selection}}</div>
    <div class="w-100 min-w-100 max-w-100 d-flex flex-row align-items-center justify-content-end viewbar-container">
      <b-icon class="menu" icon="box-arrow-in-left" @click.prevent="onClientLogout"/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>