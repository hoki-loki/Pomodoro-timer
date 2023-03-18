<script setup lang="ts">
import {reactive, watch} from "vue";

let player = reactive({
  playing: false,
  position: 0,
  time: '00:00',
  duration: 1433.01491,
  counter: false,
  current_duration: 0,
  interval: null,
})

const finish = new Date(player.duration * 100).toISOString().substr(14, 5)

const runTimer = () => {
  player.position++

  if (player.time === finish) {
    //@ts-ignore
    clearInterval(player.interval)

    player.position = 0
    player.counter = false
    player.playing = false
  }
}
const startTimer = () => {
  if (!player.counter) {
    player.counter = true;
    // @ts-ignore
    player.interval = setInterval(() => runTimer(), 1000);

  } else {
    //@ts-ignore
    clearInterval(player.interval);
    player.counter = false;
  }
}

watch(player, async (update) => {
  player.time = new Date(update.position * player.duration).toISOString().substr(14, 5)
})

</script>

<template>
  <div class="spotify">
    <div class="wrapper">
      <div class="spotify-image">
        <img src="https://i.scdn.co/image/ab67706c0000da842a07ae7bf4baaed76ac0db21" alt="">
      </div>
      <div class="info">
        <div class="marquee">
          <div class="marquee__content">
            <span class="title">hoki-loki 💿 for study, chill, and more</span>
            <span class="title">hoki-loki 💿 for study, chill, and more</span>
          </div>
        </div>

        <div class="author">Your Eyes · Joey Pecoraro</div>

        <div class="player-container flex">
          <div class="player__controls">
            <div class="prev btn" style="transform: rotate(180deg)">
              <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4ZM3 4.947c0-1.424 1.612-2.252 2.77-1.422l10.47 7.507a1.75 1.75 0 0 1-.075 2.895l-10.47 6.716C4.53 21.39 3 20.554 3 19.17V4.947Z"
                    fill="#c4c4c4" class="fill-212121"></path>
              </svg>
            </div>
            <div class="player__progress">
              <input type="range"
                     min="0"
                     max="100"
                     step="0.01"
                     v-model="player.position"
                     autocomplete="off"
                     aria-valuemin="0"
                     :aria-valuemax="player.duration"
                     :aria-valuenow="player.position"
                     :style="{'--value': player.position + '%' }"
              >

              <progress class="progress__buffer"
                        max="100"
                        aria-hidden="true"
                        role="progressbar"
                        value="0.0923603784090965"
              ></progress>

              <div class="player__tooltip" :style="{ 'left' : player.position + '%' }"> {{ player.time }}</div>
            </div>
            <div class="next btn">
              <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4ZM3 4.947c0-1.424 1.612-2.252 2.77-1.422l10.47 7.507a1.75 1.75 0 0 1-.075 2.895l-10.47 6.716C4.53 21.39 3 20.554 3 19.17V4.947Z"
                    fill="#c4c4c4" class="fill-212121"></path>
              </svg>
            </div>
          </div>
          <div class="time">{{ player.time }}</div>
        </div>
      </div>
      <div class="play" @click="player.playing = !player.playing; startTimer()">
        <svg v-if="!player.playing" viewBox="0 0 400 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M405.2 232.9 126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"
              fill="#f7f7f7" class="fill-000000"></path></svg>
        <svg v-else viewBox="0 0 14 30" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff" fill-rule="evenodd" class="fill-979797">
            <rect height="20" width="3" x="11"></rect>
            <rect height="20" rx="1.5" width="3"></rect>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.spotify {
  bottom: 3rem;
  left: 3rem;
  position: absolute;
  height: 90px;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    --background-color: #282828;
    background-color: var(--background-color);
  }

  .spotify-image {
    align-items: center;
    height: 100%;
    padding-left: 9px;
    display: flex;

    img {
      height: 65px;
      width: 65px;
      border-radius: 9px;
      overflow: hidden;
    }
  }

  .info {
    padding: 15px 9px;
    width: 200px;

    .author {
      font-size: 11px;
      color: #b3b3b3;
    }
  }

  .play {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 4px;
    background: radial-gradient(rebeccapurple, #572c8e);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      box-shadow: 0 0 4px 2px #8b5acb, 0 0 4px 2px #572c8e;
    }

    svg {
      height: 20px;
      width: 20px;
      display: flex;
      text-align: center;
      justify-content: center;

      g {
        transform: translateY(5px) !important;
      }
    }

  }
}

.marquee {
  height: 15px;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;

  &:before, &:after {
    position: absolute;
    top: 0;
    height: 15px;
    content: "";
    z-index: 1;
  }

  &:before {
    left: -5px;
    background: linear-gradient(100deg, rgb(40, 40, 40), rgba(40, 40, 40, 0));
    width: 15px;
  }

  &:after {
    right: -4px;
    background: linear-gradient(270deg, rgb(40, 40, 40), rgba(40, 40, 40, 0));
    width: 50px;
  }

  .marquee__content {
    width: 300%;
    display: flex;
    line-height: 15px;
    animation: marquee 10s linear infinite forwards;
    gap: 10px;

    &:hover {
      animation-play-state: paused;
    }

    .title {
      font-size: 13px;
    }
  }
}


.list-inline {
  display: flex;
  justify-content: space-around;
  width: 33.33%;
  /* reset list */
  list-style: none;
  padding: 0;
  margin: 0;
}

.player-container {
  gap: 1rem;
  align-items: center;
  margin-top: 10px;

  .time {
    font-size: 10px;
  }
}

.player__controls {
  width: 100px;
  position: relative;
  display: flex;

  .prev, .next {
    height: 25px;
    width: 40px;

    &:hover {
      svg, path {
        fill: #fff;
      }
    }
  }
}

.player__progress {
  left: calc(var(--plyr-range-thumb-height, 13px) * .5);
  margin-right: var(--plyr-range-thumb-height, 13px);
  position: relative;

  input {
    position: relative;
    z-index: 2;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: 0 0;
    border: 0;
    border-radius: calc(var(--plyr-range-thumb-height, 13px) * 2);
    color: var(--plyr-range-fill-background, var(--plyr-color-main, var(--plyr-color-main, #00b2ff)));
    display: block;
    height: calc(var(--plyr-range-thumb-active-shadow-width, 3px) * 2 + var(--plyr-range-thumb-height, 13px));
    margin: 0;
    min-width: 0;
    padding: 0;
    transition: box-shadow 0.3s ease;
    width: 100%;

    &::-webkit-slider-thumb {
      height: 10px;
      width: 10px;
      margin-top: 5px;
    }

    &:focus {
      &::-webkit-slider-thumb {
        box-shadow: 0 0 0 1px rgba(236, 236, 236, 0.7);
        height: 11px;
        width: 11px;
      }
    }
  }

  .progress__buffer {
    -webkit-appearance: none;
    background: red;
    width: 100%;
    overflow: hidden;
    border: 0;
    border-radius: 100px;
    height: var(--plyr-range-track-height, 5px);
    left: 0;
    margin-top: calc((var(--plyr-range-track-height, 5px) / 2) * -1);
    padding: 0;
    position: absolute;
    top: 50%;
  }

  .player__tooltip {
    max-width: 120px;
    overflow-wrap: break-word;
    background: hsla(0, 0%, 100%, .9);
    background: var(--plyr-tooltip-background, hsla(0, 0%, 100%, .9));
    border-radius: var(--plyr-tooltip-radius, 5px);
    bottom: 100%;
    box-shadow: var(--plyr-tooltip-shadow, 0 1px 2px rgba(0, 0, 0, .15));
    color: var(--plyr-tooltip-color, #4a5464);
    font-size: var(--plyr-font-size-small, 13px);
    font-weight: var(--plyr-font-weight-regular, 400);
    line-height: 1.3;
    margin-bottom: calc(var(--plyr-control-spacing, 10px) / 2 * 2);
    opacity: 0;
    padding: calc(var(--plyr-control-spacing, 10px) / 2) calc(var(--plyr-control-spacing, 10px) / 2 * 1.5);
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, 10px) scale(.8);
    transform-origin: 50% 100%;
    transition: transform .2s ease .1s, opacity .2s ease .1s;
    white-space: nowrap;
    z-index: 2;

    &:before {
      border-left: 4px solid transparent;
      border-left: var(--plyr-tooltip-arrow-size, 4px) solid transparent;
      border-right: 4px solid transparent;
      border-right: var(--plyr-tooltip-arrow-size, 4px) solid transparent;
      border-top: 4px solid hsla(0, 0%, 100%, .9);
      border-top: var(--plyr-tooltip-arrow-size, 4px) solid var(--plyr-tooltip-background, hsla(0, 0%, 100%, .9));
      bottom: calc(var(--plyr-tooltip-arrow-size, 4px) * -1);
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
      z-index: 2;
    }
  }
}
</style>