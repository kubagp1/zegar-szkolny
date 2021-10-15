<template>
  <v-app id="app">
    <v-system-bar window app>
      <v-icon>mdi-cog-outline</v-icon>
      <span>Preferences</span>

      <v-spacer></v-spacer>

      <v-hover v-slot="{ hover }">
        <v-icon :color="hover ? 'black' : undefined" style="cursor: pointer"
          >mdi-minus</v-icon
        >
      </v-hover>

      <v-hover v-slot="{ hover }">
        <v-icon :color="hover ? 'black' : undefined" style="cursor: pointer"
          >mdi-checkbox-blank-outline</v-icon
        >
      </v-hover>

      <v-hover v-slot="{ hover }">
        <v-icon :color="hover ? 'black' : undefined" style="cursor: pointer"
          >mdi-close</v-icon
        >
      </v-hover>
    </v-system-bar>

    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Clock&amp;balls
          </v-list-item-title>
          <v-list-item-subtitle> Preferences </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group :value="selectedCategory">
          <v-list-item
            v-for="category in categories"
            :key="category.component"
            @click="selectedCategory = category.component"
            :value="category.component"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ category.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ category.name }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-expand-transition
          v-for="category in categories"
          :key="category.component"
        >
          <component
            :is="category.component"
            v-show="selectedCategory == category.component"
          />
        </v-expand-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import GeneralCategory from './categories/General.vue'
import ColorsCategory from './categories/Colors.vue'
import AppearanceCategory from './categories/Appearance.vue'

export default Vue.extend({
  components: { GeneralCategory, ColorsCategory, AppearanceCategory },
  data: () => ({
    categories: [
      {
        name: 'General',
        icon: 'mdi-cog-outline',
        component: 'generalCategory'
      },
      {
        name: 'Colors',
        icon: 'mdi-palette',
        component: 'colorsCategory'
      },
      {
        name: 'Appearance',
        icon: 'mdi-view-dashboard-outline',
        component: 'appearanceCategory'
      }
    ],
    selectedCategory: 'generalCategory'
  })
})
</script>

<style>
body {
  max-width: 850px;
  max-height: 500px;
  text-align: justify;
}
</style>
