import { constructTimetable } from './validation'

const DEFAULT_TIMETABLE = [
  { start: 25800, end: 28500 },
  { start: 28800, end: 31500 },
  { start: 32100, end: 34800 },
  { start: 35400, end: 38100 },
  { start: 39300, end: 42000 },
  { start: 42600, end: 45300 },
  { start: 45900, end: 48600 },
  { start: 49200, end: 51900 },
  { start: 52200, end: 54900 },
  { start: 55200, end: 57900 },
  { start: 58200, end: 60900 },
  { start: 61200, end: 63900 },
  { start: 64200, end: 66900 }
]

export interface LessonPart {
  start: number
  end: number
}

export interface Lesson {
  relativeStart: number
  relativeEnd: number
  absoluteStart: number
  absoluteEnd: number
}

interface Timetable {
  lessons: Lesson[]
}

class Timetable {
  constructor() {
    try {
      this.lessons = this.loadFromStorage()
    } catch (error) {
      console.error(error)

      this.lessons = constructTimetable(DEFAULT_TIMETABLE)
    }
  }

  private loadFromStorage(): Lesson[] {
    const timetableJSON = localStorage.getItem('timetable')

    if (typeof timetableJSON == 'string') {
      const unvalidatedTimetable = JSON.parse(timetableJSON)

      if (!Array.isArray(unvalidatedTimetable)) {
        throw Error('Timetable from localStorage is not an array.')
      }

      var lessons = constructTimetable(unvalidatedTimetable)
    } else throw Error('Failed to load timetable from localStorage.')

    return lessons
  }

  private getRelativeTime(seconds: number) {
    seconds = seconds % 86400

    const firstLesson = this.lessons[0]

    if (seconds < firstLesson.absoluteStart)
      return 86400 - firstLesson.absoluteStart + seconds
    else return seconds - firstLesson.absoluteStart
  }

  private getLatestLesson(seconds: number): Lesson {
    var latestLesson = this.lessons[this.lessons.length - 1] // Loop below depends on next lesson to detect latest lesson, so this is necessary.
    for (let i = 0; i < this.lessons.length; i++) {
      const testedLesson = this.lessons[i]

      if (seconds < testedLesson.relativeStart) {
        // Lessons are sorted from first to last.
        latestLesson = this.lessons[i - 1]
        break
      }
    }

    return latestLesson
  }

  private getNextLesson(seconds: number): Lesson {
    var nextLesson = this.lessons[0] // Midnight fix
    for (let i = 1; i < this.lessons.length; i++) {
      const testedLesson = this.lessons[i]

      if (seconds < testedLesson.relativeStart) {
        nextLesson = testedLesson
        break
      }
    }

    return nextLesson
  }

  public onBreak(absoluteSeconds: number): boolean {
    const seconds = this.getRelativeTime(absoluteSeconds)

    return seconds > this.getLatestLesson(seconds).relativeEnd
  }

  public onLesson(absoluteSeconds: number): boolean {
    return !this.onBreak(absoluteSeconds)
  }

  /** Returns number between 0..1 that indicated progress in current lesson or break */
  public getProgress(absoluteSeconds: number): number {
    const seconds = this.getRelativeTime(absoluteSeconds)

    const latestLesson = this.getLatestLesson(seconds)

    if (this.onBreak(absoluteSeconds)) {
      const nextLesson = this.getNextLesson(seconds)

      if (nextLesson.relativeStart != 0) {
        var breakLength = nextLesson.relativeStart - latestLesson.relativeEnd
      } else {
        // if the last relative break (end of school day)
        var breakLength = 86400 - latestLesson.relativeEnd
      }

      return (seconds - latestLesson.relativeEnd) / breakLength
    } else {
      const lessonLength = latestLesson.relativeEnd - latestLesson.relativeStart

      return (seconds - latestLesson.relativeStart) / lessonLength
    }
  }

  public secondsFromLessonBeggining(absoluteSeconds: number) {
    const seconds = this.getRelativeTime(absoluteSeconds)

    if (this.onBreak(absoluteSeconds)) {
      console.warn('secondsFromLessonBeggining used on break!')
    }

    const latestLesson = this.getLatestLesson(seconds)

    return seconds - latestLesson.relativeStart
  }

  public secondsToNextLesson(absoluteSeconds: number) {
    const seconds = this.getRelativeTime(absoluteSeconds)

    if (this.onLesson(absoluteSeconds)) {
      console.warn('secondsToNextLesson used on lesson!')
    }

    const nextLesson = this.getNextLesson(seconds)

    if (nextLesson.relativeStart != 0) {
      return nextLesson.relativeStart - seconds
    } else {
      // if the last relative break (end of school day)
      return nextLesson.relativeStart + (86400 - seconds)
    }
  }

  public secondsToEndOfLesson(absoluteSeconds: number) {
    const seconds = this.getRelativeTime(absoluteSeconds)

    if (this.onBreak(absoluteSeconds)) {
      console.warn('secondsToEndOfLesson used on break!')
    }

    const latestLesson = this.getLatestLesson(seconds)

    return latestLesson.relativeEnd - seconds
  }
}

export default Timetable
