<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <input
        type="color"
        class="color-input rounded-pill transition-swing"
        :class="{
          'elevation-4': !hover,
          'elevation-8': hover
        }"
        v-model="value"
      />
    </template>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue'

import Setting from '../Setting'

export default Vue.extend({
  props: {
    setting: {
      required: true,
      type: Object as PropType<Setting<string>>
    }
  },
  data: () => ({
    value: '#ffffff',
    firstFetch: true
  }),
  mounted() {
    this.setting.getValue().then((value) => {
      this.value = value
    })
  },
  watch: {
    value(newValue: string) {
      if (this.firstFetch) this.firstFetch = false
      else this.setting.setValue(newValue)
    }
  }
})
</script>

<style lang="less" scoped>
.color-input {
  width: 100%;
  height: 150%;
  border-radius: 18px;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    // border: 1px solid rgba(0, 0, 0, 0.12);
    border: none;
    border-radius: 18px;
  }
}
</style>
