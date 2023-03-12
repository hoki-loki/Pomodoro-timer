<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import useEventsBus from "./../../helpers/bus";

const { emit } = useEventsBus()

let activeBtn = reactive({
  name: 'general'
})
let setActiveBtn = (value: any) => {
  activeBtn.name = value
}

onMounted(() => {
  emit('activeSection', activeBtn)

  watch(activeBtn, (nameVal) => {
    emit('activeSection', nameVal)
  })
})

</script>

<template>
  <div class="settings-nav">
    <div class="nav-element"
         @click="setActiveBtn('general')"
         :class="{'active': activeBtn.name === 'general'}"
    >
      <span>General</span>
    </div>
    <div class="nav-element"
         @click="setActiveBtn('timers')"
         :class="{'active': activeBtn.name === 'timers'}"
    >
      <span>Timers</span>
    </div>
    <div class="nav-element"
         @click="setActiveBtn('sounds')"
         :class="{'active': activeBtn.name === 'sounds'}"
    >
      <span>Sounds</span>
    </div>
  </div>
</template>


<style scoped lang="scss">
.settings-nav {
  gap: 1rem;
  display: flex;
  flex-direction: column;

  .nav-element {
    font-size: 15px;
    padding: 6px 40px 6px 10px;
    text-align: start;
    user-select: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.63);
    transition: 0.1s ease-in;

    &.active {
      border-radius: 6px;
      background: #7A49E799;
      color: #fff;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>