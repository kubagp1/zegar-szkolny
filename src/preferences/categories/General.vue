<template>
  <section>
    <switch-setting :setting="$settings.showLogoOnStartup"></switch-setting>
    <number-setting :setting="$settings.timeOffset"></number-setting>
    <v-btn text color="error" @click="restoreDefaultConfig()">
      Restore default settings
    </v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import SwitchSetting from '../components/Switch.vue'
import NumberSetting from '../components/Number.vue'

export default Vue.extend({
  name: 'generalCategory',
  components: { SwitchSetting, NumberSetting },
  methods: {
    restoreDefaultConfig() {
      // @ts-ignore
      this.$top.restoreDefaultConfig()
    }
  }
})
</script>

<style lang="less" scoped></style>
