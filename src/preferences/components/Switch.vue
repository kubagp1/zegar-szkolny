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
      <v-switch :value="setting.getValue()" @change="setting.setValue" />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue'

import Setting from '../setting'

export default Vue.extend({
  props: {
    setting: {
      type: Object as PropType<Setting<boolean>>
    }
  }
})
</script>

<style lang="less" scoped></style>
