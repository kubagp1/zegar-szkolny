import Timetable from './timetable'
import DOM from './dom'
import { DOMUpdate } from './dom'
import Info from './info'
import Config from './config'
import Autoupdater from './autoupdater'

interface App {
  timetable: Timetable
  dom: DOM
  info: Info
  config: Config
  autoupdater: Autoupdater
  loopInterval: number
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
    this.config = new Config()
    this.autoupdater = new Autoupdater()

    this.timeOffset = 0

    setTimeout(this.iterate.bind(this), 1)
    this.loopInterval = setInterval(this.loop.bind(this), 1000)
  }

  private _debugSetTime(time: string) {
    var [hours, minutes]: any[] = time.split(':')
    hours = parseInt(hours)
    minutes = parseInt(minutes)

    const targetTime = hours * 60 * 60 + minutes * 60

    this.timeOffset = targetTime - secondsSinceMidnight()
  }

  private getTime(): number {
    return (secondsSinceMidnight() + this.timeOffset / 1000) % 86400
  }

  /**
   *
   * @returns Time not affected by timeOffset config.
   */
  private getRealTime(): number {
    return secondsSinceMidnight()
  }

  private loop(): void {
    /* @ts-ignore */
    if (this._debugFastForward) {
      /* @ts-ignore */
      this.timeOffset += this._debugFastForward
    }

    const time = this.getTime()

    var DOMUpdate: DOMUpdate = {}

    console.log(this)

    const displayedTime = this.config.settings.appearance.displayOffsetedTime
      .value
      ? time
      : this.getRealTime()

    DOMUpdate.hours = Math.floor(displayedTime / 3600)
    DOMUpdate.minutes = Math.floor((displayedTime / 60) % 60)
      .toString()
      .padStart(2, '0')

    DOMUpdate.progress = this.timetable.getProgress(time)

    DOMUpdate.info = this.info.generate(time)

    DOMUpdate.theme = this.timetable.onBreak(time) ? 'alternative' : 'default'

    this.dom.update(DOMUpdate)
  }

  /**
   * Reruns main loop (mostly to apply updates to config)
   */
  public iterate(): void {
    this.loop()
  }
}

export default App
