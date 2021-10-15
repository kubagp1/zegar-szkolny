import Setting from './Setting'

export default interface Settings {
  showLogoOnStartup: Setting<boolean>
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
  }
}

export interface Parent {
  setValue(path: string, newValue: any): Promise<void>
  getValue(path: string): Promise<any>
}

export function makeSettings(parent: Parent): Settings {
  return {
    showLogoOnStartup: {
      setValue: (newValue: boolean) =>
        parent.setValue('showLogoOnStartup', newValue),
      getValue: async () => await parent.getValue('showLogoOnStartup'),
      title: 'Show logo on startup'
    },
    colors: {
      default: {
        clock: {
          setValue: (newValue: string) =>
            parent.setValue('colors.default.clock', newValue),
          getValue: () => parent.getValue('colors.default.clock')
        },
        background: {
          setValue: (newValue: string) =>
            parent.setValue('colors.default.background', newValue),
          getValue: () => parent.getValue('colors.default.background')
        },
        progressBackground: {
          setValue: (newValue: string) =>
            parent.setValue('colors.default.progressBackground', newValue),
          getValue: () => parent.getValue('colors.default.progressBackground')
        },
        progressFilled: {
          setValue: (newValue: string) =>
            parent.setValue('colors.default.progressFilled', newValue),
          getValue: () => parent.getValue('colors.default.progressFilled')
        },
        progressTip: {
          setValue: (newValue: string) =>
            parent.setValue('colors.default.progressTip', newValue),
          getValue: () => parent.getValue('colors.default.progressTip')
        }
      },
      alternative: {
        clock: {
          setValue: (newValue: string) =>
            parent.setValue('colors.alternative.clock', newValue),
          getValue: () => parent.getValue('colors.alternative.clock')
        },
        background: {
          setValue: (newValue: string) =>
            parent.setValue('colors.alternative.background', newValue),
          getValue: () => parent.getValue('colors.alternative.background')
        },
        progressBackground: {
          setValue: (newValue: string) =>
            parent.setValue('colors.alternative.progressBackground', newValue),
          getValue: () =>
            parent.getValue('colors.alternative.progressBackground')
        },
        progressFilled: {
          setValue: (newValue: string) =>
            parent.setValue('colors.alternative.progressFilled', newValue),
          getValue: () => parent.getValue('colors.alternative.progressFilled')
        },
        progressTip: {
          setValue: (newValue: string) =>
            parent.setValue('colors.alternative.progressTip', newValue),
          getValue: () => parent.getValue('colors.alternative.progressTip')
        }
      }
    },
    appearance: {
      showProgressBar: {
        setValue: (newValue: boolean) =>
          parent.setValue('appearance.showProgressBar', newValue),
        getValue: () => parent.getValue('appearance.showProgressBar')
      },
      showProgressBarTip: {
        setValue: (newValue: boolean) =>
          parent.setValue('appearance.showProgressBarTip', newValue),
        getValue: () => parent.getValue('appearance.showProgressBarTip')
      }
    }
  }
}
