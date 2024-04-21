<script setup>
import { ref } from "vue";
const show = ref(false);
defineProps(["classLevel"]);
</script>

<template>
  <li>
    <button :class="{ [classLevel]: true, active: show }" @click="show = !show">
      <slot></slot>
    </button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </li>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
