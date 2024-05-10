<script setup>
import {computed, onMounted, ref, watchEffect} from "vue";
import {Handle, Position, useNode} from "@vue-flow/core";

import NodeStatus from "@/components/NetworkConstructor/NodeStatus.vue";

const emit = defineEmits(["setting"]);
const props = defineProps(["id"]);

const {node, connectedEdges} = useNode();
node.data = {
  ip: Array.from({length: 4}, () => Math.floor(Math.random() * 254 + 1)).join('.'),
  table: {},
  focus: true
}
const {data} = node;

// Обновление базовой таблицы маршруртизации по прямым подключениям
watchEffect(() => {
  if (connectedEdges && connectedEdges.value.length > 0) {
    // Создание новой таблицы маршуртизации прямых подключений
    const newTable = {};
    for (const edge of connectedEdges.value) {
      const {id, targetNode, sourceNode} = edge;
      if (targetNode.id === props.id)
        newTable[sourceNode.data.ip] = {gateway: sourceNode.data.ip, edge: id, hops: 1};
      else if (sourceNode.id === props.id)
        newTable[targetNode.data.ip] = {gateway: targetNode.data.ip, edge: id, hops: 1};
    }
    // По разнице между таблицами обновляется старая
    if (Object.keys(data.table).length === 0)
      node.data.table = newTable;
    else {
      const oldGateways = Object.keys(data.table).map(key => data.table[key].gateway);
      const newGateways = Object.keys(newTable).map(key => newTable[key].gateway);

      for (const key in data.table)
        if (!newGateways.includes(data.table[key].gateway))
          delete data.table[key];

      for (const key in newTable)
        if (!oldGateways.includes(newTable[key].gateway))
          data.table[key] = newTable[key];
    }
  } else
    for (const key in data.table)
      if (data.table.hasOwnProperty(key))
        delete data.table[key];
})

const validateIpInput = (event) => {
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter']
  if (!controlKeys.includes(event.key) && event.key !== '.' && isNaN(parseInt(event.key, 10)) ||
      event.key === '.' && event.target.textContent.split('.').length > 3 ||
      event.target.textContent.split('.').join('').length > 11 && !controlKeys.includes(event.key) && event.key !== '.') {
    event.preventDefault();
  }
};

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
    <div class="node-ip nodrag" @click.stop="$event.target.querySelector('.node-ip-editing').focus()">
      <div class="node-ip-name nodrag" @click.stop="$event.target.parentNode.querySelector('.node-ip-editing').focus()">
        IP
      </div>
      <div
          class="node-ip-editing nodrag"
          contenteditable="true"
          @dragstart.prevent @click.stop
          @keyup.enter.esc="$event.target.blur()" @keydown="validateIpInput"
          @input="data.ip = $event.target.textContent">
        {{ data.ip }}
      </div>
    </div>
    <NodeStatus>

    </NodeStatus>
    <div class="node-send">
      <input class="node-send-address nodrag" placeholder="ПОЛУЧАТЕЛЬ"
             @dragstart.prevent
             @keyup.enter.esc="(event)=>{event.target.blur()}" @keydown="validateIpInput"/>
      <button class="node-send-btn" title="Отправить пакет"><img src="/png/play.png" alt="Отправить"/></button>
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
  cursor: text;
}

.node-ip-name, .node-ip-editing {
  font-size: 16px;
}

.node-ip-editing {
  outline: none;
  min-width: 7px;
  text-align: center;
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