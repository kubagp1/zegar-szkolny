import Vue from 'vue'
import vuetify from './plugins/vuetify'

import { connectToParent } from 'penpal'

import Preferences from './Preferences.vue'

import { makeSettings, Parent } from './settings'
import Settings from './settings'

const connection = connectToParent({
  // Methods child is exposing to parent
  methods: {}
})

connection.promise.then((parent) => {
  var settings = makeSettings(parent as unknown as Parent)

  Vue.prototype.$settings = settings

  new Vue({
    el: '#preferences',
    vuetify,
    render: (h) => h(Preferences)
  })
})
