<script setup>
import { Handle } from "@vue-flow/core";
import { computed } from "vue";

const props = defineProps(["label", "data"]);

const stepsRadius = computed(() => {
  return {
    connected: props.data.step == 5,
    disconnected: props.data.disableRadius && props.data.step >= 2,
    not_connected: props.data.disableRadius && props.data.step < 2,
    in_radius: !props.data.disableRadius,
  };
});
</script>

<template>
  <div class="radius" :class="stepsRadius">
    <div class="node">
      <Handle class="handle" />
      <div class="node-head">
        <img class="node-img" src="/png/router.png" alt="Роутер" />
      </div>
      <div>{{ label }}</div>
    </div>
  </div>
</template>

<style scoped>
.radius {
  border-radius: 100px;
  height: 900px;
  width: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.disconnected {
  background-color: hsla(0, 66%, 53%, 0.3);
}

.not_connected {
  background-color: hsla(120, 2%, 23%, 0.123);
}

.in_radius {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    background-color: rgba(238, 225, 237, 0.4);
  }
  50% {
    background-color: hsla(120, 2%, 23%, 0.123);
  }
  100% {
    background-color: rgba(238, 225, 237, 0.4);
  }
}

.connected {
  background-color: rgba(238, 225, 237, 0.5);
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
  border-radius: 14px;
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
