<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: widgets: chatbox: chatbox.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Widget -- Chat Box
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-row align-items-start justify-content-start overflow-hidden widget-chatbox-container">
    <img class="disable-selection owner-avatar" src="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg">
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-items-start">
      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-row disable-selection message-header">
        <div class="owner-tag">Aviril</div>
        <div class="tag-header">Admin</div>
        <div class="timestamp-tag">4:50 PM</div>
      </div>
      <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-items-start message-body">
        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus sit dolores minima totam quis facere voluptatibus nihil, culpa modi possimus sapiente, impedit quos tempore. Beatae maxime nobis placeat temporibus ducimus?</div>
        <div>Testing...</div>
        <div>Testing...</div>
        <div>Testing...</div>
      </div>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>