import Vue from 'vue'
import vuetify from './plugins/vuetify'

import Preferences from './Preferences.vue'

interface UI {
  vue: Preferences
}

class UI {
  constructor() {
    console.log('hello')
    this.vue = new Vue({
      el: '#preferences',
      vuetify,
      render: (h) => h(Preferences)
    })
  }
}

export default UI
