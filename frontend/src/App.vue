<script setup lang="ts">
import useModal from "./stores/modal";
import Modal from "./components/Modal/Modal.vue";
import Promodoro from "./components/Promodoro/Promodoro.vue";
import {computed, watch, onMounted} from "vue";
import usePromodoro from "./stores/promodoro";
import {storeToRefs} from "pinia";

const storePromodoro = usePromodoro()
const {promodoro} =  usePromodoro()
const storeModal = useModal()


const { theme_image } = storeToRefs(storePromodoro);

watch(promodoro, (value) => {
  storePromodoro.setPromodoro(value)
})

onMounted(() => {
  storePromodoro.setPromodoro(promodoro)
})

</script>

<template>
  <div class="bg-wallpaper">
    <img  :src="/theme/ + theme_image"  alt="bg-wallpaper">
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
