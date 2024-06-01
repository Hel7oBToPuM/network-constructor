<script setup>
import {nextTick, onBeforeMount, onUnmounted, ref, watch} from "vue";
import {VueFlow, useVueFlow, ConnectionLineType} from "@vue-flow/core";
import {Background} from '@vue-flow/background';

import {generate as uuid} from "short-uuid";

import SideBar from "@/components/NetworkConstructor/SideBar/TheSideBar.vue";
import ComputerNode from "@/components/NetworkConstructor/Nodes/TheComputerNode.vue";
import RouterNode from "@/components/NetworkConstructor/Nodes/TheRouterNode.vue"
import ConstructorEdge from "@/components/NetworkConstructor/Edges/TheConstructorEdge.vue";

const {
  addNodes, findNode, getIncomers, getOutgoers,
  addEdges, findEdge,
  screenToFlowCoordinate,
  toObject, fromObject
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

    const newNodeIp = Array.from({length: 4}, () => Math.floor(Math.random() * (254 - 1) + 1)).join('.');
    const newNode = {
      id: uuid(),
      type: nodeType,
      position: position,
      data: {
        focus: true,
        ip: newNodeIp,
        table: {[newNodeIp]: {gateway: newNodeIp, edge: null, hops: 0}},
        props: {},
        settingMode: "props",
        isSendingPackage: false,
        status: {
          packageDelivery: {enabled: false, data: {}},
          requestRoutingTable: {enabled: false, data: {}},
          successfulDelivery: {enabled: false, data: {}},
          errorSendingPackage: {enabled: false, data: {}}
        }
      }
    };
    addNodes(newNode);
  }
}

const onNodesChange = (events) => {
  Object.values(events).forEach((event) => {
    if (event.type === "add")
      nextTick(selectedObjectId.value = event.item.id)
    else if (event.type === "remove")
      selectedObjectId.value = '';
  });
}

const onEdgesChange = (events) => {
  Object.values(events).forEach((event) => {
    if (event.type === "remove")
      selectedObjectId.value = '';
  });
}

const onConnect = (connection) => {
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
}

function beforeWindowUnload() {
  const flow = toObject();
  for (const node of flow.nodes) {
    node.data.isSendingPackage = false;
    node.data.focus = false;
    for (const key in node.data.status)
      node.data.status[key].enabled = false;
  }
  for (const edge of flow.edges)
    for (const key in edge.data.animation)
      edge.data.animation[key] = false;

  localStorage.setItem('networkConstructor', JSON.stringify(flow));
}

onBeforeMount(() => {
  const flow = JSON.parse(localStorage.getItem('networkConstructor'));
  if (flow)
    fromObject(flow);
  window.addEventListener('beforeunload', beforeWindowUnload);
});

onUnmounted(() => {
  beforeWindowUnload()
})
</script>

<template>
  <main>
    <VueFlow :style="{width: '100%', height: '100%'}"
             :deleteKeyCode="'Delete'" :multiSelectionKeyCode="null" :selectionKeyCode="null"
             :connectionLineType="ConnectionLineType.Straight" :connectionLineStyle="{strokeWidth: 2}"
             :selectNodesOnDrag="true"
             :snapToGrid="true" :snapGrid="[15, 15]"
             @connect="onConnect" @nodesChange="onNodesChange" @edgesChange="onEdgesChange"
             @dragover.prevent="$event.dataTransfer.dropEffect = $event.dataTransfer ? 'copy' : 'none'"
             @drop="onDrop">
      <Background :size="2" :gap="15" pattern-color="#BDBDBD"/>
      <template #node-computer="computerNodeProps">
        <ComputerNode @selectSetting="selectedObjectId = $event" v-bind="computerNodeProps"/>
      </template>
      <template #node-router="routerNodeProps">
        <RouterNode @selectSetting="selectedObjectId = $event"
                    v-bind="routerNodeProps"/>
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