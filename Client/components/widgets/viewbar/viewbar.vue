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
      <div class="client-name">{{getClientName()}}</div>
      <span class="d-flex flex-row align-items-center justify-content-center client-subscriber" isSelected="true"><b-icon icon="patch-check"/></span>
      <span class="d-flex flex-row align-items-center justify-content-center" isSelected="true"><b-icon icon="plus"/>100</span>
      <span class="d-flex flex-row align-items-center justify-content-center option-container"><b-icon icon="box-arrow-in-right" @click.prevent="onClientLogout"/></span>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>