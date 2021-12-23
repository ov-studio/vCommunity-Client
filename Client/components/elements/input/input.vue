<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: elements: input: input.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Element -- Input
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <input class="position-relative disable-selection overflow-hidden widget-element-input-container" :value="value" :placeholder="inputHolder" autocomplete="off" spellcheck="false" @input="syncValue">
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>