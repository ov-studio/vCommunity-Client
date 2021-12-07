<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: menubar: menubar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Menu Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative min-vh-100 max-vh-100 d-flex flex-column align-items-center justify-content-center disable-selection hide-scroller widget-menubar-container">
    <div v-for="(menuData, menuType) in menus" :key="menuType" class="d-flex flex-column flex-shrink-0 align-items-center justify-content-center overflow-hidden menu-container" :isSelected="isMenuSelected(menuType)">
      <b-icon class="menu" :icon="menuData.icon" @click.prevent="onClientChangeMenu(menuType)"/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>