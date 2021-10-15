<template>
  <input type="color" class="color-input" v-model="value" />
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
}
</style>
