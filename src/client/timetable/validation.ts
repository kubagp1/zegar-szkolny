import { Lesson, LessonPart } from '.'

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
export function constructTimetable(unvalidatedTimetable: any[]): Lesson[] {
  var validatedTimetable: LessonPart[] = []

  // validate, that every entry is possible (0:00 > x > 24:00)
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
      throw Error('Overlapping lessons are present in the timetable.')
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
