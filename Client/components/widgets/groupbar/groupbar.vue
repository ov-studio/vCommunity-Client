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
    <div class="groupbar-header">{{containerHeader}}</div>
    <div v-if="!isServerSelected" class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
      <widget-contactbar v-for="(personalGroup, groupUID) in personalGroups" :key="groupUID" :contactUID="personalGroup.participantUID" contactAvatar="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg" :isSelected="isGroupSelected(groupUID)" @click.native="onClientSelectGroup(groupUID)"/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>