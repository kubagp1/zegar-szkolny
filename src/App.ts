import { makeTimetable, Lesson } from './timetable'

interface App {
  dom: {
    clock: HTMLDivElement
    progressInfo: HTMLDivElement
    progressBar: HTMLDivElement
  }
  timetable: Lesson[]
}

class App {
  constructor() {
    this.dom = {
      clock: document.querySelector('.clock') as HTMLDivElement,
      progressInfo: document.querySelector('.progress-info') as HTMLDivElement,
      progressBar: document.querySelector('.progress-filled') as HTMLDivElement
    }

    this.loadConfig()
  }

  loadConfig(): void {
    // var timetableJSON = localStorage.getItem('timetable')
    var timetableJSON = `[
      {"start": 25800, "end": 28500},
      {"start": 28800, "end": 31500},
      {"start": 32100, "end": 34800},
      {"start": 35400, "end": 38100},
      {"start": 39300, "end": 42000},
      {"start": 42600, "end": 45300},
      {"start": 45900, "end": 48600},
      {"start": 49200, "end": 51900},
      {"start": 52200, "end": 54900},
      {"start": 55200, "end": 57900},
      {"start": 58200, "end": 60900},
      {"start": 61200, "end": 61100},
      {"start": 64200, "end": 63900}
    ]`

    if (typeof timetableJSON == 'string') {
      try {
        const unvalidatedTimetable = JSON.parse(timetableJSON)

        if (!Array.isArray(unvalidatedTimetable)) {
          throw Error('Timetable from localStorage is not an array.')
        }

        const timetable = makeTimetable(unvalidatedTimetable)

        console.log(timetable)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default App
