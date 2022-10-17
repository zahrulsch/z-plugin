<script setup lang="ts">
import { onMounted } from "vue";
import ZMessageProvider from "./ZMessageProvider.vue";
import ZModalProvider from "./ZModalProvider.vue";

interface Props {
  msgLimit?: number;
}

defineProps<Props>();

onMounted(() => {
  const links = document.head.getElementsByTagName("link");
  const CDN =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css";
  let mustAddCDN = true;

  for (var i = 0; i < links.length; i++) {
    const linkHref = links[i].getAttribute("href");
    if (linkHref && linkHref.includes("/font/bootstrap-icons.css")) mustAddCDN = false;
  }

  if (mustAddCDN) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", CDN);
    document.head.prepend(link);
  }
});
</script>

<template>
  <div class="z-plugin-provider">
    <z-message-provider :msg-limit="msgLimit"></z-message-provider>
    <z-modal-provider></z-modal-provider>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.z-plugin-provider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: -1;
  pointer-events: auto;
}
</style>
