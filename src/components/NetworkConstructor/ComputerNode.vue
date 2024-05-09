<script setup>
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import {Handle, Position, useNode, useVueFlow} from "@vue-flow/core";

import NodeStatus from "@/components/NetworkConstructor/NodeStatus.vue";

const emit = defineEmits(["setting"]);
const props = defineProps(["id"]);

const {node, connectedEdges} = useNode();

node.data = {
  table: {},
  focus: true
}

watchEffect(() => {
  if (connectedEdges && connectedEdges.value.length > 0) {
    for (const edge of connectedEdges.value) {
      const { target, targetNode, source, sourceNode } = edge;
      if (target === props.id) {

      }
    }
    console.log("Вотч", connectedEdges.value.length)
  }
  else
    node.data.table.clear ;
})

const getRandomByte = () => Math.floor(Math.random() * 254 + 1);
const ip = ref(`${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`);
watch(ip, (newIp) => {
  node.data.ip = newIp;
}, {immediate: true});
watchEffect(() => {
  if (ip.value !== node.data.ip)
    ip.value = node.data.ip;
})
const ipInputStyle = computed(() => {
  const maxWidthValue = ip.value.split('.').join('').split('1').join('').length * 10;
  const minWidthValue = (ip.value.split('1').length * 6 + ip.value.split('.').length);
  const value = maxWidthValue + minWidthValue;
  return {
    width: `${value === 0 ? 2 : value}px`
  }
});
const validateIpInput = (event) => {
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter']
  if (!controlKeys.includes(event.key) && event.key !== '.' && isNaN(parseInt(event.key, 10)) ||
      event.key === '.' && event.target.value.split('.').length > 3 ||
      event.target.value.split('.').join('').length > 11 && !controlKeys.includes(event.key) && event.key !== '.') {
    event.preventDefault();
  }
};
const ipFocusTimer = ref();
const restartIpFocusTimer = (event) => {
  if (ipFocusTimer.value === null)
    clearTimeout(ipFocusTimer.value);
  ipFocusTimer.value = setTimeout(() => {
    event.target.blur();
  }, 10000);
}

const borderColorStyle = computed(() => {
  return {
    borderColor: node.data.focus ? "#eda1e7" : "black",
    transition: "border-color 0.3s ease-in-out"
  }
})

onMounted(() => {
  emit("setting", {id: props.id, mode: "props"});
});
</script>

<template>
  <div class="node" :style="borderColorStyle">
    <Handle class="handle"
            v-for="position in Object.values(Position)"
            :position="position"
            :style="borderColorStyle"
            type="source"/>
    <div class="node-head">
      <img class="node-img" src="/png/computer.png" alt="Компьютер"/>
      <div class="node-btn-container">
        <button class="node-btn-props" title="Параметры"
                @click="$emit('setting', {id: id, mode: 'props'})">
          <img src="/png/settings.png" alt="Параметры"/>
        </button>
        <button class="node-btn-table" title="Таблица маршуртизации"
                @click="$emit('setting', {id: id, mode: 'table'})">
          <img src="/png/table.png" alt="Таблица"/>
        </button>
      </div>
    </div>
    <div class="node-ip" @click="$event.target.querySelector('input').focus()">
      <div class="node-ip-name" @click.stop>IP</div>
      <input class="node-ip-editing nodrag"
             :style="ipInputStyle"
             v-model="ip"
             @dragstart.prevent @click.stop
             @keyup.enter.esc="$event.target.blur()"
             @keydown="validateIpInput"
             @input="restartIpFocusTimer"/>
    </div>
    <NodeStatus>

    </NodeStatus>
    <div class="node-send">
      <input class="node-send-address nodrag" placeholder="ПОЛУЧАТЕЛЬ"
             @dragstart.prevent
             @keyup.enter.esc="(event)=>{event.target.blur()}" @keydown="validateIpInput"/>
      <button class="node-send-btn"><img src="/png/play.png" alt="Отправить"/></button>
    </div>
  </div>
</template>

<style scoped>
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
  border: 2px solid black;
  border-radius: 14px;
}

.handle {
  width: 10px;
  height: 10px;
  background-color: white;
  border: 2px solid black;
  border-radius: 100%;
}

.node-head {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 14px
}

.node-img {
  width: 120px;
}

.node-btn-container {
  padding: 14px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.node-btn-table, .node-btn-props, .node-send-btn {
  width: 28px;
  line-height: 0;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.node-btn-table:hover, .node-btn-props:hover, .node-send-btn:hover {
  opacity: 0.7;
}

.node-btn-table img, .node-btn-props img, .node-send-btn img {
  width: 100%;
}

.node-ip {
  height: 28px;
  padding: 0 14px;
  display: flex;
  flex-direction: row;
  gap: 7px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 14px;
  overflow: hidden;
}
.node-ip-name, .node-ip-editing {
  font-size: 16px;
}

.node-send {
  width: 100%;
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
}

.node-send-address {
  width: 134px;
  font-size: 16px;
  text-align: center;
  border-radius: 14px;
}

</style>