<script lang="ts">
import { defineComponent, inject, useSlots, createApp, ref, Ref } from "vue";

export default defineComponent({
  props: {
    show: Boolean,
  },
  emits: ["update:show"],
  setup() {
    const mod_modal = inject<(t?: Node[] | null) => void>("mod_modal", () => undefined);
    const modal = inject<Ref<Node[] | null>>("modal", ref(null));
    const slots = useSlots();
    const slots_list = slots.default?.();
    const container = document.createElement("div");
    const icon = document.createElement("i");

    icon.setAttribute("class", "bi bi-x");
    icon.style.fontSize = "15px";
    container.setAttribute("class", "z-modal-outerin");

    const modal_ = createApp({
      render: () => {
        return slots_list;
      },
    });

    modal_.mount(container);
    container.removeAttribute("data-v-app");
    container.insertBefore(icon, container.firstChild);

    return {
      mod_modal,
      container,
      slots_list,
      modal,
    };
  },
  watch: {
    modal: {
      handler(m: Node[] | null) {
        if (!m) this.$emit("update:show", !1);
      },
      immediate: true,
    },
    show: {
      handler(s) {
        if (s) {
          let nodes: Node[] = [];

          if (this.slots_list) {
            nodes.push(this.container);
            this.mod_modal(nodes);
          }
        } else {
          this.mod_modal(null);
        }
      },
      immediate: true,
    },
  },
});
</script>

<template>{{ undefined }}</template>

<style lang="scss">
.z-modal {
  position: absolute;
  z-index: -99;
  opacity: 0;
  height: 0;
  width: 0;
}

.z-modal-outerin {
  background-color: #fff;
  display: flex;
  padding: 8px;
  border-radius: 5px;
  flex-direction: column;

  i.bi.bi-x {
    cursor: pointer;
    display: inline-flex;
    width: fit-content;
    align-self: flex-end;
    position: absolute;
    right: 7px;
    top: 7px;
    color: rgb(184, 184, 184);
    font-size: 12px;
    transition: 100ms ease;

    &:hover {
      color: rgb(155, 155, 155);
    }
  }
}
</style>
