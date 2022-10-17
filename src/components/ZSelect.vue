<script setup lang="ts">
import { computed, ref } from "vue";

interface Prop {
  placeholder?: string;
  options?: {
    label: string;
    value: number | string;
  }[];
  value?: number | string | null;
}

interface Emit {
  (e: "update:value", v: number | string | null): void;
}

const props = defineProps<Prop>();
const emits = defineEmits<Emit>();

const openSelect = ref(false);

const minWidth = computed(() => {
  if (!props.options) return props.placeholder ? props.placeholder.length : 13;

  const longest = props.options.reduce((prev, current) => {
    return prev.label.length > current.label.length ? prev : current;
  });

  return longest.label.length;
});

const clickHandler = (e: Event) => {
  const parentClass = [
    "z-select-placeholder",
    "bi bi-chevron-down",
    "z-select-up",
    "z-select-selected",
  ];
  const el = e.target as Element;

  if (!parentClass.includes(el.className)) {
    openSelect.value = false;
    document.removeEventListener("click", clickHandler);
  }
};

const clickOption = (opt: { label: string; value: number | string }) => {
  emits("update:value", opt.value);
};

const onTapUpSection = () => {
  openSelect.value = !openSelect.value;
  if (openSelect.value) {
    document.addEventListener("click", clickHandler);
  } else {
    document.removeEventListener("click", clickHandler);
  }
};
</script>

<template>
  <div class="z-select">
    <div
      class="z-select-up"
      :style="{
        borderColor: openSelect ? 'rgb(138, 231, 236)' : '',
        width: `calc(${minWidth}ch + 18px)`,
      }"
      @click="onTapUpSection"
    >
      <p class="z-select-selected" v-if="props.value !== null">
        {{ props.options?.filter((o) => o.value === props.value)[0].label }}
      </p>
      <p v-else :style="{ width: `${minWidth + 1}ch` }" class="z-select-placeholder">
        {{ props.placeholder || "Please Select" }}
      </p>
      <i class="bi bi-chevron-down"></i>
    </div>
    <div class="z-select-selection">
      <div
        class="z-select-selection-wrapper-outer"
        :style="
          openSelect ? 'max-height: 600px; opacity: 1' : 'max-height: 0; opacity: 0'
        "
      >
        <div class="z-select-selection-wrapper">
          <div
            v-for="o in props.options"
            class="z-select-option"
            :key="o.value"
            @click="clickOption(o)"
            :class="o.value === props.value && 'z-select-option-active'"
          >
            <span>{{ o.label }}</span>
          </div>
          <div class="z-select-nodata" v-if="!props.options">No options</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.z-select {
  display: inline-flex;
  cursor: pointer;
  flex-direction: column;

  & &-up {
    border-radius: 4px;
    padding-inline: 10px;
    border: 1px solid rgb(209, 209, 209);
    height: 29px;
    display: inline-flex;
    align-items: center;
    column-gap: 8px;
    transition: 175ms ease;
    justify-content: space-between;

    .z-select-placeholder {
      color: #999;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      user-select: none;
    }

    .z-select-selected {
      color: #555;
      user-select: none;
    }

    .bi-chevron-down {
      color: #777;
      font-size: calc(1em - 5px);
    }
  }

  .z-select-selection {
    position: relative;
    display: flex;

    .z-select-selection-wrapper {
      &-outer {
        transition: 100ms linear;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
      }

      margin-top: 3px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      border: 1px solid rgb(209, 209, 209);
      border-radius: 4px;
      row-gap: 4px;

      .z-select-nodata {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }

      .z-select-option {
        display: flex;
        padding: 7px;
        color: #555;
        border-radius: 4px;
        transition: 200ms ease;

        &-active {
          background-color: rgba(138, 231, 236, 0.13);
          &:hover {
            background-color: rgba(138, 231, 236, 0.185) !important;
          }
        }

        span {
          white-space: nowrap;
        }

        &:hover {
          background-color: rgba(245, 245, 245, 0.582);
        }
      }
    }
  }
}
</style>
