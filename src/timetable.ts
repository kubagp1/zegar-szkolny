interface LessonPart {
  start: number
  end: number
}

export interface Lesson {
  relativeStart: number
  relativeEnd: number
  absoluteStart: number
  absoluteEnd: number
}

export const DEFAULT_TIMETABLE = [
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
  { start: 61200, end: 61100 },
  { start: 64200, end: 63900 }
]

function convertTimetableToRelative(timetable: LessonPart[]): LessonPart[] {
  const firstLessonStart = timetable[0].start

  var relativeTimetable: LessonPart[] = []
  for (const lesson of timetable) {
    var relativeStart: number
    if (lesson.start >= firstLessonStart) {
      relativeStart = lesson.start - firstLessonStart
    } else {
      relativeStart = lesson.start + (86400 - firstLessonStart)
    }

    var relativeEnd: number
    if (lesson.end >= firstLessonStart) {
      relativeEnd = lesson.end - firstLessonStart
    } else {
      relativeEnd = lesson.end + (86400 - firstLessonStart)
    }

    relativeTimetable.push({
      start: relativeStart,
      end: relativeEnd
    })
  }

  return relativeTimetable
}

/** Validates absolute timetable and returns full timetable. */
export function makeTimetable(unvalidatedTimetable: any[]): Lesson[] {
  var validatedTimetable: LessonPart[] = []

  // validate that every time is possible (0:00 > x > 24:00)
  for (const lesson of unvalidatedTimetable) {
    if (
      typeof lesson?.start == 'number' &&
      lesson.start <= 86400 &&
      lesson.start >= 0 &&
      typeof lesson?.end == 'number' &&
      lesson.end <= 86400 &&
      lesson.end >= 0
    ) {
      validatedTimetable.push({
        start: lesson.start,
        end: lesson.end
      })
    } else {
      throw Error('The timetable has an incorrect entry.')
    }
  }

  const sortedTimetable = validatedTimetable.sort((a, b) => a.start - b.start)

  const relativeTimetable = convertTimetableToRelative(sortedTimetable)

  // validate, that there are no intersecting lessons
  for (let i = 1; i < relativeTimetable.length; i++) {
    if (relativeTimetable[i].start < relativeTimetable[i - 1].end) {
      throw Error('Intersecting lessons are present in the timetable.')
    }
  }

  // validate, that every lesson starts before it ends
  for (const lesson of relativeTimetable) {
    if (lesson.start > lesson.end) {
      throw Error('Lesson in the timetable starts before it ends.')
    }
  }

  // combine and return relative and absolute
  return relativeTimetable.map((relativeLesson, i) => {
    return {
      relativeStart: relativeLesson.start,
      relativeEnd: relativeLesson.end,
      absoluteStart: sortedTimetable[i].start,
      absoluteEnd: sortedTimetable[i].end
    }
  })
}
