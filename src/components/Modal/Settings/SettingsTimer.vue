<!--suppress TypeScriptValidateTypes, CssUnknownTarget -->
<script setup lang="ts">
import {onMounted, ref} from "vue";
let images = ref(<any>[]);

const importImages = async () => {
  let imagesPath = await import.meta.glob('../../../../public/wallpapers/*.*')
  images.value = Object.keys(imagesPath).map((path) =>
     path
        .match(/\/([^/]+)$/)[1]
        .split(/\.(?=[^/.]+$)/)[0]
        .split(/(?=[A-Z])/).join(' ')
  )
}

onMounted(() => {
  importImages()
})
</script>

<template>
  <div class="timer-settings">
    <div class="d-s mb-4">
      <label class="w-full flex flex-col form-label">
        Select alert sound:
        <select id="alertSound" class="form-select">
          <div class="icon">
            <svg viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h50v50H0z"></path>
              <path d="m47.25 15-2.086-2.086L25 33.078 4.836 12.914 2.75 15 25 37.25z" fill="#d9d9d9"
                    class="fill-000000"></path></svg>
          </div>
          <option v-for="image of images" :key="image.id">
            {{ image }}
          </option>
        </select>
      </label>
    </div>
    <div class="form-check form-switch mb-4">
      <label for="form-check-label">
        <input class="form-check-input" type="checkbox" id="playTimerSound">
        Play sound when timer finishes
      </label>
    </div>
    <div class="mb-4">
      <label class="form-label alert-volume">
        Alert volume:
        <input type="range" class="form-volume form-range" id="alertSoundVolume" min="0" max="100" step="1" value="100">
      </label>
    </div>
  </div>
</template>


<style scoped lang="scss">
.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  color: #f8f9fa;
  background-color: #000;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  appearance: none;
  position: relative;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27rgba%28255, 255, 255, 0.4%29%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e")
}

.alert-volume {
  display: flex;
  flex-direction: column;
}

.icon {
  height: 20px;
  width: 20px;
}

</style>