<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: elements: dropdown: dropdown.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Element -- dropdown
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-fixed d-flex flex-column align-items-center justify-content-center element-dropdown-container">
    <div class="w-100 min-w-100 max-w-100 overflow-hidden dropdown-header">SERVER OPTIONS</div>
    <div class="w-100 min-w-100 max-w-100 overflow-hidden dropdown-container">
      <slot class="w-100"></slot>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>