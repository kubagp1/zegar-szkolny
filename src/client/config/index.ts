import { connectToChild } from 'penpal' // @ts-ignore
import dotty from 'dotty'

import Settings from './settings'

import DEFAULT_SETTINGS from './default.json'
import Timetable from '../timetable'

interface Config {
  settings: Settings
}

function getSettingsFromLocalStorage() {
  try {
    const entry = localStorage.getItem('settings')
    if (typeof entry != 'string')
      throw new TypeError('"settings" entry is not string')
    return JSON.parse(entry)
  } catch {
    return null
  }
}

function validateSettings(settings: any): boolean {
  if (typeof settings != 'object') {
    return false
  }

  // I hate this btw

  if (typeof settings?.showLogoOnStartup != 'boolean') return false
  if (typeof settings?.timeOffset != 'number') return false
  if (typeof settings?.colors != 'object') return false
  if (typeof settings?.colors.default != 'object') return false
  if (typeof settings?.colors.default.clock != 'string') return false
  if (typeof settings?.colors.default.background != 'string') return false
  if (typeof settings?.colors.default.progressBackground != 'string')
    return false
  if (typeof settings?.colors.default.progressFilled != 'string') return false
  if (typeof settings?.colors.default.progressTip != 'string') return false
  if (typeof settings?.colors.alternative != 'object') return false
  if (typeof settings?.colors.alternative.clock != 'string') return false
  if (typeof settings?.colors.alternative.background != 'string') return false
  if (typeof settings?.colors.alternative.progressBackground != 'string')
    return false
  if (typeof settings?.colors.alternative.progressFilled != 'string')
    return false
  if (typeof settings?.colors.alternative.progressTip != 'string') return false
  if (typeof settings?.appearance != 'object') return false
  if (typeof settings?.appearance.showProgressBar != 'boolean') return false
  if (typeof settings?.appearance.showProgressBarTip != 'boolean') return false
  if (typeof settings?.appearance.displayOffsetedTime != 'boolean') return false

  return true
}

class Config {
  timetable: Timetable
  constructor(timetable: Timetable) {
    this.timetable = timetable

    const settingsFromLocalStorage = getSettingsFromLocalStorage()
    if (validateSettings(settingsFromLocalStorage)) {
      this.settings = new Settings(settingsFromLocalStorage)
    } else {
      console.log('Using default settings')
      this.settings = new Settings(DEFAULT_SETTINGS)
    }

    setTimeout(this.applySettings.bind(this), 0) // this line would be executed while constructor for App hasn't ended, resulting in errors while trying to modify App object.

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

  private saveSettingsToLocalStorage() {
    // I hate this too
    localStorage.setItem(
      'settings',
      JSON.stringify({
        showLogoOnStartup: this.settings.showLogoOnStartup.value,
        timeOffset: this.settings.timeOffset.value,
        colors: {
          default: {
            clock: this.settings.colors.default.clock.value,
            background: this.settings.colors.default.background.value,
            progressBackground:
              this.settings.colors.default.progressBackground.value,
            progressFilled: this.settings.colors.default.progressFilled.value,
            progressTip: this.settings.colors.default.progressTip.value
          },
          alternative: {
            clock: this.settings.colors.alternative.clock.value,
            background: this.settings.colors.alternative.background.value,
            progressBackground:
              this.settings.colors.alternative.progressBackground.value,
            progressFilled:
              this.settings.colors.alternative.progressFilled.value,
            progressTip: this.settings.colors.alternative.progressTip.value
          }
        },
        appearance: {
          showProgressBar: this.settings.appearance.showProgressBar.value,
          showProgressBarTip: this.settings.appearance.showProgressBarTip.value,
          displayOffsetedTime:
            this.settings.appearance.displayOffsetedTime.value
        }
      })
    )
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
          this.saveSettingsToLocalStorage()
        },
        getValue: (path: string) => {
          console.log('get', { path })
          return dotty.get(this.settings, path).value
        },
        close: () => {
          ;(iframe.parentElement as HTMLDivElement).classList.add('d-none')
        },
        restoreDefaultConfig: () => {
          localStorage.removeItem('settings')
          window.location.reload()
        },
        getTimetable: ()=> {
          return this.timetable.lessons
        },
        setTimetable: (timetable: any)=> {
          this.timetable.load(timetable)
        },
        restoreDefaultTimetable: ()=> {
          this.timetable.restoreDeafultTimetable()
        }
      }
    })
  }
}

export default Config
