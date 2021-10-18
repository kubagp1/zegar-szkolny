<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ setting.title }}</v-list-item-title>
      <v-list-item-subtitle
        style="white-space: initial"
        v-if="setting.subtitle"
        >{{ setting.subtitle }}</v-list-item-subtitle
      >
    </v-list-item-content>

    <v-list-item-action>
      <v-switch v-model="value" />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue'

import Setting from '../Setting'

export default Vue.extend({
  props: {
    setting: {
      required: true,
      type: Object as PropType<Setting<boolean>>
    }
  },
  data() {
    return {
      value: false,
      firstFetch: true
    }
  },
  mounted() {
    this.setting.getValue().then((value) => {
      this.value = value
    })
  },
  watch: {
    value(newValue: boolean) {
      if (this.firstFetch) this.firstFetch = false
      else this.setting.setValue(newValue)
    }
  }
})
</script>

<style lang="less" scoped></style>
