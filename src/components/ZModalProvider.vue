<script setup lang="ts">
import { inject, Ref, ref, watch } from "vue";

const modal = inject<Ref<Node[] | null>>("modal", ref(null));
const mod_modal = inject<(c?: Node[] | null) => void>("mod_modal", () => null);
const modalInjection = ref<HTMLDivElement | null>(null);
const mask = ref(!1);

const styleReseter = (d: HTMLDivElement) => {
  d.onanimationend = () => (d.innerHTML = "");
  d.ontransitionend = () => (d.innerHTML = "");
  d.style.transform = "translate(-50%, -50%)";
  d.style.opacity = "0";
  d.style.zIndex = "-99";
};

const styleActivator = (d: HTMLDivElement) => {
  d.onanimationend = () => null;
  d.ontransitionend = () => null;
  d.style.transform = "translate(-50%, -50%)";
  d.style.opacity = "1";
  d.style.zIndex = "2001";
};

watch(
  () => modal.value,
  (mods) => {
    mask.value = !1;

    if (modalInjection.value) {
      styleReseter(modalInjection.value);
    }

    if (mods) {
      mask.value = true;

      if (modalInjection.value) {
        mods.forEach((cm) => {
          modalInjection.value!.append(cm);
        });

        styleActivator(modalInjection.value);
      }
    }
  },
  {
    immediate: true,
  }
);

const maskClick = (e: MouseEvent) => {
  const i = (e.target as HTMLElement).getAttribute("class");

  if (i === "z-modal-provider" || i === "bi bi-x") {
    mod_modal(null);
  }
};
</script>

<template>
  <div
    :style="
      mask
        ? 'z-index: 1000; pointer-events: auto; background-color: rgba(128, 128, 128, 0.4)'
        : ''
    "
    class="z-modal-provider"
    @click="maskClick"
  >
    <div ref="modalInjection" class="z-modal-injection"></div>
  </div>
</template>

<style lang="scss">
.z-modal-provider {
  z-index: -99;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  pointer-events: none;
  background-color: transparent;
  transition: 100ms ease;

  .z-modal-injection {
    position: fixed;
    pointer-events: all;
    transition: 100ms ease-in-out;
    left: 50%;
    top: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%) scale(0);
    display: flex;
  }
}
</style>
