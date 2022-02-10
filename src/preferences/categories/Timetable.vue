<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-btn color="primary" @click="addNew()">
            <v-icon>mdi-plus</v-icon>
            <span>Add new lesson</span>
          </v-btn>
        </v-list-item-content>
      </v-list-item>

      <v-divider style="margin: 20px 0"></v-divider>

      <v-list-item v-for="(lesson, index) in lessons" :key="index">
        <v-list-item-content>
          <div>
            <span>
              <span>From </span>
              <span class="bold">{{ toHumanTime(lesson.absoluteStart) }}</span>
              <span> to </span>
              <span class="bold">{{
                toHumanTime(lesson.absoluteEnd)
              }}</span></span
            >
          </div>
        </v-list-item-content>

        <v-list-item-action>
          <span>
            <v-btn icon small @click="edit(index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon small color="red" @click="remove(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-btn text color="red" @click="restoreDefaultTimetable()"
      >Restore default timetable</v-btn
    >

    <v-btn color="primary" fab small fixed bottom right @click="addNew()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title class="text-h5">
          <span v-if="editedLesson > -1">Edit lesson</span>
          <span v-else>Add new lesson</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <div>Start time</div>
              <v-row>
                <v-col
                  ><v-text-field
                    dense
                    outlined
                    hide-details
                    type="number"
                    v-model="buffer.startHours"
                    @focus="$event.target.select()"
                /></v-col>
                <span class="colon">:</span>
                <v-col
                  ><v-text-field
                    dense
                    outlined
                    hide-details
                    type="number"
                    v-model="buffer.startMinutes"
                    @focus="$event.target.select()"
                /></v-col>
              </v-row>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col>
              <div>End time</div>
              <v-row>
                <v-col
                  ><v-text-field
                    dense
                    outlined
                    hide-details
                    type="number"
                    v-model="buffer.endHours"
                    @focus="$event.target.select()"
                /></v-col>
                <span class="colon">:</span>
                <v-col
                  ><v-text-field
                    dense
                    outlined
                    hide-details
                    type="number"
                    v-model="buffer.endMinutes"
                    @focus="$event.target.select()"
                /></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
          <v-btn
            color="primary"
            @click="editedLesson > -1 ? modifyLesson() : appendLesson()"
          >
            {{ editedLesson > -1 ? 'Save' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
function toHumanTime(time: number): string {
  // @ts-ignore
  var date = new Date(null)
  date.setSeconds(time)
  return date.toISOString().substr(11, 5)
}

function getHours(seconds: number): number {
  return Math.floor(seconds / 3600)
}

function getMinutes(seconds: number): number {
  return Math.floor((seconds % 3600) / 60)
}

import Vue from 'vue'

export default Vue.extend({
  name: 'timetableCategory',
  components: {},
  data: () => {
    return {
      lessons: [
        { absoluteStart: 0, absoluteEnd: 0, relativeStart: 0, relativeEnd: 0 }
      ],
      dialog: false,
      editedLesson: -1,
      buffer: {
        startHours: 0,
        startMinutes: 0,
        endHours: 0,
        endMinutes: 0
      }
    }
  },
  computed: {},
  methods: {
    toHumanTime,
    getHours,
    getMinutes,
    addNew() {
      this.editedLesson = -1
      this.buffer = {
        startHours: 0,
        startMinutes: 0,
        endHours: 0,
        endMinutes: 0
      }
      this.dialog = true
    },
    edit(index: number) {
      this.editedLesson = index
      this.buffer = {
        startHours: getHours(this.lessons[index].absoluteStart),
        startMinutes: getMinutes(this.lessons[index].absoluteStart),
        endHours: getHours(this.lessons[index].absoluteEnd),
        endMinutes: getMinutes(this.lessons[index].absoluteEnd)
      }
      this.dialog = true
    },
    remove(index: number) {
      this.lessons.splice(index, 1)

      this.commitChanges()
    },
    appendLesson() {
      this.lessons.push({
        absoluteStart:
          this.buffer.startHours * 3600 + this.buffer.startMinutes * 60,
        absoluteEnd: this.buffer.endHours * 3600 + this.buffer.endMinutes * 60,
        relativeStart: 0,
        relativeEnd: 0
      })

      this.commitChanges()
    },
    modifyLesson() {
      this.lessons[this.editedLesson] = {
        absoluteStart:
          this.buffer.startHours * 3600 + this.buffer.startMinutes * 60,
        absoluteEnd: this.buffer.endHours * 3600 + this.buffer.endMinutes * 60,
        relativeStart: 0,
        relativeEnd: 0
      }

      this.commitChanges()
    },
    commitChanges() {
      //Sends new timetable to parent frame
      this.$top
        .setTimetable(
          this.lessons.map((lesson) => {
            return {
              start: lesson.absoluteStart,
              end: lesson.absoluteEnd
            }
          })
        )
        .then(async () => {
          this.lessons = await this.$top.getTimetable()
          this.dialog = false
        })
        .catch(async (err: Error) => {
          this.lessons = await this.$top.getTimetable() // restore old timetable
          alert(err.message)
        })
    },
    restoreDefaultTimetable() {
      this.$top.restoreDefaultTimetable().then(async () => {
        this.lessons = await this.$top.getTimetable()
      })
    }
  },
  async mounted() {
    this.lessons = await this.$top.getTimetable()
  }
})
</script>

<style lang="less" scoped>
.bold {
  font-weight: bold;
}

.colon {
  font-size: 2em;
  margin-top: 0.6em;
}
</style>
