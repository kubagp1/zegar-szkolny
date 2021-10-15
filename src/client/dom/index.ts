export interface DOMUpdate {
  hours?: string | number
  minutes?: string | number
  progress?: number
  info?: string
  theme?: 'default' | 'alternative'
}

export default class DOM {
  private dom: {
    clock: HTMLDivElement
    hours: HTMLSpanElement
    minutes: HTMLSpanElement
    progressInfo: HTMLDivElement
    progressBar: HTMLDivElement
  }

  constructor() {
    this.dom = {
      clock: document.querySelector('.clock') as HTMLDivElement,
      hours: document.querySelector('#hours') as HTMLSpanElement,
      minutes: document.querySelector('#minutes') as HTMLSpanElement,
      progressInfo: document.querySelector('.progress-info') as HTMLDivElement,
      progressBar: document.querySelector('.progress-filled') as HTMLDivElement
    }
  }

  public update(update: DOMUpdate): void {
    if (update.hours !== undefined) {
      this.dom.hours.innerText = update.hours.toString()
    }

    if (update.minutes !== undefined) {
      this.dom.minutes.innerText = update.minutes.toString()
    }

    if (update.progress !== undefined) {
      this.dom.progressBar.style.setProperty(
        '--width',
        `${(update.progress * 100).toString()}%`
      )
    }

    if (update.info !== undefined) {
      this.dom.progressInfo.innerText = update.info
    }

    if (update.theme !== undefined) {
      setCSSVariable('clock-color', `var(--${update.theme}-clock-color)`)
      setCSSVariable(
        'background-color',
        `var(--${update.theme}-background-color)`
      )
      setCSSVariable(
        'progress-background-color',
        `var(--${update.theme}-progress-background-color)`
      )
      setCSSVariable(
        'progress-filled-color',
        `var(--${update.theme}-progress-filled-color)`
      )
      setCSSVariable(
        'progress-tip-color',
        `var(--${update.theme}-progress-tip-color)`
      )
    }
  }
}

function setCSSVariable(key: string, value: string) {
  document.documentElement.style.setProperty(`--${key}`, value)
}
