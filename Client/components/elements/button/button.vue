<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: elements: button: button.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Element -- Button
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative disable-selection overflow-hidden widget-element-button-container" @click.prevent="clickElement">
    <div class="button-text">
      <slot></slot>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>