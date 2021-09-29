import Timetable from '../timetable'

const HOURS_GRAMMAR: Grammar = {
  singular: 'godzina',
  plural: 'godziny',
  pluralGenitive: 'godzin'
}

const MINUTES_GRAMMAR: Grammar = {
  singular: 'minuta',
  plural: 'minuty',
  pluralGenitive: 'minut'
}

const SECONDS_GRAMMAR: Grammar = {
  singular: 'sekunda',
  plural: 'sekundy',
  pluralGenitive: 'sekund'
}

const END_GRAMMAR: Grammar = {
  singular: 'a',
  plural: 'y',
  pluralGenitive: 'o'
}

interface Grammar {
  singular: string
  plural: string
  pluralGenitive: string
}

function grammar(n: number, grammar: Grammar): string {
  n = Math.abs(n)
  if (n == 1) return grammar.singular
  if (n % 10 > 4 || n % 10 < 2 || (n % 100 < 15 && n % 100 > 11))
    return grammar.pluralGenitive
  return grammar.plural
}

export default class Info {
  constructor(private timetable: Timetable) {}

  private humanizeTime(time: number): string {
    const hours = parseInt(new Date(time * 1000).toISOString().substr(11, 2))
    const minutes = parseInt(new Date(time * 1000).toISOString().substr(14, 2))
    const seconds = parseInt(new Date(time * 1000).toISOString().substr(17, 2))

    if (hours > 0 && minutes > 0)
      return `${grammar(hours, END_GRAMMAR)} ${hours} ${grammar(
        hours,
        HOURS_GRAMMAR
      )} i ${minutes} ${grammar(minutes, MINUTES_GRAMMAR)}`
    else if (hours > 0 && seconds > 0)
      return `${grammar(hours, END_GRAMMAR)} ${hours} ${grammar(
        hours,
        HOURS_GRAMMAR
      )} i ${seconds} ${grammar(seconds, SECONDS_GRAMMAR)}`
    else if (hours > 0)
      return `${grammar(hours, END_GRAMMAR)} ${hours} ${grammar(
        hours,
        HOURS_GRAMMAR
      )}`
    else if (minutes > 0 && seconds > 0)
      return `${grammar(minutes, END_GRAMMAR)} ${minutes} ${grammar(
        minutes,
        MINUTES_GRAMMAR
      )} i ${seconds} ${grammar(seconds, SECONDS_GRAMMAR)}`
    else if (minutes > 0)
      return `${grammar(minutes, END_GRAMMAR)} ${minutes} ${grammar(
        minutes,
        MINUTES_GRAMMAR
      )}`
    else
      return `${grammar(seconds, END_GRAMMAR)} ${seconds} ${grammar(
        seconds,
        SECONDS_GRAMMAR
      )}`
  }

  private generateSinceLessonStart(time: number) {
    return `Od początku lekcji minęł${this.humanizeTime(
      this.timetable.secondsSinceLessonStart(time)
    )}`
  }

  private generateToEndOfLesson(time: number) {
    return `Do końca lekcji pozostał${this.humanizeTime(
      this.timetable.secondsToEndOfLesson(time)
    )}`
  }

  private generateToNextLessonStart(time: number) {
    return `Do końca przerwy pozostał${this.humanizeTime(
      this.timetable.secondsToNextLessonStart(time)
    )}`
  }

  public generate(time: number): string {
    if (this.timetable.onLesson(time)) {
      if (this.timetable.getProgress(time) < 1 / 3) {
        return this.generateSinceLessonStart(time)
      } else {
        return this.generateToEndOfLesson(time)
      }
    } else {
      return this.generateToNextLessonStart(time)
    }
  }
}
