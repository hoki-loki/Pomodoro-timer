<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import useModal from "../../stores/modal";
import TimerClass from "../../helpers/timer";
import Spotify from "../Spotify/Spotify.vue";
import usePromodoro from "../../stores/promodoro";

const {defaultSettings} = usePromodoro()
const store = useModal()
const { promodoro }  = usePromodoro()

const _promodoro: any = computed(() => promodoro ? promodoro : defaultSettings)

let timer_options = reactive({
  timers: {
    long:  _promodoro.value.timers.long,
    promodoro: _promodoro.value.timers.promodoro,
    short:  _promodoro.value.timers.short
  },
  alertVolume: _promodoro.value.alertVolume,
  continueTimer: _promodoro.value.continueTimer,
  playSound: _promodoro.value.playSound,
  reload: false,
  activeTimer: 'promodoro',
  start: false
})
let timer = reactive({
  interval: null,
  counter: false,
  seconds: timer_options.timers?.promodoro,
})

//AUDIO
let audio = new Audio(`../../../../public/alerts/${_promodoro.value.alertSound}.mp3`)
audio.volume = _promodoro.value.alertVolume / 100

//TIMER
let Timer = new TimerClass({timer_options}, {timer}, {audio})

//FUNCTIONS
const changeStateStart = computed(() => timer_options.start ? 'pause' : 'start')
const spin = computed(() => timer_options.reload ? 'spin' : 'none')

onMounted(() => {
  Timer.TimeFormat(timer.seconds)

  watch(timer, (value) => {
    Timer.TimeFormat(value.seconds)
  }, {deep: true})
})
</script>

<template>
  <div class="promodoro-container">
    <div class="promodoro-nav flex">
      <div class="nav-item" id="promodoro"
           @click="Timer.setActiveBtn('promodoro')"
           :class="{'active': timer_options.activeTimer === 'promodoro'}"
      >
        <span>promodoro</span>
      </div>
      <div class="nav-item" id="short-break"
           @click="Timer.setActiveBtn('short')"
           :class="{'active': timer_options.activeTimer === 'short'}"
      >
        <span>short break</span>
      </div>
      <div class="nav-item" id="long-break"
           @click="Timer.setActiveBtn('long')"
           :class="{'active': timer_options.activeTimer === 'long'}"
      >
        <span>long break</span>
      </div>
    </div>
    <div class="promodoro-timer">{{ timer.time }}</div>
    <div class="pomodoro-clock-actions flex gap-1r">
      <button class="button-start icon"
              @click="timer_options.start = !timer_options.start; Timer.startTimer() ">
        {{ changeStateStart }}
      </button>
      <button class="button-reload icon" ref="reload" :style="{animationName: spin }" @click="Timer.Reload()">
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
        </svg>
      </button>
      <button class="button-settings icon" @click="store.setModal(true)">
        <svg viewBox="0 0 29 29" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M27.526 18.036 27 17.732c-.626-.361-1-1.009-1-1.732s.374-1.371
      1-1.732l.526-.304a2.999 2.999 0 0 0 1.098-4.098l-1-1.732a3.003 3.003 0 0 0-4.098-1.098L23 7.339a1.977 1.977 0 0 1-2 0 1.98 1.98 0 0 1-1-1.732V5c0-1.654-1.346-3-3-3h-2c-1.654
       0-3 1.346-3 3v.608a1.98 1.98 0 0 1-1 1.732 1.98 1.98 0 0 1-2 0l-.526-.304a3.005 3.005 0 0 0-4.099 1.098l-1 1.732a2.998 2.998 0 0 0 1.098 4.098l.527.304c.626.361 1 1.009 1
       1.732s-.374 1.371-1 1.732l-.526.304a2.998 2.998 0 0 0-1.098 4.098l1 1.732a3.004 3.004 0 0 0 4.098 1.098L9 24.661a1.977 1.977 0 0 1 2 0 1.98 1.98 0 0 1 1 1.732V27c0 1.654 1.346
        3 3 3h2c1.654 0 3-1.346 3-3v-.608c0-.723.374-1.37 1-1.732a1.98 1.98 0 0 1 2 0l.526.304a3.005 3.005 0 0 0 4.098-1.098l1-1.732a2.998 2.998 0 0 0-1.098-4.098zM16 21c-2.757 0-5-2.243-5-5s2.243-5
         5-5 5 2.243 5 5-2.243 5-5 5z" fill="#ffffff" class="fill-000000"></path>
      </svg>
      </button>
    </div>
  </div>
  <Spotify />
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

.pomodoro-clock-actions {
  align-items: center;
  user-select: none;

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

  .button-reload {
    cursor: pointer;
    animation-duration: 1s;
  }

  .button-settings {

  }
}

.promodoro-nav {
  gap: 2rem;

  .nav-item {
    width: 158px;
    height: 43px;
    display: table;

    border-radius: 27px;
    border: 2px solid #FFF;
    text-align: center;
    user-select: none;
    cursor: pointer;

    transition: 0.1s ease-in-out;

    &.active, &:hover {
      background: #FFFFFF;
      color: #000;
    }

    span {
      display: table-cell;
      vertical-align: middle;
      font-family: 'Rubik', sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
    }
  }
}
</style>