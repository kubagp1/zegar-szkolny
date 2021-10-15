<template>
  <div>
    <v-row no-gutters>
      <v-col class="pa-2"> </v-col>
      <v-col class="pa-2"> During lesson </v-col>
      <v-col class="pa-2"> On break </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pa-2"> Clock </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.default.clock" />
      </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.alternative.clock" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pa-2"> Background </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.default.background" />
      </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.alternative.background" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pa-2"> Progress background </v-col>
      <v-col class="pa-2">
        <color-selector
          :setting="$settings.colors.default.progressBackground"
        />
      </v-col>
      <v-col class="pa-2">
        <color-selector
          :setting="$settings.colors.alternative.progressBackground"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pa-2"> Progress filled </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.default.progressFilled" />
      </v-col>
      <v-col class="pa-2">
        <color-selector
          :setting="$settings.colors.alternative.progressFilled"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pa-2"> Progress tip </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.default.progressTip" />
      </v-col>
      <v-col class="pa-2">
        <color-selector :setting="$settings.colors.alternative.progressTip" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ColorSelector from '../components/ColorSelector.vue'

export default Vue.extend({
  name: 'colorsCategory',
  components: {
    ColorSelector
  }
})
</script>

<style lang="less" scoped></style>
