<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {Handle, Position, useNode, useVueFlow} from "@vue-flow/core";

const emit = defineEmits(["setting"]);
const props = defineProps(["id"]);

const {node} = useNode();

const getRandomByte = () => Math.floor(Math.random() * 254 + 1);
const ip = ref(`${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`);
watch(ip, (newIp) => {
  node.data.ip = newIp;
}, {immediate: true});
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

const borderColorStyle = computed(() => {
  return {
    borderColor: node.data.focus ? "#eda1e7" : "black",
    transition: "border-color 0.3s ease-in-out"
  }
})

onMounted(() => {
  emit('setting', {id: props.id, mode: 'props'});
});
</script>

<template>
  <div class="node" :style="borderColorStyle">
    <Handle class="handle"
            v-for="(position) in Object.values(Position)"
            :position="position"
            :style="borderColorStyle"
    type="target"/>
    <div class="node-head">
      <img class="node-img" src="/png/router.png" alt="Роутер"/>
      <div class="node-btn-container">
        <button class="node-btn-props"
                @click="$emit('setting', {id: id, mode: 'props'})">
          <img src="/png/settings.png" alt="Параметры"/>
        </button>
        <button class="node-btn-table"
                @click="$emit('setting', {id: id, mode: 'table'})">
          <img src="/png/table.png" alt="Таблица"/>
        </button>
      </div>
    </div>
    <div class="node-ip" @click="(event)=>{event.target.querySelector('input').focus()}">
      <div class="node-ip-name" @click.stop>IP</div>
      <input class="node-ip-editing nodrag"
             :style="ipInputStyle"
             v-model="ip"
             @dragstart.prevent @click.stop
             @keyup.enter.esc="(event)=>{event.target.blur()}" @keydown="validateIpInput"/>
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

.node-btn-table, .node-btn-props {
  width: 28px;
  line-height: 0;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.node-btn-table:hover, .node-btn-props:hover {
  opacity: 0.7;
}

.node-btn-table img, .node-btn-props img {
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
</style>