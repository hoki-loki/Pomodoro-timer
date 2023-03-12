<script setup lang="ts">
import useModal from "../../stores/modal";

const store = useModal()
</script>

<template>
  <div class="modal-header">
    <span class="cancel btn" @click="store.setModal(false )">
      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none"
           stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </span>
  </div>
</template>

<style scoped lang="scss">
.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  border-top-left-radius: calc(2rem - 1px);
  border-top-right-radius: calc(2rem - 1px);
}
</style>