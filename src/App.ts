import Timetable from './timetable'

interface App {
  dom: {
    clock: HTMLDivElement
    progressInfo: HTMLDivElement
    progressBar: HTMLDivElement
  }
  timetable: Timetable
  loopInterval: NodeJS.Timer
  timeOffset: number
}

class App {
  constructor() {
    this.dom = {
      clock: document.querySelector('.clock') as HTMLDivElement,
      progressInfo: document.querySelector('.progress-info') as HTMLDivElement,
      progressBar: document.querySelector('.progress-filled') as HTMLDivElement
    }

    this.timetable = new Timetable()

    this.loopInterval = setInterval(this.loop.bind(this), 1000)

    this.timeOffset = 0
  }

  private _debugSetTime(time: string) {
    var [hours, minutes]: any[] = time.split(':')
    hours = parseInt(hours)
    minutes = parseInt(minutes)

    const targetTime = hours * 60 * 60 + minutes * 60

    this.timeOffset = targetTime - ((Date.now() / 1000) % 86400)
  }

  private getTime(): number {
    return ((Date.now() / 1000) % 86400) + this.timeOffset
  }

  private loop() {
    /* @ts-ignore */
    if (this._debugFastForward) {
      /* @ts-ignore */
      this.timeOffset += this._debugFastForward
    }
  }
}

export default App
