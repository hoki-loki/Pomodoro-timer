<script setup lang="ts">
import PromodoroNav from './PromodoroNav.vue'
import ClockActions from './ClockActions.vue'
import usePromodoro from "../../stores/promodoro";
import {onMounted, reactive, ref, watch} from "vue";
import useEventsBus from "../../helpers/bus";
import TimeClock from "../../helpers/timer";


const {emit} = useEventsBus()
const {promodoro} = usePromodoro();
let timer = ref(JSON.parse(localStorage.getItem('promodoro') as string).timers || '')
let time = reactive({
  value: '00:00:00'
})

const fancyTimeFormat = async () => {
  let t = await TimeClock.getCurrentTime()
  const h = Math.floor(t/ 3600).toString().padStart(2, '0'),
      m = Math.floor(t % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(t % 60).toString().padStart(2, '0');

  if (h === '00')
    time.value = m + ':' + s;
  else if (h === '00' && m === '00')
    time.value = s;
  else
    time.value = h + ':' + m + ':' + s;

}

watch(time, (val) => {
  console.log(val.value)
})

onMounted(() => {
  fancyTimeFormat();

  TimeClock.getCurrentTime()
  emit('timer', time.value)
});

</script>

<template>
  <div class="promodoro-container">
    <PromodoroNav/>
    <div class="promodoro-timer">{{ time.value }}</div>
    <ClockActions/>
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