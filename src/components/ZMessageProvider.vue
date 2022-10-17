<script lang="ts" setup>
import { MessagePropRequired } from "../hooks/useMessage";
import { computed, inject, Ref, watch } from "vue";
import ZMessage from "./ZMessage.vue";
import ZMessageTransition from "./ZMessageTransition.vue";

interface Props {
  msgLimit?: number;
}

const props = defineProps<Props>();

const mod_limit_msg = inject<(num?: number) => void>("mod_limit_msg");
const limit_msg = inject("limit_msg") as Ref<number>;
const msg = inject<Ref<MessagePropRequired[]>>("msg");

const messagesByPlaces = computed(() => {
  if (msg) {
    return msg.value.reduce(
      (p, c) => {
        if (!p[c.placement]) p[c.placement] = [];
        p[c.placement].push(c);

        return p;
      },
      {} as {
        [k: string]: MessagePropRequired[];
      }
    );
  }
  return {};
});

watch(
  () => props.msgLimit,
  (lim) => {
    if (lim) {
      mod_limit_msg && mod_limit_msg(lim);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="z-message-provider">
    <div class="message-provider">
      <div class="message-provider-top">
        <div class="top-left">
          <ZMessageTransition style="align-items: start">
            <ZMessage
              v-for="m in messagesByPlaces['top-left']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
        <div class="top">
          <ZMessageTransition style="align-items: center">
            <ZMessage
              v-for="m in messagesByPlaces['top']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
        <div class="top-right">
          <ZMessageTransition style="align-items: end">
            <ZMessage
              v-for="m in messagesByPlaces['top-right']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
      </div>
      <div class="message-provider-bottom">
        <div class="bottom-left">
          <ZMessageTransition style="align-items: start">
            <ZMessage
              v-for="m in messagesByPlaces['bottom-left']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
        <div class="bottom">
          <ZMessageTransition style="align-items: center">
            <ZMessage
              v-for="m in messagesByPlaces['bottom']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
        <div class="bottom-right">
          <ZMessageTransition style="align-items: end">
            <ZMessage
              v-for="m in messagesByPlaces['bottom-right']"
              :key="m.timestamp"
              :timestamp="m.timestamp"
              :text="m.text"
              :type="m.type"
            ></ZMessage>
          </ZMessageTransition>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.z-message-provider {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2002;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  pointer-events: none;

  // for scrolbarr
  & {
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: rgb(207, 207, 207);
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(136, 136, 136);
      border-radius: 1px;
      &:hover {
        background: rgb(117, 117, 117);
      }
    }
  }

  & .message-provider {
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    pointer-events: none;
    position: fixed;

    &-top,
    &-bottom {
      height: 50%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 10px 17px;
      box-sizing: border-box;
      gap: 7px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &-top {
      .top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-content: flex-start;
      }
      .top-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .top-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
      }
    }

    &-bottom {
      .bottom {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }
      .bottom-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .bottom-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
  }
}
</style>
