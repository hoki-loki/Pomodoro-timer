<template>
  <div class="promodoro-nav flex">
    <div class="nav-item" id="promodoro">
      <span>promodoro</span>
    </div>
    <div class="nav-item" id="short-break">
      <span>short break</span>
    </div>
    <div class="nav-item" id="long-break">
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

    span {
      display: table-cell;
      vertical-align: middle;
      font-family: 'Rubik', sans-serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
    }

    &.checked, &:hover {
      background: #FFFFFF;
      color: #000;
    }
  }
}
</style>