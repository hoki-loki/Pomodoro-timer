<script setup lang="ts">
import {reactive} from "vue";
import useEventsBus from "../../../helpers/bus";

const {emit} = useEventsBus()

//toDo: fix get data from localstorage
const promodoro = JSON.parse(localStorage.getItem('promodoro') || '{}')

let TimersSetting = reactive({
  continueTimer: promodoro.continueTimer,
  timers: {
    long: promodoro.timers.long,
    promodoro: promodoro.timers.promodoro,
    short: promodoro.timers.short,
  }
})

emit('updateTimersSettings', TimersSetting)
</script>

<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col w-full">
        <label>
          Promodoro
          <input class="form-check-input form-control m-tb-2" v-model="TimersSetting.timers.promodoro" type="number"
                 step="1" min="1" max="90">
          <span>minutes</span>
        </label>
      </div>
      <div class="col w-full">
        <label>
          Short Break
          <input class="form-check-input form-control m-tb-2" v-model="TimersSetting.timers.short" type="number"
                 step="1" min="1" max="60">
          <span>minutes</span>
        </label>
      </div>
      <div class="col w-full">
        <label>
          Long Break
          <input class="form-check-input form-control m-tb-2" v-model="TimersSetting.timers.long" type="number" step="1"
                 min="1" max="90">
          <span>minutes</span>
        </label>
      </div>
    </div>
    <div class="form-check mb-4">
      <label class="flex">
        <input class="form-check-input" style="width: 4rem;" v-model="TimersSetting.continueTimer" type="checkbox">
        Use the Pomodoro sequence: Pomodoro → short break, repeat 4x, then one long break
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }

  .col label span {
    font-size: 0.999rem;
  }
}


label span {
  color: rgba(180, 179, 179, 0.89);
}

.form-control {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 5px;
  font-weight: 400;
  line-height: 1.25;
  color: #f8f9fa;
  background-color: #000;
  background-clip: padding-box;
  border: 1px solid rgba(206, 212, 218, 0.71);
  appearance: none;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px rgba(136, 134, 134, 0.63);
  }
}
</style>