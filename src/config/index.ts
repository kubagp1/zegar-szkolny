import UI from './ui'

interface Config {
  ui: UI
}

class Config {
  constructor() {
    this.ui = new UI()
  }
}

export default Config
