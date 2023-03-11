<script setup lang="ts">
import { ref} from 'vue'

let activeBtn = ref(1)

let setActiveBtn = (value: number) => {
  activeBtn.value = value
}

</script>

<template>
  <div class="promodoro-nav flex">
    <div class="nav-item" id="promodoro"
         @click="setActiveBtn(1)"
         :class="{'active': activeBtn === 1}"
    >
      <span>promodoro</span>
    </div>
    <div class="nav-item" id="short-break"
         @click="setActiveBtn(2)"
         :class="{'active': activeBtn === 2}"
    >
      <span>short break</span>
    </div>
    <div class="nav-item" id="long-break"
         @click="setActiveBtn(3)"
         :class="{'active': activeBtn === 3}"
    >
      <span>long break</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.promodoro-nav {
  gap: 2rem;

  .nav-item {
    width: 158px;
    height: 43px;
    display: table;

    border-radius: 27px;
    border: 2px solid #FFF;
    text-align: center;
    user-select: none;
    cursor: pointer;

    transition: 0.1s ease-in-out;

    &.active, &:hover {
      background: #FFFFFF;
      color: #000;
    }

    span {
      display: table-cell;
      vertical-align: middle;
      font-family: 'Rubik', sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
    }
  }
}
</style>