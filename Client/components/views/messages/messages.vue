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
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-start disable-selection hide-scroller server-container">
      <img class="server" src="https://avatars.githubusercontent.com/u/92739628?s=400&u=bdd3e78f102ac3d1da615208c1beb55908d99064&v=4">
      <img class="server" src="https://preview.redd.it/ofvcoonrpt051.png?width=640&crop=smart&auto=webp&s=333e4e109fe5bc7d6c3678acb2f15f200f842eb2">
      <img class="server" src="https://i.pinimg.com/736x/c4/a2/93/c4a293aad71f5ac683b236a9efebbb3b.jpg">
      <img class="server" src="https://i.pinimg.com/736x/c4/a2/93/c4a293aad71f5ac683b236a9efebbb3b.jpg">
      <img class="server" src="https://i.pinimg.com/736x/c4/a2/93/c4a293aad71f5ac683b236a9efebbb3b.jpg">
      <img class="server" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VV-jJ2SyljYTWgdBWq2ZNwMQWR-BmLsCRA&usqp=CAU">
    </div>

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
        <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller content-container" @scroll.self="onClientUpdateMessageView">
          <widget-chatbox v-for="(containerData, containerIndex) in viewMessages" :key="containerIndex" :messageUID="containerData.UID" :ownerUID="containerData.owner" :ownerTimestamp="parseTimeStamp(containerData.ownerMessages[(Object.keys(containerData.ownerMessages)[0])].DOC)" :ownerMessages="containerData.ownerMessages"/>
        </div>
      </div>

      <!---- Action Manager ---->
      <div v-if="viewMessages" class="w-100 min-w-100 max-w-100 d-flex flex-row disable-selection action-container">
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