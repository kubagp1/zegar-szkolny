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
    fullscreenButton: HTMLSpanElement
    preferencesButton: HTMLSpanElement
    preferencesContainer: HTMLDivElement
    iframe: HTMLIFrameElement
  }

  constructor() {
    this.dom = {
      clock: document.querySelector('.clock') as HTMLDivElement,
      hours: document.querySelector('#hours') as HTMLSpanElement,
      minutes: document.querySelector('#minutes') as HTMLSpanElement,
      progressInfo: document.querySelector('.progress-info') as HTMLDivElement,
      progressBar: document.querySelector('.progress-filled') as HTMLDivElement,
      fullscreenButton: document.querySelector(
        '#open-fullscreen'
      ) as HTMLSpanElement,
      preferencesButton: document.querySelector(
        '#open-preferences'
      ) as HTMLSpanElement,
      preferencesContainer: document.querySelector(
        '#preferences-container'
      ) as HTMLDivElement,
      iframe: document.querySelector('iframe#preferences') as HTMLIFrameElement
    }

    this.dom.fullscreenButton.addEventListener('click', () => {
      document.documentElement.requestFullscreen()
    })

    let resizeHandler = () => {
      if (window.innerHeight == screen.height) {
        document.documentElement.classList.add('fullscreen')
      } else {
        document.documentElement.classList.remove('fullscreen')
      }
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    this.dom.preferencesButton.addEventListener('click', () => {
      this.dom.preferencesContainer.classList.remove('d-none')
    })

    this.dom.preferencesContainer.addEventListener('click', (e) => {
      if (e.target == this.dom.preferencesContainer)
        this.dom.preferencesContainer.classList.add('d-none')
    })

    this.dom.iframe.addEventListener('load', () => {
      setTimeout(() => {
        this.dom.preferencesContainer.classList.add('d-none')
        this.dom.preferencesContainer.classList.remove('invisible')
      }, 200) // I have no idea why, but when you hide this immediately, it breaks topbar layout
    })
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
