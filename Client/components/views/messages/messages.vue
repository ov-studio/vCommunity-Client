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
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-center overflow-hidden view-messages-container">
    <!---- Server Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start disable-selection hide-scroller server-container"></div>

    <!---- Navigation Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start disable-selection overflow-hidden navigation-container">
      <div class="navigation-header">Private Messages</div>
      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
        <widget-contactbar v-for="(personalGroup, groupUID) in personalGroups" :key="groupUID" :isSelected="selections.personalGroup == groupUID" :contactUID="personalGroup.participantUID" contactAvatar="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg" @click.native="onClientChangeSelection('personalGroup', groupUID)"/>
      </div>
    </div>

    <!---- Navigation Renderer ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column view-container">
      <div class="disable-selection view-header">{{viewHeader}}</div>
      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column overflow-hidden">
        <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller content-container">
          <widget-chatbox v-for="(containerData, containerIndex) in viewMessages" :key="containerIndex" :messageUID="containerData.UID" :ownerUID="containerData.owner" :ownerTimestamp="parseTimeStamp(containerData.ownerMessages[(Object.keys(containerData.ownerMessages)[0])].DOC)" :ownerMessages="containerData.ownerMessages"/>
        </div>
      </div>

      <!---- Action Manager ---->
      <div class="w-100 min-w-100 max-w-100 d-flex flex-row disable-selection action-container">
        <input class="w-100 min-w-100 max-w-100 chat-input" autocomplete="off" spellcheck="false" @keypress="onClientSendMessage">
      </div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>