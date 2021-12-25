<!---------------------------------------------------------------
     Resource: vCommunity-Client
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
  <div class="position-relative d-flex flex-column align-items-center justify-content-start overflow-hidden disable-selection widget-menubar-container">
    <div class="d-flex flex-column flex-shrink-0 align-items-center justify-content-center overflow-hidden menubar-container">
      <div v-for="(menuData, menuType) in menus" :key="menuType" class="d-flex flex-column flex-shrink-0 align-items-center justify-content-center overflow-hidden menu-container" :isSelected="isMenuSelected(menuType)">
        <b-icon class="menu" :icon="menuData.icon" @click.prevent="onClientSelectMenu(menuType)"/>
      </div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>