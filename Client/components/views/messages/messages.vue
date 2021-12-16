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
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-start disable-selection hide-scroller server-navigation-container">
      <span class="d-flex flex-column align-items-center servers-container">
        <img :isSelected="!selections.serverGroup" class="disable-selection server-logo" src="https://cdn.discordapp.com/attachments/780432225815625768/921033051893563422/noserver.png" @click.prevent="onClientChangeSelection('serverGroup', false)">
        <img v-for="(serverGroup, groupUID) in serverGroups" :key="groupUID" :isSelected="selections.serverGroup == groupUID" class="disable-selection server-logo" src="https://avatars.githubusercontent.com/u/92739628?s=400&u=bdd3e78f102ac3d1da615208c1beb55908d99064&v=4" @click.prevent="onClientChangeSelection('serverGroup', groupUID)">
      </span>
      <span class="d-flex flex-column align-items-center action-container">
        <b-icon icon="plus" class="option-container" @click.prevent="onClientCreateServer"/>
      </span>
    </div>

    <!---- Navigation Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start disable-selection overflow-hidden navigation-container">
      <div class="navigation-header">{{navigationHeader}}</div>
      <div v-if="!selections.serverGroup" class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
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
    <widget-contentbox>
      <div>Testing..</div>
      <div>Testing..</div>
      <input placeholder="Enter Server UID" @paste.prevent>
      <div>Testing..</div>
      <div>Testing..2</div>
    </widget-contentbox>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>