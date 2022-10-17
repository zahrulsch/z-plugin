<template>
  <TransitionGroup tag="div" name="ztrgroup" class="z-trgroup">
    <slot></slot>
  </TransitionGroup>
</template>

<style lang="scss">
.z-trgroup {
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  position: relative;
  width: 100%;
}

.ztrgroup-move,
.ztrgroup-enter-active,
.ztrgroup-leave-active {
  transition: all 0.3s ease;
}

.ztrgroup-enter-from,
.ztrgroup-leave-to {
  opacity: 0;
  filter: blur(10px);
}

.ztrgroup-enter-from {
  transform: translateY(-100%) scale(0.2);
}

.ztrgroup-leave-to {
  transform: translateY(-100%) scale(0.2);
}

.ztrgroup-leave-active {
  position: absolute;
}
</style>
