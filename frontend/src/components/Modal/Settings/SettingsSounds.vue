<script setup lang="ts">
import { onMounted, reactive, ref, watch} from "vue";
import usePromodoro from "../../../stores/promodoro";

const storePromodoro = usePromodoro()
const { promodoro} = usePromodoro()
let alerts = ref(<any>[]);

let soundsSetting = reactive({
  alertSound: promodoro.alertSound,
  alertVolume:  promodoro.alertVolume,
  playSound: promodoro.playSound
})

const importSounds = async () => {
  let imagesPath = await import.meta.glob('../../../../public/alerts/*.*')
  let file = Object.keys(imagesPath).map((path: any) => {
    return path.match(/\/([^/]+)$/)[1]
        .split(/(?=[A-Z])/).join(' ')
  })

  alerts.value = file.map(file => file.split(/\.(?=[^/.]+$)/)[0])
}

onMounted(() => {
  importSounds()
})

watch(soundsSetting, (value) => {
  storePromodoro.setPromodoro(Object.assign(promodoro, value))
})
</script>

<template>
  <div class="container">
    <div class="d-s mb-4">
      <label class="w-full flex flex-col form-label">
        Select alert sound:
        <select id="alertSound" class="form-select" v-model="soundsSetting.alertSound">
          <div class="icon">
            <svg viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h50v50H0z"></path>
              <path d="m47.25 15-2.086-2.086L25 33.078 4.836 12.914 2.75 15 25 37.25z" fill="#d9d9d9"
                    class="fill-000000"></path></svg>
          </div>
          <option v-for="alert of alerts" :key="alert.id">
            {{ alert }}
          </option>
        </select>
      </label>
    </div>
    <div class="form-check mb-4">
      <label>
        <input class="form-check-input" v-model="soundsSetting.playSound" type="checkbox" id="playTimerSound">
        Play sound when timer finishes
      </label>
    </div>
    <div class="mb-4">
      <label class="form-label alert-volume">
        Alert volume:
        <input type="range" v-model="soundsSetting.alertVolume" class="form-volume form-range" id="alertSoundVolume" min="0" max="100" step="1">
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert-volume {
  display: flex;
  flex-direction: column;
}

.icon {
  height: 20px;
  width: 20px;
}

</style>