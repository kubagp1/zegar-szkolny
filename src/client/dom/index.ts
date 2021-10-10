export interface DOMUpdate {
  hours?: string | number
  minutes?: string | number
  progress?: number
  info?: string
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
  }
}
