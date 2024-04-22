<script setup>
const props = defineProps(["classLevel", "color", "btnHeight", "width", "activeWidth", "isActive"]);
</script>

<template>
  <li :style="{width: isActive ? `${activeWidth}%` : `${width}%`}" :class="{[classLevel]: true, active: isActive }">
    <button :style="{backgroundColor: `${color}d0`, height: `${btnHeight}vh`}" @click="$emit('clicked')">
      <slot name="title"></slot>
    </button>
    <Transition>
      <p v-if="isActive" :style="{backgroundColor: `${color}51`}"><slot v-if="isActive" name="description"></slot></p>
    </Transition>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  transition: width 0.5s ease;
}

button {
  line-height: 1;
  font-size: 1.6vw;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}
button:hover {
  cursor: pointer;
}

p {
  padding: 2%;
  font-size: 1.4vw;
  line-height: 1.2;
  text-align: justify;
  border-radius: 0 0 0.3vw 0.3vw;
}
</style>
