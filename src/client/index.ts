import './style.less'

import App from './App'

declare global {
  interface Window {
    app: App
  }
}

window.app = new App()
