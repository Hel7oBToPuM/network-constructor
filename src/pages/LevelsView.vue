<script setup>
import {ref} from "vue";
import Level from "@/components/LevelsItem.vue";

const padding = 8
const height = 100 - 2 * padding - 12
const gap = 2
const lastElementWidth = 50

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
        description: `Транспортный уровень, или уровень 4 модели OSI, управляет сетевым трафиком между хостами и \
         конечными системами, гарантируя полный поток данных. Объем, назначение и скорость передачи данных \
         контролируются протоколами транспортного уровня. Пакеты данных должны быть получены и отправлены на \
         соответствующую машину сетевым уровнем. После этого транспортный уровень принимает пакеты, сортирует их и \
         ищет ошибки. Затем он направляет их на сеансовый уровень соответствующей компьютерной программы.`,
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

const activeButtonIndex = ref(null);
</script>

<template>
  <main :style="{padding: `${padding}vh 0`}">
    <ul :style="{gap: `${gap}vh`}" class="levels">
      <Level
          v-for="(props, title, index) in levels"
          :key="index"
          :class-level="`level-${index}`"
          :color="props.color"
          :btn-height="(height - gap*(Object.keys(levels).length - 1))/Object.keys(levels).length"
          :width="lastElementWidth - (lastElementWidth / 15) * (Object.keys(levels).length - 1 - index)"
          :active-width="lastElementWidth"
          :is-active="activeButtonIndex === index"
          @clicked="activeButtonIndex = (index !== activeButtonIndex ? index : null)"
      >
        <template #title>{{ title }}</template>
        <template #description>{{ props.description }}</template>
      </Level>
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
