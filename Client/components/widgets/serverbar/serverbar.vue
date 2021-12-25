<!---------------------------------------------------------------
     Resource: vCommunity-Client
     Script: components: widgets: serverbar: serverbar.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Server Bar
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-start disable-selection hide-scroller widget-serverbar-container">
    <span class="d-flex flex-column align-items-center server-container">
      <img class="disable-selection server" src="https://cdn.discordapp.com/attachments/780432225815625768/921033051893563422/noserver.png" :isSelected="isGroupSelected(false)" @click.prevent="onClientSelectGroup(false)">
      <img v-for="(serverGroup, groupUID) in serverGroups" :key="groupUID" class="disable-selection server" src="https://avatars.githubusercontent.com/u/92739628?s=400&u=bdd3e78f102ac3d1da615208c1beb55908d99064&v=4" :isSelected="isGroupSelected(groupUID)" @click.prevent="onClientSelectGroup(groupUID)">
    </span>
    <span class="d-flex flex-column align-items-center option-container">
      <b-icon icon="plus" class="option" @click.prevent="onGroupCreatorProcess()"/>
    </span>

    <widget-contentbox ref="server-creator" @destroyed="onGroupCreatorProcess(null, true)">
      <element-input v-if="creator.currentPhase" v-model="creator.controlInput" :inputHolder="creator.phases[(creator.currentPhase)].placeholder"/>
      <span v-for="(creatorPhase, phaseIndex) in creator.phases" :key="phaseIndex">
        <element-button v-if="!creator.currentPhase || (creator.currentPhase == phaseIndex)" :isDisabled="false" @clicked="onGroupCreatorProcess(phaseIndex)">{{((creator.currentPhase == phaseIndex) && creatorPhase.altText) || creatorPhase.text}}</element-button>
      </span>
      <element-button v-if="creator.currentPhase" :isDisabled="false" @click.native="onGroupCreatorProcess('back')">{{creator.returnText}}</element-button>
    </widget-contentbox>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>