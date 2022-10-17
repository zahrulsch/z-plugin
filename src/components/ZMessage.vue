<script setup lang="ts">
import { inject } from "vue";

interface Prop {
  text?: string;
  type?: "success" | "error" | "info" | "warning";
  timestamp?: number;
}

const props = defineProps<Prop>();
const mod_msg_remove = inject<(i?: number) => void>("mod_msg_remove");

const onClose = () => {
  props.timestamp && mod_msg_remove && mod_msg_remove(props.timestamp);
};
</script>

<template>
  <div class="z-message-container">
    <i
      v-if="type"
      :class="{
        'z-icon-info bi bi-info-circle-fill': type === 'info',
        'z-icon-success bi bi-check-circle-fill': type === 'success',
        'z-icon-warning bi bi bi-exclamation-circle-fill': type === 'warning',
        'z-icon-error bi bi-exclamation-circle-fill': type === 'error',
      }"
    ></i>
    <p>{{ text }}</p>
    <i @click="onClose" class="bi bi-x"></i>
  </div>
</template>

<style lang="scss">
.z-message-container {
  padding: 8px 9px;
  box-shadow: 0 0 10px 0 rgb(211, 211, 211);
  border-radius: 2.6px;
  display: flex;
  column-gap: 7px;
  align-items: center;
  background-color: #fff;
  pointer-events: auto;
  z-index: 2000;

  .bi.bi-x {
    font-size: calc(1em - 1px);
    padding-top: 1px;
    cursor: pointer !important;
    color: #555;
    transition: 200ms ease;

    &:hover {
      color: rgb(0, 0, 0);
    }
  }

  .z-icon- {
    &info {
      color: #0ea5e9;
      font-size: calc(1em - 1.9px);
    }
    &success {
      color: #84cc16;
      font-size: calc(1em - 1.9px);
    }
    &warning {
      color: #f59e0b;
      font-size: calc(1em - 1.9px);
    }
    &error {
      color: #ef4444;
      font-size: calc(1em - 1.9px);
    }
  }

  p {
    margin: 0;
    color: #555;
    font-size: calc(1em - 1px);
  }
}
</style>
