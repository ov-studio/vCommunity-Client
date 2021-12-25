<!---------------------------------------------------------------
     Resource: vCommunity-Client
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
    <b-icon class="menu-icon" icon="arrow-return-right"/>
    <div class="menu-header">{{this.$store.state.app.menu}}</div>
    <div class="w-100 min-w-100 max-w-100 d-flex flex-row align-items-center justify-content-end viewbar-container">
      <div class="h-100 d-flex flex-row align-items-center justify-content-center" @click.self="onClientOptionProcess(null, $event.target)"><b-icon icon="app-indicator" style="pointer-events: none !important;"/></div>
    </div>

    <element-dropdown ref="client-options" :dropdownHeader="getClientName()" :dropdownOptions="clientOptions" :dropdownOptionHandler="onClientOptionProcess"/>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>