<script setup>
import { ref } from "vue";
const show = ref(false);
const props = defineProps(["classLevel", "color", "buttonHeight"]);
</script>

<template>
  <li :class="{[classLevel]: true, active: show }" >
    <button :style="{backgroundColor: `${color}d0`, height: `${buttonHeight}vh`}" @click="show = !show">
      <slot></slot>
    </button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-direction: column;
}
button {
  line-height: 1;
  font-size: 1.5vw;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}
.active {
    width: 58%;
}
</style>
