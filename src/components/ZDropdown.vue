<script setup lang="ts">
import { ref } from "vue";
import ZButton from "./ZButton.vue";

interface Prop {
  trigger?: "click" | "hover";
}

const props = defineProps<Prop>();

const active = ref(!1);

const onMouseEnter = () => {
  if (!props.trigger || props.trigger === "hover") {
    active.value = true;
  }
};

const onMouseLeave = () => {
  if (!props.trigger || props.trigger === "hover") {
    active.value = false;
  }
};

const onClick = () => {
  if (props.trigger === "click") {
    active.value = !active.value;
  }
};
</script>

<template>
  <div
    class="z-dropdown"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="z-dropdown-trigger" role="none">
      <slot name="trigger" :active="active">
        <z-button button-type="strict"
          >Choose
          <template #suffix>
            <i
              :style="active ? 'transform: rotate(180deg)' : ''"
              class="bi bi-chevron-down indicator"
            ></i>
          </template>
        </z-button>
      </slot>
    </div>
    <div class="z-dropdown-content">
      <div
        :style="{
          maxHeight: active ? '600px' : '0',
          opacity: active ? 1 : 0,
        }"
        class="z-dropdown-content-container"
      >
        <div class="z-dropdown-main">
          <slot name="content">
            <div class="z-dropdown-nocontent">Empty Content</div>
          </slot>
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
        .z-dropdown-nocontent {
          color: #999;
        }
      }
    }
  }
}
</style>
