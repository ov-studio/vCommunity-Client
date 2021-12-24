<!---------------------------------------------------------------
     Resource: vClient (Server)
     Script: components: pages: auth.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Page -- Auth
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative vw-100 vh-100 min-vw-100 min-vh-100 max-vw-100 max-vh-100 d-flex flex-row justify-content-center align-items-center overflow-hidden auth-container">
    <div class="mw-100 mh-100 d-flex flex-column justify-content-center align-items-center disable-selection">
      <!---- Components ---->
      <icon-logo/>
      <b-alert fade :show="alertDatas.eta" class="auth-alert" @dismissed="alertDatas.eta = 0" @dismiss-count-down="onClientAlertTick">
        <small>{{alertDatas.message}}</small>
        <div class="progress auth-progress">
          <div class="progress-bar" :style="{'width': 'calc(' + (alertDatas.eta - 1) + '%/'+ (alertDatas.duration - 1) + '*100) !important'}"/>
        </div>
      </b-alert>

      <!---- Phase: Login ---->
      <form v-if="formDatas.currentPhase == 'login'" class="mw-100 mh-100 d-flex flex-column justify-content-center auth-form" autocomplete="off" spellcheck="false">
        <div class="form-group">
          <small class="form-label" for="form-login-input-email">━ Email Address</small>
          <input :disabled="isUIDisabled" type="email" class="form-control" id="form-login-input-email" placeholder="Enter Email" v-model="formDatas[(formDatas.currentPhase)].inputDatas.email" @paste.prevent>
        </div>
        <div class="form-group">
          <small class="form-label" for="form-login-input-password">━ Password</small>
          <input :disabled="isUIDisabled" type="password" class="form-control" id="form-login-input-password" placeholder="Enter Password" v-model="formDatas[(formDatas.currentPhase)].inputDatas.password" @paste.prevent>
        </div>
      </form>

      <!---- Phase: Register ---->
      <form v-else-if="formDatas.currentPhase == 'register'" class="mw-100 mh-100 d-flex flex-column justify-content-center auth-form" autocomplete="off" spellcheck="false">
        <div class="form-group">
          <small class="form-label" for="form-register-input-email">━ Email Address</small>
          <input :disabled="isUIDisabled" type="email" class="form-control" id="form-register-input-email" placeholder="Enter Email" v-model="formDatas[(formDatas.currentPhase)].inputDatas.email" @paste.prevent>
        </div>
        <div class="form-group">
          <small class="form-label" for="form-register-input-username">━ Username</small>
          <input :disabled="isUIDisabled" type="email" class="form-control" id="form-register-input-username" placeholder="Enter Username" v-model="formDatas[(formDatas.currentPhase)].inputDatas.username" @paste.prevent @keypress="onClientInputUsername">
        </div>
        <div class="form-group">
          <small class="form-label" for="form-register-input-password">━ Password</small>
          <input :disabled="isUIDisabled" type="password" class="form-control" id="form-register-input-password" placeholder="Enter Password" v-model="formDatas[(formDatas.currentPhase)].inputDatas.password" @paste.prevent>
        </div>
        <div class="d-flex flex-row justify-content-center align-items-center form-group">
          <input :disabled="isUIDisabled" class="form-control form-date-control" placeholder="DAY" maxlength="2" v-model="formDatas[(formDatas.currentPhase)].inputDatas.DOB.day" @paste.prevent @keypress="onClientInputDOB">
          <input :disabled="isUIDisabled" class="form-control form-date-control" placeholder="MONTH" maxlength="2" v-model="formDatas[(formDatas.currentPhase)].inputDatas.DOB.month" @paste.prevent @keypress="onClientInputDOB">
          <input :disabled="isUIDisabled" class="form-control form-date-control" placeholder="YEAR" maxlength="4" v-model="formDatas[(formDatas.currentPhase)].inputDatas.DOB.year" @paste.prevent @keypress="onClientInputDOB">
        </div>
      </form>

      <!---- Phase Manager ---->
      <button :disabled="isUIDisabled" class="flex-fill btn form-button justify-content-center align-items-center disable-selection" @click.prevent="onClientProcessPhase">
        <div class="form-button-text">{{formDatas.currentPhase}}</div>
      </button>
      <small :disabled="isUIDisabled" class="align-self-center form-router" @click.prevent="onClientChangePhase">{{formDatas[(formDatas.currentPhase)].routerDesc}}</small>
    </div>
  </div>
</template>


<!----------
-- Script --
----------->

<script>
import {Generic, Library} from "@/assets/import"

export default {
  data() {
    return {
      socketBuffer: {
        auth: {}
      },
      isUIEnabled: true,
      alertDatas: {
        eta: 0,
        duration: 5,
        message: ""
      },
      formDatas: {
        currentPhase: "login",
        login: {
          inputDatas: {
            email: "",
            password: "",
          },
          statuses: {
            "void": "You've entered wrong credentials!",
            "auth/successful": "You've successfully logged in!",
            "auth/user-disabled": "Your account has been disabled!"
          },
          routerType: "register",
          routerDesc: "Don't have an account?"
        },
        register: {
          inputDatas: {
            email: "",
            username: "",
            password: "",
            DOB: {
              day: "",
              month: "",
              year: ""
            },
          },
          statuses: {
            "void": "Please enter valid credentials!",
            "auth/email-already-exists": "Email already belongs to an account!",
            "auth/username-already-exists": "Username already belongs to an account!",
            "auth/invalid-password": "Please enter a stronger password!",
            "auth/successful": "You've successfully registered!",
            "auth/failed": "Unfortunately, we couldn't process your request!"
          },
          routerType: "login",
          routerDesc: "Already have an account?"
        }
      }
    }
  },

  beforeDestroy() {
    Library.Utility.unsubSocketBuffer(this.socketBuffer)
  },

  computed: {
    isUIDisabled: function() {
      return !((this.isUIEnabled && this.$store.state.auth.isAuthNetworked && true) || false)
    }
  },

  methods: {
    onClientEnableUI(state) {
      this.isUIEnabled = (state && true) || false
    },

    onClientShowAlert(message) {
      this.alertDatas.message = (message || "")
      this.alertDatas.eta = this.alertDatas.duration
    },

    onClientAlertTick(eta) {
      this.alertDatas.eta = eta
    },

    onClientInputUsername(event) {
      if (event.keyCode == 32) event.preventDefault(); return false
    },

    onClientInputDOB(event) {
      if (!isFinite(event.key)) event.preventDefault(); return false
    },

    onClientChangePhase() {
      if (this.isUIDisabled) return false
      this.formDatas.currentPhase = this.formDatas[(this.formDatas.currentPhase)].routerType
    },

    onClientProcessPhase() {
      if (this.isUIDisabled) return false
      const componentInstance = this
      if (componentInstance.formDatas.currentPhase == "login") {
        componentInstance.onClientEnableUI(false)
        componentInstance.$store.dispatch("auth/onClientLogin", {
          email: componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.email,
          password: componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.password
        })
        .then(function(result) {
          let alertMessage = (componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].statuses[(result.status)] || componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].statuses["void"])
          componentInstance.onClientEnableUI(true)
          componentInstance.onClientShowAlert(alertMessage)
        })
      } else if (componentInstance.formDatas.currentPhase == "register") {
        if (componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.username.length <= 2) return componentInstance.onClientShowAlert("Please enter a valid username!")
        if (!Library.Utility.isDateValid(componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.DOB)) return componentInstance.onClientShowAlert("Please enter a valid D-O-B!")
        if (!Library.Utility.isAgeValid(componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.DOB, Generic.appRequirements.age)) return componentInstance.onClientShowAlert("You must be " + Generic.appRequirements.age + "+ to register!")
        componentInstance.onClientEnableUI(false)
        componentInstance.$store.dispatch("auth/onClientRegister", {
          email: componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.email,
          password: componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.password,
          username: componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.username,
          DOB: Library.Utility.isDateValid(componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas.DOB)
        })
        componentInstance.socketBuffer.auth["Auth:onClientRegister"] = true
        Library.Socket.getSocket("auth").socket.on("Auth:onClientRegister", function(result) {
          Library.Socket.getSocket("auth").socket.off("Auth:onClientRegister")
          delete componentInstance.socketBuffer.auth["Auth:onClientRegister"]
          let alertMessage = (componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].statuses[(result.status)] || componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].statuses["void"])
          if (result.success) {
            Library.Utility.clearObjectStrings(componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].inputDatas, true)
            componentInstance.formDatas.currentPhase = componentInstance.formDatas[(componentInstance.formDatas.currentPhase)].routerType
          }
          componentInstance.onClientEnableUI(true)
          componentInstance.onClientShowAlert(alertMessage)
        })
      }
    }
  }
}
</script>


<!---------
-- Style --
---------->

<style scoped lang="sass">
@import "@/assets/import"

.auth-container
  $padding-horizontal: 15px
  $background-color: map-read($config_palette, "wrapper-primary-color")
  padding-left: $padding-horizontal !important
  padding-right: $padding-horizontal !important
  background-color: $background-color !important
  & > *
    z-index: 1 !important
  .auth-alert
    $margin-vertical: -30px
    $padding-horizontal: 15px
    $padding-vertical: 45px
    $height: 34px
    $font: "Typo Round"
    $font-size: 15px
    $font-weight: 800
    $font-spacing: 2.5px
    $font-color: map-read($config_palette, "accent-secondary-color")
    padding: 0px !important
    margin-top: $margin-vertical !important
    padding: 0px $padding-horizontal !important
    padding-bottom: $padding-vertical !important
    width: 100% !important
    height: $height !important
    line-height: $height !important
    +vendor("text-transform", "uppercase !important")
    +vendor("text-align", "center !important")
    font-family: $font !important
    font-size: $font-size !important
    font-weight: $font-weight !important
    letter-spacing: $font-spacing !important
    color: $font-color !important
    background-color: rgba(0, 0, 0, 0) !important
    border-width: 0px !important
    border-color: rgba(0, 0, 0, 0) !important
    .auth-progress
      $height: 4px
      $background-color: map-read($config_palette, "accent-quaternary-color")
      height: $height !important
      background-color: $background-color !important
      .progress-bar
        $background-color: map-read($config_palette, "accent-secondary-color")
        background-color: $background-color !important
  .auth-form
    $width: 350px
    width: $width
  .form-label
    $font: "Typo Round"
    $font-size: 12.5px
    $font-weight: 800
    $font-spacing: 2.5px
    $font-color: map-read($config_palette, "accent-tertiary-color")
    +vendor("text-transform", "uppercase !important")
    font-family: $font !important
    font-size: $font-size !important
    font-weight: $font-weight !important
    letter-spacing: $font-spacing !important
    color: $font-color !important
  .form-group
    width: 100% !important
    height: 100% !important
  .form-control
    $height: 34px
    $font: "Typo Round"
    $font-size: 15px
    $font-color: map-read($config_palette, "accent-quinary-color")
    $border-radius: 5px
    $border-width: 2px
    $border-color: rgba(map-read($config_palette, "accent-tertiary-color"), 0.5)
    height: calc($height - $border-width)
    line-height: calc($height - $border-width) !important
    font-family: $font !important
    font-size: $font-size !important
    color: $font-color !important
    background-color: rgba(0, 0, 0, 0) !important
    border-radius: $border-radius !important
    border-width: 0px !important
    border-style: solid !important
    border-bottom-width: $border-width !important
    border-color: $border-color !important
    +vendor("transition", "all 0.5s ease !important")
    &::placeholder
      $font-color: map-read($config_palette, "accent-tertiary-color")
      color: $font-color !important
    &:focus::placeholder
      $font-color: rgba(map-read($config_palette, "accent-tertiary-color"), 0.25)
      color: $font-color !important
      +vendor("transition", "all 0.5s ease !important")
    &::selection
      $background-color: map-read($config_palette, "accent-quaternary-color")
      background-color: $background-color !important
    &:hover:not([disabled]), &:focus:not([disabled])
      $border-color: map-read($config_palette, "accent-primary-color")
      $scale: 1.1
      border-color: $border-color !important
      transform: scale($scale, $scale) !important
    &.form-date-control
      $margin-horizontal: 5px
      margin-left: $margin-horizontal !important
      margin-right: $margin-horizontal !important
      +vendor("text-align", "center !important")
      border-left-width: $border-width !important
      border-right-width: $border-width !important
      border-top-width: $border-width !important
  .form-button
    $margin-vertical: 13px
    $width: 300px
    $height: 7px
    $font: "Typo Round"
    $font-size: 15px
    $font-weight: 800
    $font-spacing: 10px
    $font-color: map-read($config_palette, "wrapper-secondary-color")
    $background-color: map-read($config_palette, "accent-primary-color")
    $skew: 20deg
    margin-top: $margin-vertical
    width: $width
    min-width: fit-content !important
    height: $height !important
    line-height: $height !important
    +vendor("box-sizing", "content-box !important")
    +vendor("align-self", "center !important")
    +vendor("text-transform", "uppercase !important")
    font-family: $font !important
    font-size: $font-size !important
    font-weight: $font-weight !important
    letter-spacing: $font-spacing !important
    color: $font-color !important
    background-color: $background-color !important
    transform: skewx($skew) scale(1, 1) !important
    +vendor("transition", "all 0.25s ease !important")
    &::first-letter
      padding-left: $font-spacing !important
    .form-button-text
      $padding-vertical: 1.25px
      padding-top: $padding-vertical
      +vendor("transition", "all 0.25s ease !important")
    > *
      transform: skewx(calc($skew*-1)) !important
    &:hover:not([disabled])
      $scale: 1.1
      $background-color: map-read($config_palette, "accent-quinary-color")
      background-color: $background-color !important
      transform: skewx($skew) scale($scale, $scale) !important
      > *
        transform: skewx(calc(360deg - $skew)) scale($scale, $scale) !important
  .form-router
    $padding-vertical: 15px
    $font: "Typo Round"
    $font-size: 10px
    $font-spacing: 5px
    $font-color: rgba(0, 0, 0, 0)
    $font-stroke-size: 1px
    $font-stroke-color: map-read($config_palette, "accent-primary-color")
    padding-top: $padding-vertical !important
    +vendor("align-self", "center !important")
    +vendor("text-transform", "uppercase !important")
    font-family: $font !important
    font-size: $font-size !important
    letter-spacing: $font-spacing !important
    color: $font-color !important
    -webkit-text-stroke: $font-stroke-size $font-stroke-color !important
    +vendor("transition", "all 0.25s ease !important")
    &::first-letter
      padding-left: $font-spacing !important
    &:hover:not([disabled])
      $font-stroke-color: map-read($config_palette, "accent-quinary-color")
      $scale: 1.1
      cursor: pointer !important
      -webkit-text-stroke: $font-stroke-size $font-stroke-color !important
      transform: scale($scale, $scale) !important
</style>