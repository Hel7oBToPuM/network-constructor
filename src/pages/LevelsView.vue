<script setup>
import {ref} from "vue";
import LevelsItem from "@/components/LevelsItem.vue";

const padding = 8
const height = 100 - 2 * padding - 12
const gap = 2
const lastElementWidth = 58

const levels = ref(
    {
      "Прикладной уровень": {
        color: "#efc3e6",
        description: "Lorem Ipsum",
        protocols: ["HTTP"]
      },
      "Уровень представления": {
        color: "#f1b5d9",
        description: "Lorem Ipsum",
        protocols: []
      },
      "Сеансовый уровень": {
        color: "#f0a6cb",
        description: "Lorem Ipsum",
        protocols: []
      },
      "Транспортный уровень": {
        color: "#c697c1",
        description: "Lorem Ipsum",
        protocols: ["TCP", "UDP", "SCTP"]
      },
      "Сетевой уровень": {
        color: "#9e80a6",
        description: "Lorem Ipsum",
        protocols: ["IP"]
      },
      "Канальный уровень": {
        color: "#75678a",
        description: "Lorem Ipsum",
        protocols: ["Ethernet", "MAC"]
      },
      "Физический уровень": {
        color: "#4e445c",
        description: "Lorem Ipsum",
        protocols: []
      },
    }
)
</script>

<template>
  <main :style="{padding: `${padding}vh 0`}">
    <ul :style="{gap: `${gap}vh`}" class="levels">
      <LevelsItem
          v-for="(props, title, index) in levels"
          :key="index"
          :class-level="'level-' + index"
          :color="props.color"
          :button-height="(height - 2*(Object.keys(levels).length - 1))/Object.keys(levels).length"
      >
        {{ title }}
      </LevelsItem>
    </ul>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
}

.levels {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
