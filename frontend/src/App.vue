<script setup lang="ts">
import useModal from "./stores/modal";
import usePromodoro from "./stores/promodoro";
import Modal from "./components/Modal/Modal.vue";
import Promodoro from "./components/Promodoro/Promodoro.vue";
import {onMounted, ref, watch} from "vue";

const storeModal = useModal()
const storePromodoro = usePromodoro()
const { defaultSettings } = usePromodoro()
let promodoro = ref(JSON.parse(localStorage.getItem('promodoro') as string).theme.split(' ').join('') + '.jpg')
const setDefaultSettings = () => !promodoro ? storePromodoro.setPromodoro(defaultSettings) : {}

onMounted(() => {
})

watch(promodoro, (value) => {
  promodoro.value = value
})
</script>

<template>
  <div class="bg-wallpaper">
    <img  :src="/theme/ + promodoro"  alt="bg-wallpaper">
  </div>
  <div class="layout">
    <Promodoro/>
    <Modal :class="{'show' : storeModal.isOpenModal}" />
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
