import { connectToChild } from 'penpal' // @ts-ignore
import dotty from 'dotty'

import Settings from './settings'

import DEFAULT_SETTINGS from './default.json'
import Setting from './Setting'

interface Config {
  settings: Settings
}

class Config {
  constructor() {
    this.settings = new Settings(DEFAULT_SETTINGS)
    this.applySettings()

    this.connectToIframe()
  }

  private applySettings(): void {
    const iterate = (obj: object) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value['applySetting'] == 'function') {
          value.applySetting()
        } else {
          iterate(value)
        }
      })
    }

    iterate(this.settings)
  }

  private connectToIframe() {
    const iframe = document.querySelector(
      'iframe#preferences'
    ) as HTMLIFrameElement

    connectToChild({
      iframe,
      methods: {
        setValue: (path: string, newValue: any) => {
          console.log('set', {
            path,
            newValue
          })
          dotty.get(this.settings, path).setValue(newValue)
        },
        getValue: (path: string) => {
          console.log('get', { path })
          return dotty.get(this.settings, path).value
        },
        close: () => {
          ;(iframe.parentElement as HTMLDivElement).classList.add('d-none')
        }
      }
    })
  }
}

export default Config
