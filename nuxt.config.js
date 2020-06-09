module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Super Star',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/whistle-stars.svg' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3b8070' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/firebase',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  firebase: {
    config: {
      apiKey: "AIzaSyCMhO1w_3HH_rt4aZv6e6s2oTV2RydC7Rg",
      authDomain: "super-star-fde9b.firebaseapp.com",
      databaseURL: "https://super-star-fde9b.firebaseio.com",
      projectId: "super-star-fde9b",
      storageBucket: "super-star-fde9b.appspot.com",
      messagingSenderId: "498304842042",
      appId: "1:498304842042:web:90dbf028662c144434f803",
      measurementId: "G-03DQREGW0R"
    },
    services: {
      auth: true
    },
    realtimeDb: true,
    messaging: true
  },
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
