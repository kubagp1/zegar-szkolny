import Timetable from './timetable'
import DOM from './dom'
import { DOMUpdate } from './dom'
import Info from './info'

interface App {
  timetable: Timetable
  dom: DOM
  info: Info
  loopInterval: NodeJS.Timer
  timeOffset: number
}

function secondsSinceMidnight(): number {
  return (<any>new Date() - <any>new Date().setHours(0, 0, 0, 0)) / 1000
}

class App {
  constructor() {
    this.timetable = new Timetable()
    this.dom = new DOM()
    this.info = new Info(this.timetable)

    this.loopInterval = setInterval(this.loop.bind(this), 1000)

    this.timeOffset = 0
  }

  private _debugSetTime(time: string) {
    var [hours, minutes]: any[] = time.split(':')
    hours = parseInt(hours)
    minutes = parseInt(minutes)

    const targetTime = hours * 60 * 60 + minutes * 60

    this.timeOffset = targetTime - secondsSinceMidnight()
  }

  private getTime(): number {
    return (secondsSinceMidnight() + this.timeOffset) % 86400
  }

  private loop() {
    /* @ts-ignore */
    if (this._debugFastForward) {
      /* @ts-ignore */
      this.timeOffset += this._debugFastForward
    }

    const time = this.getTime()

    var DOMUpdate: DOMUpdate = {}

    DOMUpdate.hours = Math.floor(time / 3600)
    DOMUpdate.minutes = Math.floor((time / 60) % 60)
      .toString()
      .padStart(2, '0')

    DOMUpdate.progress = this.timetable.getProgress(time)

    DOMUpdate.info = this.info.generate(time)

    this.dom.update(DOMUpdate)
  }
}

export default App
