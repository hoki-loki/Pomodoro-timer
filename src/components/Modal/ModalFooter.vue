<script setup lang="ts">

</script>

<template>
  <div class="modal-footer">
    <button class="reset btn">Reset all</button>
    <button class="close btn">Close</button>
    <button class="save-changes btn">Save changes</button>
  </div>
</template>

<style scoped lang="scss">
.modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0);
  border-bottom-right-radius: calc(2rem - 1px);
  border-bottom-left-radius: calc(2rem - 1px);
  gap: 1rem;

  .close, .save-changes, .reset {
    display: inline-block;
    line-height: 1.25;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: rgba(0,0,0,0);
    padding: 0.40rem 1rem;
    font-size: 15px;
    border-radius: 0.35rem;
    transition: color 0.20s ease-in-out,background-color 0.18s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;


    &:not(.reset):hover {
      background: unset;
      color: rgba(255, 255, 255, 0.63);
    }
  }

  .reset {
    margin-right: auto !important;
    color: #dc3545;
    border: 1px solid #dc3545;

    &:hover {
      background: #e14040;
      color: #fff;
    }
  }

  .close {
    color: #fff;
    background-color: rgba(108, 117, 125, 0.39);
    border: 2px solid rgba(108, 117, 125, 0.22);
  }

  .save-changes {
    background: #ffffff;
    color: #000;
    border: 2px solid rgba(108, 117, 125, 0.22);
  }
}
</style>