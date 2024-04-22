<script setup>
import { ref, onMounted } from "vue";

const props = defineProps([ "color", "btnHeight", "width", "activeWidth", "isActive", "index"]);
const emit = defineEmits(["register-ref", "clicked"]);

const liRef = ref(null);

onMounted(() => {
  emit('register-ref', liRef, props.index);
});

</script>

<template>
  <li ref="liRef"
      :style="{width: `${isActive ? activeWidth : width}%`}"
      :class="{[`level-${index}`]: true, active: isActive }">
    <button
        :style="{backgroundColor: `${color}d0`, height: `${btnHeight}vh`}"
        @click="$emit('clicked')">
      <slot name="title"></slot>
    </button>
    <div v-show="isActive" class="description-container" :style="{backgroundColor: `${color}51`}">
      <p><slot name="description"></slot></p>
    </div>
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

div {
  border-radius: 0 0 0.3vw 0.3vw;
}

p {
  padding: 2%;
  font-size: 1.4vw;
  line-height: 1.2;
  text-align: justify;
}
</style>
