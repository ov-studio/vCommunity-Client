<!---------------------------------------------------------------
     Resource: vCommunity-Client
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
  <div class="position-relative disable-selection overflow-hidden element-button-container" :isDisabled="isDisabled" @click.prevent="clickElement">
    <div class="button-text">
      <slot/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>