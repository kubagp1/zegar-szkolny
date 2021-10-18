import Vue from 'vue'
import vuetify from './plugins/vuetify'

import { connectToParent } from 'penpal'

import Preferences from './Preferences.vue'

import { makeSettings, Parent } from './settings'
import Settings from './settings'

Vue.config.productionTip = false
Vue.config.devtools = false

const connection = connectToParent({
  methods: {}
})

connection.promise.then((parent) => {
  var settings = makeSettings(parent as unknown as Parent)

  Vue.prototype.$settings = settings
  Vue.prototype.$top = parent

  new Vue({
    el: '#preferences',
    vuetify,
    render: (h) => h(Preferences)
  })
})
