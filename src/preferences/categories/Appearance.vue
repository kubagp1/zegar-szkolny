<template>
  <section>
    <switch-setting
      :setting="$settings.appearance.showProgressBar"
    ></switch-setting>
    <switch-setting
      :setting="$settings.appearance.showProgressBarTip"
    ></switch-setting>
    <switch-setting
      :setting="$settings.appearance.displayOffsetedTime"
    ></switch-setting>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import SwitchSetting from '../components/Switch.vue'

export default Vue.extend({
  name: 'appearanceCategory',
  components: {
    SwitchSetting
  }
})
</script>

<style lang="less" scoped></style>
