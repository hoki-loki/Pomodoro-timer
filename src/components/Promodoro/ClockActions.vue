<script setup lang="ts">
import {computed, ref} from 'vue'

let show = ref(true)
let btn_start = ref<HTMLButtonElement | null>(null)
let reload = ref<HTMLButtonElement | null>(null)


let changeState = computed(() => {
  if (btn_start.value) {
    return show.value ? 'start' : 'pause';
  }
})

let changeStateReload = () => {
  setTimeout(() => {
    if (reload.value)
      console.log('sdfd')
  }, 500)
}

</script>

<template>
  <div class="pomodoro-clock-actions flex gap-1r">
    <button class="button-start" ref="btn_start" @click="show = !show">{{ changeState }}</button>
    <button class="reload-timer" ref="reload" @click="changeStateReload" style="animation-name: none">
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
      </svg>
    </button>
  </div>
</template>


<style scoped lang="scss">
.pomodoro-clock-actions {
  .button-start {
    background: rgba(17, 17, 17, 0.67);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
    width: 130px;
    height: 40px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.16em;
    transition: 0.1s ease;

    &:hover {
      box-shadow: none;
      background: none;
      border: 2px solid var(--bs-white);
      color: var(--bs-white);
    }
  }

  .reload-timer {
    cursor: pointer;
    animation-duration: 1s;
  }
}
</style>