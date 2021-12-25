<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: elements: dropdown: dropdown.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Element -- Dropdown
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div v-if="isVisible" class="position-fixed d-flex flex-column align-items-center justify-content-center element-dropdown-container" :style="{'left': position[0] + 'px !important', 'top': position[1] + 'px !important'}">
    <div v-if="dropdownHeader" class="w-100 min-w-100 max-w-100 overflow-hidden dropdown-header">{{dropdownHeader}}</div>
    <div class="w-100 min-w-100 max-w-100 overflow-hidden dropdown-container">
      <div v-for="(optionData, optionIndex) in dropdownOptions" :key="optionIndex" class="w-100" @click.prevent="dropdownOptionHandler(optionIndex)">{{optionData.name}}</div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>