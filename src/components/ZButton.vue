<script lang="ts" setup>
interface Prop {
  buttonType?: "primary" | "warning" | "info" | "danger" | "strict";
  type?: "button";
}

const props = defineProps<Prop>();

const binder = {
  class: {
    "z-button": !props.buttonType,
    "z-button-primary": props.buttonType === "primary",
    "z-button-warning": props.buttonType === "warning",
    "z-button-info": props.buttonType === "info",
    "z-button-danger": props.buttonType === "danger",
    "z-button-strict": props.buttonType === "strict",
  },
  role: "none",
  style: "max-width: 100%",
};
</script>

<template>
  <div v-bind="binder">
    <button :type="props.type">
      <slot></slot>
      <slot name="suffix"></slot>
    </button>
  </div>
</template>

<style lang="scss">
@mixin zbutton {
  display: flex;
  height: 29px;
  border: 1px solid transparent;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background-color: #00000000;
    position: absolute;
    top: 0;
    left: 0;
    transition: 200ms ease;
  }

  &:hover {
    &::after {
      background-color: #00000008;
    }
  }
}

@mixin button {
  padding-inline: 10px;
  border: none;
  background: transparent;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  column-gap: 9px;
  height: 100%;
  align-items: center;

  > i {
    font-size: calc(1em - 5px);
  }
}

.z-button {
  background: rgb(236, 236, 236);
  @include zbutton;

  > button {
    color: #444;
    @include button;
  }
}

.z-button-info {
  background: #0ea5e9;
  @include zbutton;

  > button {
    color: #fff;
    @include button;
  }
}

.z-button-primary {
  background: #22c55e;
  @include zbutton;

  > button {
    color: #fff;
    @include button;
  }
}

.z-button-warning {
  background: #f59e0b;
  @include zbutton;

  > button {
    color: #fff;
    @include button;
  }
}

.z-button-danger {
  background: #ef4444;
  @include zbutton;

  > button {
    color: #fff;
    @include button;
  }
}

.z-button-strict {
  background: #ffffff;
  @include zbutton;

  > button {
    color: #444;
    @include button;
  }
}
</style>
