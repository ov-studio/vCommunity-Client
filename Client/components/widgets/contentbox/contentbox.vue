<!---------------------------------------------------------------
     Resource: vCommunity-Client
     Script: components: widgets: contentbox: contentbox.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Content Box
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div v-if="isVisible" class="position-fixed vw-100 vh-100 min-vw-100 min-vh-100 max-vw-100 max-vh-100 d-flex flex-row align-items-center disable-selection overflow-hidden widget-contentbox-container">
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-items-center justify-content-center hide-scroller contentbox-container" @click.self="destroyWidget">
      <slot/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>