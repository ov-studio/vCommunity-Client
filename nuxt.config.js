module.exports = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Nuxt Directory: https://nuxtjs.org/docs/directory-structure/nuxt-config/#srcdir
  srcDir: "Client/",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ᴠ : ᴄʟɪᴇɴᴛ",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {hid: "description", name: "description", content: ""},
      {name: "format-detection", content: "telephone=no"}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/import"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Router: https://nuxtjs.org/docs/directory-structure/nuxt-config/#router
  router: {
    middleware: [
      "auth"
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {path: "@/components/icons/logo", extensions: ["vue"], prefix: "icon"},
    {path: "@/components/elements/button", extensions: ["vue"], prefix: "element"},
    {path: "@/components/widgets/menubar", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/viewbar", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/serverbar", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/groupbar", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/contactbar", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/server/channelbar", extensions: ["vue"], prefix: "widget-server"},
    {path: "@/components/widgets/chatbox", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/widgets/contentbox", extensions: ["vue"], prefix: "widget"},
    {path: "@/components/views/messages", extensions: ["vue"], prefix: "view"},
    {path: "@/components/views/contacts", extensions: ["vue"], prefix: "view"},
    {path: "@/components/views/settings", extensions: ["vue"], prefix: "view"},
    {path: "@/components/layouts/app", extensions: ["vue"], prefix: "layout"}
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    [
      "bootstrap-vue/nuxt",
      {
        icons: true
      }
    ],
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyAgelR-tOON225FBP6SB1Xko6CGZw4T_Oo",
          authDomain: "vstudio-e3283.firebaseapp.com",
          projectId: "vstudio-e3283",
          storageBucket: "vstudio-e3283.appspot.com",
          messagingSenderId: "745907216794",
          appId: "1:745907216794:web:ec949894bc6f89cf169a23",
          measurementId: "G-FRENMXPEZ6"
        },
        services: {
          auth: {
            ssr: false,
            persistence: "local",
            initialize: {
              onAuthStateChangedAction: "auth/onClientStateChange",
              subscribeManually: false
            }
          }
        }
      }
    ],
    "socket.io-client"
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
