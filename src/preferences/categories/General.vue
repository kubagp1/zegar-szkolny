<template>
  <div>
    <v-list>
      <switch-setting :setting="$settings.showLogoOnStartup">
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import SwitchSetting from '../components/Switch.vue'

export default Vue.extend({
  name: 'generalCategory',
  components: {SwitchSetting}
})
</script>

<style lang="less" scoped></style>
