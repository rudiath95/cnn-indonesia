export default {
  head: {
    title: 'berita',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: ['~/assets/css/main'],
  plugins: [{ src: '~/plugins/vue-trix', mode: 'client' }],

  components: [{ path: '~/components', prefix: 'x' }],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/eslint-module'],

  axios: {
    baseURL: '/'
  },

  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    },
    vendor: ['vue-trix']
  },

  // Configuration for environment variables
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL
  }
  // debug: true
};
