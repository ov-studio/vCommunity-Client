/*----------------------------------------------------------------
     Resource: vCommunity-Client
     Script: assets: import.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Style Importer
----------------------------------------------------------------*/


module.exports = {
  /*------------------
  -- Configurations --
  ------------------*/
  Generic: require("@/assets/configs/javascripts/generic"),


  /*-------------
  -- Libraries --
  -------------*/
  Library: {
    Socket: require("@/assets/libraries/javascripts/socket"),
    Chat: require("@/assets/libraries/javascripts/chat"),
    Utility: require("@/assets/libraries/javascripts/utility")
  }
}