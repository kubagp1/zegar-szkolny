<template>
  <div class="modal">
    <div class="preferences">preferencje</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Preferences'
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
    width: 600px;
    height: 400px;

    background: white;
  }
}
</style>
