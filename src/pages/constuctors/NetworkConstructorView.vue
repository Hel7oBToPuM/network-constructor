<script setup>
import {ref, watch} from "vue";
import {VueFlow, useVueFlow} from "@vue-flow/core";
import {Background} from '@vue-flow/background';

import {generate as uuid} from "short-uuid";

import SideBar from "@/components/NetworkConstructor/TheSideBar.vue";
import ComputerNode from "@/components/NetworkConstructor/ComputerNode.vue";
import RouterNode from "@/components/NetworkConstructor/RouterNode.vue"
import ConstructorEdge from "@/components/NetworkConstructor/ConstructorEdge.vue";


const {
  addNodes, findNode,
  addEdges, findEdge,
  onConnect,
  screenToFlowCoordinate
} = useVueFlow();

const propsEditingMode = ref({id: null, mode: null})
watch(propsEditingMode, (newMode, oldMode) => {
  if (newMode.id !== oldMode.id) {
    const oldItem = findNode(oldMode.id) || findEdge(oldMode.id);
    if (oldItem)
      oldItem.data.focus = false;
    const newItem = findNode(newMode.id) || findEdge(newMode.id);
    if (newItem)
      newItem.data.focus = true;
  }
})

async function onDrop(event) {
  const nodeType = event.dataTransfer.getData("node");
  if (nodeType !== undefined && nodeType !== null && nodeType !== "") {
    const position = screenToFlowCoordinate({
      x: event.clientX - 200 / 2,
      y: event.clientY - 200 / 2
    });
    const newNode = {
      id: uuid(),
      type: nodeType,
      position: position,
    };
    addNodes(newNode);
  }
}

onConnect((connection) => {
  addEdges({
    ...connection,
    type: "constructor",
  });
})
</script>

<template>
  <main>
    <div class="drag-and-drop" @drop="onDrop">
      <VueFlow :deleteKeyCode="'Delete'"
          @dragover.prevent="(event) => {if (event.dataTransfer) {event.dataTransfer.dropEffect = 'copy'}}">
        <Background :size="2" :gap="20" pattern-color="#BDBDBD"/>
        <template #node-computer="computerNodeProps">
          <ComputerNode @setting="propsEditingMode = $event" v-bind="computerNodeProps"/>
        </template>
        <template #node-router="routerNodeProps">
          <RouterNode @setting="propsEditingMode = $event" v-bind="routerNodeProps"/>
        </template>
        <template #edge-constructor="constructorEdgeProps">
          <ConstructorEdge @setting="propsEditingMode = $event" v-bind="constructorEdgeProps" />
        </template>
      </VueFlow>
    </div>
    <SideBar v-model="propsEditingMode"></SideBar>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 12vh)
}

.drag-and-drop {
  height: 100%;
  width: 100%;
}
</style>