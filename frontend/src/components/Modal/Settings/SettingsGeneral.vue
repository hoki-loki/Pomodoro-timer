<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import usePromodoro from "../../../stores/promodoro";

const storePromodoro = usePromodoro()
const { promodoro }  = usePromodoro()
let themes = ref(<any>[])

const _promodoro = computed(() => promodoro ? promodoro : storePromodoro.defaultSettings)

let generalSetting = reactive({
  theme: _promodoro.value.theme,
  showNotifications: _promodoro.value.showNotifications,
  showSpotify: _promodoro.value.showSpotify
})

const importTheme = async () => {
  let imagesPath = await import.meta.glob('../../../../public/theme/*.*')
  themes.value = Object.keys(imagesPath).map((path: any) =>
      path
          .match(/\/([^/]+)$/)[1]
          .split(/(?=[A-Z])/).join(' ')
          .split(/\.(?=[^/.]+$)/)[0]
  )
}

onMounted(() => {
  importTheme()
})

watch(generalSetting, (value) => {
  storePromodoro.setPromodoro(Object.assign(_promodoro.value, value))
})
</script>

<template>
  <div class="container">
    <div class="d-s mb-4">
      <label class="w-full flex flex-col form-label">
        Select theme:
        <select id="theme" class="form-select" v-model="generalSetting.theme">
          <div class="icon">
            <svg viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h50v50H0z"></path>
              <path d="m47.25 15-2.086-2.086L25 33.078 4.836 12.914 2.75 15 25 37.25z" fill="#d9d9d9"
                    class="fill-000000"></path></svg>
          </div>
          <option v-for="theme of themes" :key="theme.id">
            {{ theme }}
          </option>
        </select>
      </label>
    </div>
    <div class="form-check form-switch mb-4">
      <label class="flex">
        <input class="form-check-input" v-model="generalSetting.showNotifications" type="checkbox" id="playTimerSound">
        <span>Show browser notification when timer finishes (beta)</span>
      </label>
    </div>
    <div class="form-check form-switch mb-4">
      <label class="flex">
        <input class="form-check-input" v-model="generalSetting.showSpotify" type="checkbox" id="playTimerSound">
        Show Spotify playlist
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general-settings {
}
</style>