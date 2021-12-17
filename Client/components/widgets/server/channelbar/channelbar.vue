<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: server: channelbar: channelbar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Channel Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-start overflow-hidden disable-selection widget-server-channelbar-container">
    <div class="w-100 min-w-100 max-w-100 groupbar-header">{{containerHeader}}</div>
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller contacts-container">
      <widget-contactbar v-for="(serverChannel, groupUID) in serverChannels" :key="groupUID" :contactUID="serverChannel.participantUID" contactAvatar="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg" :isSelected="isChannelSelected(groupUID)" @click.native="onClientSelectGroup(groupUID)"/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>