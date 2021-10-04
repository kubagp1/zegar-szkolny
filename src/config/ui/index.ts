import Vue from 'vue'
import Preferences from './Preferences.vue'

interface UI {
  vue: Preferences
}

class UI {
  constructor() {
    console.log('hello')
    this.vue = new Vue({
      el: '#preferences',
      render: (h) => h(Preferences)
    })
  }
}

export default UI
