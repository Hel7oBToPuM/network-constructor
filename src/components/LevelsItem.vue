<script setup>
import {ref, computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps([ "color", "btnHeight", "width", "activeWidth", "isActive", "materials"]);

const current_route = useRoute();
const router = useRouter();

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
    height: `${props.btnHeight}vh`,
    borderRadius: props.isActive ? "0.3vw 0.3vw 0 0" : "0.3vw",
    transition: `border-radius 0s ease-in-out ${props.isActive ? "0s" : "0.4s"}`
  }
})

</script>

<template>
  <li :style="liStyle">
      <button :style="btnStyle"
              @click="$emit('clicked')"
              @mouseenter="isButtonHover = true"
              @mouseleave="isButtonHover = false">
        <slot name="title"></slot>
      </button>
    <div class="container" :style="divStyle">
      <p><slot name="description"></slot></p>
      <div class="btn-container">
        <button class="protocol" v-for="(url, title, index) in materials"
                :key="index"
                @click="router.push(`${current_route.path}/${url}`)">
          {{title}}
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
  padding-bottom: 2vh;
}

.protocol {
  padding: 1.5%;
  background-color: white;
  border-radius: 0.5vw;
  text-transform: capitalize;
  transition: opacity 0.2s ease-in-out;
}

.protocol:hover {
  opacity: 80%;
}
</style>
