<script setup lang="ts">
import Nav from './Nav.vue'
import ClockActions from './ClockActions.vue'

</script>

<template>
  <div class="promodoro-container">
   <Nav />
    <div class="promodoro-timer">1:33:55</div>
    <ClockActions />
  </div>
</template>


<style scoped lang="scss">
.promodoro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .promodoro-timer {
    font-size: 8rem;
    letter-spacing: 0.70rem;
    font-variant-numeric: tabular-nums;
  }
}
</style>