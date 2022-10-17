<script setup lang="ts">
interface Prop {
  placeholder?: string;
}
const props = defineProps<Prop>();
</script>

<template>
  <div class="z-input">
    <input
      :placeholder="props.placeholder ? props.placeholder : 'Please Input'"
      :title="props.placeholder ? props.placeholder : 'Please Input'"
      class="z-input-field"
      type="text"
    />
    <i v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </i>
  </div>
</template>

<style lang="scss">
.z-input {
  display: flex;
  box-shadow: none;
  column-gap: 5px;
  border: 1px solid rgb(209, 209, 209);
  border-radius: 4px;
  padding-inline: 10px;
  padding-block: 1px;
  outline: none;
  outline: 2px rgba(138, 231, 236, 0);
  outline-offset: 0px;
  outline-style: solid;
  transition: outline-color 150ms ease-out, outline-width 150ms ease-out;

  &:focus-within {
    outline-offset: 2px;
    outline-style: solid;
    outline-width: 2px;
    outline-color: rgb(138, 231, 236);
  }

  i {
    font-size: calc(1em - 1px);
    display: flex;
    align-items: center;
    color: #bbb;
  }

  .z-input-field {
    flex: 1;
    height: 29px;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: calc(1em - 1px);
    font-weight: 400;
    color: #555;
  }
}
</style>
