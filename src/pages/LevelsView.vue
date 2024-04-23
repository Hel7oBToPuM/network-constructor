<script setup>
import {nextTick, ref} from "vue";
import Level from "@/components/LevelsItem.vue";

const padding = 8
const height = 100 - 2 * padding - 12
const gap = 2
const lastElementWidth = 50

const levels = ref(
    {
      "Прикладной уровень": {
        color: "#efc3e6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        protocols: ["HTTP"]
      },
      "Уровень представления": {
        color: "#f1b5d9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        protocols: []
      },
      "Сеансовый уровень": {
        color: "#f0a6cb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        protocols: ["IP"]
      },
      "Канальный уровень": {
        color: "#75678a",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        protocols: ["Ethernet", "MAC"]
      },
      "Физический уровень": {
        color: "#4e445c",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        protocols: []
      },
    }
)

const activeButtonIndex = ref(null);
const levelRefs = ref([]);

const handleClick = (index) => {
  const newIndex = index !== activeButtonIndex.value ? index : null;
  activeButtonIndex.value = newIndex;

  nextTick(() => {
    if (newIndex !== null) {
      const element = levelRefs.value[newIndex];
      element.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  });
};

</script>

<template>
  <main :style="{padding: `${padding}vh`, height: `${height}vh`}">
    <ul :style="{gap: `${gap}vh`}" class="levels">
      <Level v-for="(props, title, index) in levels"
             :key="index"
             :index="index"
             :color="props.color"
             :btn-height="(height - gap * (Object.keys(levels).length - 1)) / Object.keys(levels).length"
             :width="lastElementWidth - (lastElementWidth / 15) * (Object.keys(levels).length - 1 - index)"
             :active-width="lastElementWidth"
             :is-active="activeButtonIndex === index"
             @register-ref="(el, i) => { levelRefs[i] = el.value }"
             @clicked="handleClick(index)">
        <template #title>{{ title }}</template>
        <template #description>{{ props.description }}</template>
      </Level>
    </ul>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0;
}

.levels {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
