<script setup lang="ts">
import ModalNav from './ModalNav.vue'
import ModalFooter from './ModalFooter.vue'
import ModalHeader from "./ModalHeader.vue";
import SettingsTimers from "./Settings/SettingsTimers.vue";
import SettingsGeneral from "./Settings/SettingsGeneral.vue";
import SettingsSounds from "./Settings/SettingsSounds.vue";
import useEventsBus from "../../helpers/bus";
import {onMounted, reactive, watch} from "vue";

const {recieve} = useEventsBus()

let activeSection = reactive({
  name: 'general'
})

const ActiveSection = (value: any) => {
  watch(value, (nameVal) => activeSection.name = nameVal.name)
}

onMounted(() => {
  recieve('activeSection', ActiveSection)
})
</script>

<template>
  <div class="settings-modal modal">
    <div class="modal-dialog">
      <ModalHeader/>
      <div class="modal-content flex w-full gap-2r">
        <ModalNav/>
        <div class="modal-body">
          <SettingsTimers :class="{'show' : activeSection.name === 'timers'}"/>
          <SettingsGeneral :class="{'show' : activeSection.name === 'general'} "/>
          <SettingsSounds :class="{'show' : activeSection.name === 'sounds'} "/>
        </div>
      </div>

      <ModalFooter/>
    </div>
  </div>
</template>


<style scoped lang="scss">
.modal {
  transition: 0.4s ease-in-out, opacity 0.6s ease-in-out;
  transform: translateY(-120%);
  opacity: 0;

  &.show {
    transform: translateY(0%);
    opacity: 1;
  }

  .modal-dialog {
    transition: transform .3s ease-out;
    pointer-events: auto;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);
    outline: 0;
    background: rgba(13, 13, 13, 0.98);
    box-shadow: 9px 6px 13px 10px rgba(2, 2, 2, 0.25);
    border-radius: 30px;
    padding: 1.8rem;

    @media (min-width: 576px) {
      max-width: 600px;
      margin: 3rem auto;
    }

    .modal-content {
      margin-bottom: 3rem;
      padding-right: 2rem;

      .modal-body {
        width: 100%;
        margin-right: 3rem;
      }
    }
  }
}


</style>