<script setup>
import { ref, watch } from "vue";
import { useRouter } from 'vue-router';

import Level from "@/components/LevelsItem.vue";

import LevelsData from '@/assets/json/OSI.json';


const padding = 8;
const height = 100 - 2 * padding - 12;
const gap = 2;
const lastElementWidth = 50;

defineProps(["url"]);

const router = useRouter();

const levels = ref(LevelsData);
const activeButtonIndex = ref(null);
const mainRef = ref(null);

const handleClick = (index, url) => {
  activeButtonIndex.value = index !== activeButtonIndex.value ? index : null;
  router.push(activeButtonIndex.value !== null ? url : "/")
}

watch(activeButtonIndex, (newValue) => {
  if (newValue !== null) {
    setTimeout(() => {
      mainRef.value.scrollTop = activeButtonIndex.value < levels.value.length / 2 - 1 ? 0 : mainRef.value.scrollHeight;
    }, 400);
  }
});
</script>

<template>
  <main ref="mainRef" :style="{padding: `${padding}vh`, height: `${height}vh`}">
    <ul :style="{gap: `${gap}vh`}" class="levels">
      <Level v-for="(level, index) in levels"
             :key="index"
             :color="level.props.color"
             :materials="level.props.materials"
             :btn-height="(height - gap * (levels.length - 1)) / levels.length"
             :width="lastElementWidth - (lastElementWidth / 15) * (levels.length - 1 - index)"
             :active-width="lastElementWidth"
             :is-active="activeButtonIndex === index"
             @clicked="handleClick(index, level.props.id)">
        <template #title>{{ level.title }}</template>
        <template #description>{{ level.props.description }}</template>
      </Level>
    </ul>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
  overflow: auto;
  display: flex;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 0;
}

.levels {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
