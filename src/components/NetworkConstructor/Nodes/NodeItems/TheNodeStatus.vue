<script setup>
import {nodeStatuses} from "@/components/NetworkConstructor/Nodes/NodeUtils.js";

const props = defineProps(["status"])
</script>

<template>
  <template v-for="(value, key, index) in status" :key="index">
    <div class="node-status-container" :class="[key]" v-show="status[key].enabled">
      <img class="node-status-img" :src="nodeStatuses[key]?.img" alt="Процесс"/>
      <div class="node-status-text">{{ nodeStatuses[key]?.text }}</div>
      <button class="node-status-details-btn">
        <img class="node-status-details-img" src="/png/details.png" alt="Детали"/>
      </button>
    </div>
  </template>
</template>

<style scoped>
.requestRoutingTable {
  top: -42px;
}

.packageDelivery, .successfulDelivery {
  bottom: -42px;
}

.node-status-container {
  position: absolute;
  height: 28px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  background-color: rgba(244, 243, 244, 0.8);
  border-radius: 14px;
  overflow: hidden;
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