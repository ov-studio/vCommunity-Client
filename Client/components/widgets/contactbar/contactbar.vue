<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: contactbar: contactbar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Contact Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-center justify-content-start overflow-hidden disable-selection widget-contactbar-container">
    <span class="position-relative">
      <img class="disable-selection contact-avatar" :src="contactAvatar">
      <span class="position-absolute contact-online-status" :isOnline="isContactOnline(contactUID)"/>
    </span>
    <div class="overflow-hidden contact-name">{{getContactName(contactUID)}}</div>
    <div v-for="(optionData, optionIndex) in contactOptions" :key="optionIndex" class="contact-option" @click.prevent="contactOptionHandler(contactUID, optionData)">{{optionData.type}}</div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>