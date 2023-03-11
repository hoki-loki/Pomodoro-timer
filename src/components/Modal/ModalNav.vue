<script setup lang="ts">
import {ref} from "vue";

let activeBtn = ref(1)
let setActiveBtn = (value: number) => {
  activeBtn.value = value
}
</script>

<template>
  <div class="settings-nav">
    <div class="nav-element"
         @click="setActiveBtn(1)"
         :class="{'active': activeBtn === 1}"
    >
      <span>General</span>
    </div>
    <div class="nav-element"
         @click="setActiveBtn(2)"
         :class="{'active': activeBtn === 2}"
    >
      <span>Timers</span>
    </div>
    <div class="nav-element"
         @click="setActiveBtn(3)"
         :class="{'active': activeBtn === 3}"
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