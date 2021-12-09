/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: middleware: auth.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Auth Middleware
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

import * as importedJS from "@/assets/import"


/*--------------------------------
-- Function: Handles Auth-Route --
--------------------------------*/

export default function({store, route, redirect}) {
  const protectedRoutes = [importedJS.Generic.routeDatas.authRoute, importedJS.Generic.routeDatas.authRoute + "/"]
  const isProtectedRoute = protectedRoutes.indexOf(route.path) > -1

  authModule.promise = new Promise(function(resolve) {
    if (authModule.isLoaded) {
      authModule.promise = false
      resolve()
    } else {
      authModule.resolver = resolve
    }
  })
  .then(function() {
    if (!store.state.auth.userCredentials) {
      if (!isProtectedRoute) {
        return redirect(importedJS.Generic.routeDatas.authRoute)
      }
    } else {
      if (isProtectedRoute) {
        return redirect("/")
      }  
    }
  })
  return authModule.promise
}


/*------------------------
-- Middleware Utilities --
------------------------*/

const authModule = {isLoaded: false, promise: false, resolver: false}
addEventListener(importedJS.Generic.eventDatas.auth.loaded.name, function() {
  authModule.isLoaded = true
  authModule.promise = false
  authModule.resolver()
}, false)