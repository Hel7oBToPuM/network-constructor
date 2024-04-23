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
    transition: `max-height ${props.isActive ? '1s ease-out 0.4s' : '0.4s ease-out'}`
  };
});
const btnStyle = computed(() => {
  return {
    backgroundColor: `${props.color}ED`,
    height: `${props.btnHeight}vh`
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
  background-color: white;
  padding: 1.5%;
  border-radius: 0.5vw;
  text-transform: capitalize;
}
</style>
