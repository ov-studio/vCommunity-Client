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

export default function({app, route, redirect}) {
  const protectedRoutes = [importedJS.Generic.routeDatas.authRoute, importedJS.Generic.routeDatas.authRoute + "/"]
  const isProtectedRoute = protectedRoutes.indexOf(route.path) > -1
  if (!app.$fire.auth.currentUser) {
    if (!isProtectedRoute) {
      return redirect(importedJS.Generic.routeDatas.authRoute)
    }
  } else {
    if (isProtectedRoute) {
      return redirect("/")
    }  
  }
  return false
}