<script setup>
import {ref, onMounted, computed} from "vue";

const props = defineProps([ "color", "btnHeight", "width", "activeWidth", "isActive", "index", "protocols"]);
const emit = defineEmits(["register-ref", "clicked"]);

const isButtonHover = ref(false);

const liStyle = computed(() => {
  return {
    width: `${isButtonHover.value || props.isActive ? props.activeWidth : props.width}%`,
  };
});
const divStyle = computed(() => {
  return {
    backgroundColor: `${props.color}81`,
    maxHeight: props.isActive ? '50vh' : '0',
    transition: `max-height ${props.isActive ? 'ease-in-out 0.4s' : '0.4s ease-in-out'}`
  };
});
const btnStyle = computed(() => {
  return {
    backgroundColor: `${props.color}ED`,
    height: `${props.btnHeight}vh`
  }
})
const svgStyle = computed(() => {
  return {
    transform: props.isActive ? "translateX(0%)" : "translateX(-100%)"
  }
})

const liRef = ref(null);
onMounted(() => {
  emit('register-ref', liRef, props.index);
});


</script>

<template>
  <li ref="liRef" :style="liStyle">
    <button :style="btnStyle"
            @click="$emit('clicked')"
            @mouseenter="isButtonHover = true"
            @mouseleave="isButtonHover = false">
      <slot name="title"></slot>
    </button>
    <svg class="flag" :style="svgStyle" :height="`${btnHeight}vh`" viewBox="0 0 68 85.4" :fill="`${props.color}ED`" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0  H68  L30 43  L68 86  H0  V0Z"/>
    </svg>
    <div class="container" :style="divStyle">
      <p><slot name="description"></slot></p>
      <div class="btn-container">
        <button class="protocol" v-for="(item, index) in protocols" :key="index">
          {{item}}
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
li {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: width 0.4s ease-in-out;
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

.container {
  overflow: hidden;
  border-radius: 0 0 0.3vw 0.3vw;
}

p {
  padding: 2%;
  font-size: 1.4vw;
  line-height: 1.2;
  text-align: justify;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: 2%;
}

.protocol {
  padding: 1.5%;
  background-color: white;
  border-radius: 0.5vw;
  text-transform: capitalize;
}

.flag {
  position: absolute;
  left: 100%;
  transition: transform 0.5s ease-in-out;
}
</style>
