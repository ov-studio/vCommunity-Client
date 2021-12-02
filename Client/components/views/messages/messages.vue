<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: views: messages.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: View -- Messages
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-center overflow-hidden disable-selection view-messages-container">
    <!---- Server Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start hide-scroller server-container"></div>

    <!---- Navigation Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start overflow-hidden navigation-container">
      <div class="navigation-header">Private Messages</div>
      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
        <widget-contactbar isSelected="true" v-for="(contactData, contactUID) in contactDatas.contacts" :key="contactUID" :contactUID="contactUID" :contactName="contactData.name" :contactAvatar="contactData.avatar"/>
      </div>
    </div>

    <!---- Navigation Renderer ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column view-container">
      <div class="view-header">@Aviril</div>

      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column overflow-hidden content-container">
        <widget-chatbox/>
        <widget-chatbox/>
        <widget-chatbox/>
      </div>

      <div class="w-100 min-w-100 max-w-100 d-flex flex-row action-container">
        <input class="w-100 min-w-100 max-w-100 chat-input">
      </div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>