<script setup>
import {ref, onMounted, computed} from "vue";

const props = defineProps([ "color", "btnHeight", "width", "activeWidth", "isActive", "index"]);
const emit = defineEmits(["register-ref", "clicked"]);

const liRef = ref(null);

onMounted(() => {
  emit('register-ref', liRef, props.index);
});

const liStyle = computed(() => {
  return {
    width: `${props.isActive ? props.activeWidth : props.width}%`,
    transition: props.isActive ? 'width 1s ease-out' : 'width 1s ease-out 1s'
  };
});


const divStyle = computed(() => {
  return {
    backgroundColor: `${props.color}51`,
    maxHeight: props.isActive ? '50vh' : '0',
    transition: props.isActive ? 'max-height 1.5s ease-out 1s' : 'max-height 1s ease-out '
  };
});

</script>

<template>
  <li ref="liRef" :style="liStyle" :class="{[`level-${index}`]: true}">
    <button
        :style="{backgroundColor: `${color}d0`, height: `${btnHeight}vh`}"
        @click="$emit('clicked')">
      <slot name="title"></slot>
    </button>
    <div :style="divStyle">
      <p><slot name="description"></slot></p>
    </div>
  </li>
</template>

<style scoped>

li {
  display: flex;
  flex-direction: column;
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
  overflow: hidden;
  border-radius: 0 0 0.3vw 0.3vw;
}

p {
  padding: 2%;
  font-size: 1.4vw;
  line-height: 1.2;
  text-align: justify;
}
</style>
