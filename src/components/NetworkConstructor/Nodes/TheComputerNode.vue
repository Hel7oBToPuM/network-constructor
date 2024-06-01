<script setup>
import {computed, watch} from "vue";
import {Handle, Position, useNode, useVueFlow} from "@vue-flow/core";

import NodeHead from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeHead.vue";
import NodeIP from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeIP.vue";
import NodeStatus from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeStatus.vue";
import NodeSender from "@/components/NetworkConstructor/Nodes/NodeItems/TheNodeSender.vue";

import {useRIPv1Timeout, sendPackage, sortRoutingTableByHops} from "@/components/NetworkConstructor/Nodes/NodeUtils.js";
import {useWindowFocus} from "@vueuse/core";

const props = defineProps(["id"]);
defineEmits(["selectSetting"]);

const {id: vueFlowId} = useVueFlow();

const {node, connectedEdges} = useNode();
const {data} = node;
data.props = {
  gateway: {enabled: false, value: ""},
  routerMode: {enabled: false},
  state: {enabled: false},
  packageType: "none",
};

const borderColorStyle = computed(() => {
  return {borderColor: data.focus ? "#eda1e7" : "black"}
})

const {start: startRIP, stop: stopRIP, state: stateRIP} = useRIPv1Timeout(connectedEdges, props.id, data);
watch(connectedEdges, (edges) => {
  if (edges && edges.length > 0 && stateRIP() === false)
    startRIP();
  else if (edges.length === 0 && stateRIP() === true) {
    stopRIP();
    Object.keys(data.table).forEach((dest_ip) => {
      if (dest_ip !== data.ip)
        delete data.table[dest_ip];
    })
  }
}, {immediate: true});

const windowFocused = useWindowFocus();
watch(windowFocused, (isFocused) => {
  if (connectedEdges.value.length > 0) {
    if (isFocused && stateRIP() === false)
      startRIP();
    else if (!isFocused && stateRIP() === true)
      stopRIP();
  }
})

watch(() => data.ip, (newIp, oldIp) => {
  delete data.table[oldIp];
  data.table[newIp] = {gateway: newIp, edge: null, hops: 0};
  sortRoutingTableByHops(data);
})

const {start: startSend} = sendPackage(vueFlowId);
</script>

<template>
  <div class="node" :style="borderColorStyle">
    <Handle v-for="(position) in Object.values(Position)"
            class="handle"
            type="source"
            :position="position"
            :style="borderColorStyle"/>
    <NodeHead :nodeType="node.type"
              @setting="(mode) => {$emit('selectSetting', id); data.settingMode=mode}"/>
    <NodeIP :ip="data.ip" @update:ip="data.ip = $event"/>
    <NodeSender :disabled="data.isSendingPackage" @sendPackage="startSend($event, node);"/>
    <NodeStatus :status="data.status"/>
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