<script setup>
import {nodeStatuses} from "@/components/NetworkConstructor/Nodes/NodeUtils.js";

const props = defineProps(["status"])
</script>

<template>
  <template v-for="(value, key, index) in status" :key="index">
    <div class="node-status-container"
         :style="(() => {
            if (key === 'requestRoutingTable') return {top: value.enabled ? '-42px' : 0}
            else return {bottom: value.enabled ? '-42px' : 0}
         })()"
         :class="[key]">
      <img class="node-status-img" :src="nodeStatuses[key]?.img" alt="Процесс"/>
      <div class="node-status-text">{{ nodeStatuses[key]?.text }}</div>
      <button class="node-status-details-btn">
        <img class="node-status-details-img" src="/png/details.png" alt="Детали"/>
      </button>
    </div>
  </template>
</template>

<style scoped>
.node-status-container {
  position: absolute;
  z-index: -1;
  height: 28px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  background-color: rgba(244, 243, 244, 0.8);
  border-radius: 14px;
  overflow: hidden;
  transition: bottom 0.3s ease-in-out, top 0.3s ease-in-out;
}

.node-status-img, .node-status-details-img:hover {
  height: 18px;
  filter: invert(75%) sepia(54%) saturate(434%) hue-rotate(273deg) brightness(98%) contrast(89%);
}

.node-status-details-img {
  height: 18px;
  transition: filter 0.3s ease-in-out;
}

.node-status-text {
  font-size: 16px;
  text-align: center;
}

.node-status-details-btn {
  line-height: 0;
  cursor: pointer;
}
</style>