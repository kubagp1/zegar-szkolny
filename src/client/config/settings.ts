import App from '../App'
import Setting from './Setting'

interface Settings {
  showLogoOnStartup: Setting<boolean>
  timeOffset: Setting<number>
  colors: {
    default: {
      clock: Setting<string>
      background: Setting<string>
      progressBackground: Setting<string>
      progressFilled: Setting<string>
      progressTip: Setting<string>
    }
    alternative: {
      clock: Setting<string>
      background: Setting<string>
      progressBackground: Setting<string>
      progressFilled: Setting<string>
      progressTip: Setting<string>
    }
  }
  appearance: {
    showProgressBar: Setting<boolean>
    showProgressBarTip: Setting<boolean>
    displayOffsetedTime: Setting<boolean>
  }
}

export interface SettingsValues {
  showLogoOnStartup: boolean
  timeOffset: number
  colors: {
    default: {
      clock: string
      background: string
      progressBackground: string
      progressFilled: string
      progressTip: string
    }
    alternative: {
      clock: string
      background: string
      progressBackground: string
      progressFilled: string
      progressTip: string
    }
  }
  appearance: {
    showProgressBar: boolean
    showProgressBarTip: boolean
    displayOffsetedTime: boolean
  }
}

function setCSSVariable(key: string, value: string) {
  document.documentElement.style.setProperty(`--${key}`, value)
}

class Settings {
  constructor(config: SettingsValues) {
    this.showLogoOnStartup = {
      ...new Setting(config.showLogoOnStartup),
      applySetting() {
        console.warn('missing implementation!')
      }
    }

    this.timeOffset = {
      ...new Setting(config.timeOffset),
      applySetting() {
        window.app.timeOffset = this.value
      }
    }

    this.colors = {
      default: {
        background: {
          ...new Setting(config.colors.default.background),
          applySetting() {
            setCSSVariable('default-background-color', this.value)
          }
        },
        clock: {
          ...new Setting(config.colors.default.clock),
          applySetting() {
            setCSSVariable('default-clock-color', this.value)
          }
        },
        progressBackground: {
          ...new Setting(config.colors.default.progressBackground),
          applySetting() {
            setCSSVariable('default-progress-background-color', this.value)
          }
        },
        progressFilled: {
          ...new Setting(config.colors.default.progressFilled),
          applySetting() {
            setCSSVariable('default-progress-filled-color', this.value)
          }
        },
        progressTip: {
          ...new Setting(config.colors.default.progressTip),
          applySetting() {
            setCSSVariable('default-progress-tip-color', this.value)
          }
        }
      },
      alternative: {
        background: {
          ...new Setting(config.colors.alternative.background),
          applySetting() {
            setCSSVariable('alternative-background-color', this.value)
          }
        },
        clock: {
          ...new Setting(config.colors.alternative.clock),
          applySetting() {
            setCSSVariable('alternative-clock-color', this.value)
          }
        },
        progressBackground: {
          ...new Setting(config.colors.alternative.progressBackground),
          applySetting() {
            setCSSVariable('alternative-progress-background-color', this.value)
          }
        },
        progressFilled: {
          ...new Setting(config.colors.alternative.progressFilled),
          applySetting() {
            setCSSVariable('alternative-progress-filled-color', this.value)
          }
        },
        progressTip: {
          ...new Setting(config.colors.alternative.progressTip),
          applySetting() {
            setCSSVariable('alternative-progress-tip-color', this.value)
          }
        }
      }
    }

    this.appearance = {
      showProgressBar: {
        ...new Setting(config.appearance.showProgressBar),
        applySetting() {
          if (this.value == false)
            (
              document.querySelector('.progress-container') as HTMLDivElement
            ).style.setProperty('display', 'none')
          else
            (
              document.querySelector('.progress-container') as HTMLDivElement
            ).style.setProperty('display', 'initial')
        }
      },
      showProgressBarTip: {
        ...new Setting(config.appearance.showProgressBarTip),
        applySetting() {
          if (this.value == false)
            (
              document.querySelector('.progress-filled') as HTMLDivElement
            ).style.setProperty('border-right-style', 'none')
          else
            (
              document.querySelector('.progress-filled') as HTMLDivElement
            ).style.setProperty('border-right-style', 'solid')
        }
      },
      displayOffsetedTime: {
        ...new Setting(config.appearance.displayOffsetedTime),
        applySetting() {
          window.app.iterate()
        }
      }
    }
  }
}

export default Settings
