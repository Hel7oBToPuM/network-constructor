<script setup>
import { Handle } from "@vue-flow/core";
const props = defineProps(["label"]);
</script>

<template>
  <div class="node">
    <Handle type="target" class="handle" />
    <div class="node-head">
      <img class="node-img" src="/png/mobile.png" alt="Телефон" />
    </div>
    <div>{{ label }}</div>
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
}

.handle {
  top: 30px;
}

.node-head {
  display: flex;
  flex-direction: row;
  gap: 14px;
}

.node-img {
  width: 120px;
}
</style>
