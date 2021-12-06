<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: views: contacts.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: View -- Contacts
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-column align-items-center overflow-hidden disable-selection view-contacts-container">
    <!---- Navigation Manager ---->
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-row align-self-start hide-scroller navigation-container">
      <div v-for="(navigationData, navigationIndex) in navigations" :key="navigationIndex" :navigationIndex="navigationIndex" :isSelected="selectedNavigation == navigationIndex" class="navigation" @click.prevent="onClientChangeNavigation(navigationIndex)">{{navigationIndex}} {{onClientGetNavigationLength(navigationIndex)}}</div>
    </div>

    <!---- Navigation Renderer ---->
    <div v-if="isFriendFinder" class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-center overflow-hidden friends-finder-container">
      <div class="finder-header">Hey, I am waiting for you!</div>
      <input class="finder-control" placeholder="Enter Username">
      <div class="finder-action">
        <div class="form-button-text">Invite</div>
      </div>
    </div>
    <div v-else class="w-100 min-w-100 max-w-100 d-flex flex-column align-self-start align-items-center justify-content-start hide-scroller contacts-container">
      <widget-contactbar v-for="(contactData, contactUID) in contactDatas.contacts" :key="contactUID" :contactUID="contactUID" :contactName="contactData.name" :contactAvatar="contactData.avatar" :contactOptions="contactDatas.options" :contactOptionHandler="onClientProcessOption"/>
      <widget-contactbar></widget-contactbar>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>