<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: views: settings.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: View -- Settings
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-center hide-scroller view-settings-container">
    <div class="h-100 min-h-100 max-h-100 d-flex flex-column align-self-start disable-selection hide-scroller menu-container">
      <div v-for="(menuData, menuType) in menus" :key="menuType" :menuType="menuType" class="d-flex flex-row align-items-center justify-content-center overflow-hidden menu-wrapper">
        <b-icon class="menu-icon" :icon="menuData.icon"/>
        <span class="menu-name">{{menuData.title}}</span>
      </div>
    </div>
    <div class="d-flex flex-row align-items-center justify-content-center">
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>