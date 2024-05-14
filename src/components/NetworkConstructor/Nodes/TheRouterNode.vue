<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {Handle, Position, useNode} from "@vue-flow/core";

import NodeHead from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeHead.vue";
import NodeIP from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeIP.vue";
import NodeStatus from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeStatus.vue";

import {watchNewConnections} from "@/components/NetworkConstructor/Nodes/NodeUtils.js";

const props = defineProps(["id"]);
const emit = defineEmits(["selectSetting"]);

const {node, connectedEdges} = useNode();
node.data = {
  ip: Array.from({length: 4}, () => Math.floor(Math.random() * 254 + 1)).join('.'),
  settingMode: "props",
  table: {},
  props: {
    gateway: {enabled: false, value: ""},
    disabled: {enabled: false}
  },
  focus: true
}
const {data} = node;

watch(data, () => {
  console.log("Изменен Роутер:", node.id, "Значение:", data);
})

watchNewConnections(connectedEdges, props.id, data);

const borderColorStyle = computed(() => {
  return {borderColor: node.data.focus ? "#eda1e7" : "black"}
})

onMounted(() => {
  emit('selectSetting', props.id);
})
</script>

<template>
  <div class="node" :style="borderColorStyle">
    <Handle v-for="(position) in Object.values(Position)"
            class="handle"
            type="target"
            :position="position"
            :style="borderColorStyle"/>
    <NodeHead :nodeType="node.type"
              @setting="(mode) => {$emit('selectSetting', id); data.settingMode=mode}"/>
    <NodeIP :ip="data.ip" @update:ip="data.ip = $event"/>
    <NodeStatus/>
  </div>
</template>

<style scoped>
.node, .handle {
  border: 2px solid black;
  transition: border-color 0.3s ease-in-out;
}

.node {
  position: relative;
  width: 180px;
  height: fit-content;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background-color: #F4F3F4;
  border-radius: 14px;
}

.handle {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 100%;
}
</style>