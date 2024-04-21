<script setup>
import { ref } from "vue";
import LevelsItem from "@/components/LevelsItem.vue";
const listLevels = ref([
  "Прикладной уровень",
  "Уровень представления",
  "Сеансовый уровень",
  "Транспортный уровень",
  "Сетевой уровень",
  "Канальный уровень",
  "Физический уровень",
]);
</script>

<template>
  <ul class="levels">
    <LevelsItem
      v-for="(title, index) in listLevels"
      :key="index"
      :class-level="'level-' + index"
    >
      {{ title }}
    </LevelsItem>
  </ul>
</template>

<style>
.levels {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #f5f5f5;
}
[class^="level-"] {
  text-wrap: nowrap;
  padding: 20px 0;
}
.level-0 {
  background-color: #efc3e6e6;
  width: 300px;
}
.level-1 {
  background-color: #f1b5d9e6;
  width: 350px;
}
.level-2 {
  background-color: #f0a6cbe6;
  width: 400px;
}
.level-3 {
  background-color: #c697c1e6;
  width: 450px;
}
.level-4 {
  background-color: #9e80a6e6;
  width: 500px;
}
.level-5 {
  background-color: #75678ae6;
  width: 550px;
}
.level-6 {
  background-color: #4e445ce6;
  width: 600px;
}
.active {
  width: 600px;
}
</style>
