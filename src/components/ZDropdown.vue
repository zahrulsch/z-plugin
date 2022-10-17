<script setup lang="ts">
import ZButton from "./ZButton.vue";
</script>

<template>
  <div class="z-dropdown">
    <div class="z-dropdown-trigger" role="none">
      <slot name="trigger">
        <z-button button-type="strict"
          >Choose
          <template #suffix>
            <i class="bi bi-chevron-down indicator"></i>
          </template>
        </z-button>
      </slot>
    </div>
    <div class="z-dropdown-content">
      <div class="z-dropdown-content-container">
        <div class="z-dropdown-main">
          <div v-for="i in 10">Saya Content ke {{ i }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.z-dropdown {
  height: 29px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;

  &:hover {
    .z-dropdown-content-container {
      max-height: 600px !important;
      opacity: 1 !important;
    }
    .indicator {
      transform: rotate(180deg);
    }
  }
  .indicator {
    transition: 200ms ease;
  }

  .z-dropdown-content {
    max-height: 0;
    position: relative;

    .z-dropdown-content-container {
      position: absolute;
      top: 0;
      left: 0;
      width: max-content;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: 200ms ease;
      z-index: 1;
      box-shadow: 0 0 12px 0 rgb(221, 221, 221);
      margin-top: 5px;
      border-radius: 4px;

      .z-dropdown-main {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        row-gap: 7px;
        width: 100%;
        background-color: rgb(255, 255, 255);
        padding: 10px;
        color: #444;

        // test
        div {
          white-space: nowrap;
          padding: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
