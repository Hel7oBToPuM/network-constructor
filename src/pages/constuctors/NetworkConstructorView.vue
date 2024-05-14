<script setup>
import {ref, watch} from "vue";
import {VueFlow, useVueFlow, ConnectionLineType} from "@vue-flow/core";
import {Background} from '@vue-flow/background';

import {generate as uuid} from "short-uuid";

import SideBar from "@/components/NetworkConstructor/SideBar/TheSideBar.vue";
import ComputerNode from "@/components/NetworkConstructor/Nodes/TheComputerNode.vue";
import RouterNode from "@/components/NetworkConstructor/Nodes/TheRouterNode.vue"
import ConstructorEdge from "@/components/NetworkConstructor/Edges/TheConstructorEdge.vue";

const {
  addNodes, findNode, getIncomers, getOutgoers, onNodesChange,
  addEdges, findEdge, onEdgesChange,
  onConnect,
  screenToFlowCoordinate
} = useVueFlow();

const selectedObjectId = ref("")
watch(selectedObjectId, (newId, oldId) => {
  const oldObj = findNode(oldId) || findEdge(oldId);
  if (oldObj)
    oldObj.data.focus = false;
  const newObj = findNode(newId) || findEdge(newId);
  if (newObj)
    newObj.data.focus = true;
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

onNodesChange((event) => {
  if (event[0].type === "remove")
    selectedObjectId.value = '';
})
onEdgesChange((event) => {
  if (event[0].type === "remove")
    selectedObjectId.value = '';
})

onConnect((connection) => {
  if (connection.source !== connection.target) {
    const isTargetConnectedToSource = [...getIncomers(connection.source), ...getOutgoers(connection.source)]
        .filter((node) => node.id === connection.target).length;
    if (!isTargetConnectedToSource) {
      addEdges({
        ...connection,
        type: "constructor",
      });
    }
  }
})
</script>

<template>
  <main>
    <VueFlow :style="{width: '100%', height: '100%'}"
             :deleteKeyCode="'Delete'" :multiSelectionKeyCode="null" :selectionKeyCode="null"
             :connectionLineType="ConnectionLineType.Straight" :connectionLineStyle="{strokeWidth: 2}"
             :selectNodesOnDrag="true"
             @dragover.prevent="$event.dataTransfer.dropEffect = $event.dataTransfer ? 'copy' : 'none'"
             @drop="onDrop">
      <Background :size="2" :gap="20" pattern-color="#BDBDBD"/>
      <template #node-computer="computerNodeProps">
        <ComputerNode @selectSetting="selectedObjectId = $event" v-bind="computerNodeProps"/>
      </template>
      <template #node-router="routerNodeProps">
        <RouterNode @selectSetting="selectedObjectId = $event" v-bind="routerNodeProps"/>
      </template>
      <template #edge-constructor="constructorEdgeProps">
        <ConstructorEdge @selectSetting="selectedObjectId = $event" v-bind="constructorEdgeProps"/>
      </template>
    </VueFlow>
    <SideBar :curObjId="selectedObjectId"></SideBar>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 12vh);
  width: 100%;
}
</style>