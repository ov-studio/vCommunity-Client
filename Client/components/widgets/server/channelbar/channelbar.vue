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
      <div class="d-flex flex-column align-items-center justify-content-start channel-container">
        <div class="d-flex flex-row align-items-center justify-content-start container-header"><div class="w-100">CHANNELS</div><b-icon class="channel-adder" icon="plus" @click.prevent="onCreateChannel()"/></div>
        <div v-for="(serverChannel, channelUID) in serverChannels" :key="channelUID"  class="d-flex flex-row align-items-center justify-content-start channel" :isSelected="isChannelSelected(channelUID)" @click.prevent="onClientSelectChannel(channelUID)"><div>{{serverChannel.name}}</div></div>
        <!--:isSelected="isChannelSelected(groupUID)" div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 1</div></!--:isSelected=>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 2</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 3</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 4</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 5</div></div>
        <div--- class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 6</div></div--->
      </div>
      <!--div class="d-flex flex-column align-items-center justify-content-start channel-container">
        <div class="d-flex flex-row align-items-center justify-content-start container-header"><div class="w-100">CATEGORY 2</div><b-icon class="channel-adder" icon="plus"/></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 1</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 2</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 3</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 4</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 5</div></div>
        <div class="d-flex flex-row align-items-center justify-content-start channel"><div>Channel 6</div></div>
      </!--div-->
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>