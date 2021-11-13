<template>
  <section>
    <switch-setting :setting="$settings.showLogoOnStartup"></switch-setting>
    <number-setting :setting="$settings.timeOffset"></number-setting>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import SwitchSetting from '../components/Switch.vue'
import NumberSetting from '../components/Number.vue'

export default Vue.extend({
  name: 'generalCategory',
  components: { SwitchSetting, NumberSetting }
})
</script>

<style lang="less" scoped></style>
