<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: groupbar: groupbar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Group Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-start overflow-hidden disable-selection widget-groupbar-container">
    
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start disable-selection overflow-hidden navigation-container">
      <div class="navigation-header">{{navigationHeader}}</div>
      <div v-if="!isServerSelected" class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
        <widget-contactbar v-for="(personalGroup, groupUID) in personalGroups" :key="groupUID" :isSelected="isGroupSelected(groupUID)" :contactUID="personalGroup.participantUID" contactAvatar="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg" @click.native="onClientSelectGroup(groupUID)"/>
      </div>
    </div>
  
    <span class="d-flex flex-column align-items-center server-container">
      <img class="disable-selection server" src="https://cdn.discordapp.com/attachments/780432225815625768/921033051893563422/noserver.png" :isSelected="isGroupSelected(false)" @click.prevent="onClientSelectGroup(false)">
      <img v-for="(serverGroup, groupUID) in serverGroups" :key="groupUID" class="disable-selection server" src="https://avatars.githubusercontent.com/u/92739628?s=400&u=bdd3e78f102ac3d1da615208c1beb55908d99064&v=4" :isSelected="isGroupSelected(groupUID)" @click.prevent="onClientSelectGroup(groupUID)">
    </span>
    <span class="d-flex flex-column align-items-center option-container">
      <b-icon icon="plus" class="option" @click.prevent="onClientCreateGroup()"/>
    </span>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>