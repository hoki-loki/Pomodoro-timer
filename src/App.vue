<script setup lang="ts">
import Promodoro from './components/Promodoro/Promodoro.vue'
</script>

<template>
  <div class="bg-wallpaper">
    <img src="/public/wallpapers/girl-among-sakura`s.jpg" alt="bg-wallpaper">
  </div>
    <div class="layout">
      <Promodoro/>
    </div>

</template>

<style scoped lang="scss">
.bg-wallpaper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  filter: brightness(60%)
}

.layout {
  --padding: 4.5rem;
  min-height: calc(100vh - (var(--padding) * 2));
  padding: var(--padding);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
