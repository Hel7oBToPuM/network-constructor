<script setup>
import components from '@/assets/json/NetworkComponents.json';
import {useVueFlow} from "@vue-flow/core";
import {reactive, ref, watch} from "vue";

const currentMode = defineModel();

const { updateNodeData, findNode, findEdge } = useVueFlow();
const currentObject = reactive({
  value: {},
  type: "",
  mode: "",
});

function handleDragStart(event, nodeType) {
  event.dataTransfer.setData("node", nodeType);
  event.dataTransfer.effectAllowed = 'copy'
}

watch(currentMode, (newMode) => {
  currentObject.value = findNode(newMode.id) || findEdge(newMode.id);
  console.log(currentObject);
})
</script>

<template>
<div class="side-bar">
  <div class="choose-bar">
    <div class="component" :draggable="true"  v-for="(node, index) in components.nodes"
         :key="index"
         @dragstart="handleDragStart($event, node.type)">
      <img class="component-img" :draggable="false" :src="node.img" :alt="node.title"/>
      {{node.title}}
    </div>
  </div>
  <div class="settings-bar">
    <div v-if="currentMode.mode === 'props'" class="settings-props">
      <div class="settings-props-title">Параметры</div>
      <div class="settings-prop">
        <div class="props-title">Шлюз</div>
        <input class="gateway-input"/>
      </div>
    </div>
    <div v-else-if="currentMode.mode === 'table'" class="settings-table">
      <div>

      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.side-bar {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F4F3F4;
}

.choose-bar, .settings-bar {
  width: 100%;
}

.choose-bar {
  height: fit-content;
}

.choose-bar{
  padding: 6% 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-bottom: 0.3vh solid #D9D9D9;
}

.component {
  width: 35%;
  height: 90%;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2vw;
  background: white;
  border-radius: 0.6vw;
  cursor: grab;
}

.component-img {
  width: 100%;
}

.settings-props {
  padding: 4% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}

.settings-props-title {
  font-size: 1.7vw;
}

.props-title {
  font-size: 1.4vw;
}

.settings-prop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
}

</style>