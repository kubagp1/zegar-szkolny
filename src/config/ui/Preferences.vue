<template>
  <div class="modal">
    <div class="preferences">
      <v-app app>
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Clock&#38;balls
              </v-list-item-title>
              <v-list-item-subtitle> Preferences </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-app>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Preferences',
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      right: null
    }
  }
})
</script>

<style lang="less" scoped>
.modal {
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 1000;

  background-color: #00000088;

  display: flex;
  align-items: center;
  justify-content: center;

  .preferences {
    width: 800px;
    height: 500px;

    background: white;
  }
}
</style>
