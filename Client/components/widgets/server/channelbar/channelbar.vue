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
    <div class="w-100 min-w-100 max-w-100 d-flex flex-row align-items-center justify-content-center overflow-hidden channelbar-header">
      <div class="w-100">{{containerHeader}}</div>
      <div class="server-option" @click.self="onClientServerOptionProcess($event.target)"><b-icon icon="grip-vertical" style="pointer-events: none !important;"/></div>
    </div>
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 hide-scroller channelbar-container">
      <div class="d-flex flex-column align-items-center justify-content-start channel-container">
        <div class="w-100 min-w-100 max-w-100 d-flex flex-row align-items-center justify-content-start container-header">
          <div class="w-100">Channels</div>
          <b-icon class="channel-adder" icon="plus" @click.prevent="onChannelCreatorProcess()"/>
        </div>
        <div v-for="(serverChannel, channelUID) in serverChannels" :key="channelUID"  class="w-100 d-flex flex-row align-items-center justify-content-start channel" :isSelected="isChannelSelected(channelUID)" @click.prevent="onClientSelectChannel(channelUID)"><div>{{serverChannel.name}}</div></div>
      </div>
    </div>

    <element-dropdown ref="server-options" dropdownHeader="Server Options">
      <div>Copy Invitation Code</div>
      <div>Server Roles</div>
      <div>Server Members</div>
      <div>Server Settings</div>
      <div>Leave Server</div>
    </element-dropdown>
    <widget-contentbox ref="server-channel-creator" @destroyed="onChannelCreatorProcess(null, true)">
      <element-input v-model="creator.controlInput" :inputHolder="creator.placeholder"/>
      <element-button :isDisabled="false" @click.native="onChannelCreatorProcess(true)">{{creator.text}}</element-button>
    </widget-contentbox>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>