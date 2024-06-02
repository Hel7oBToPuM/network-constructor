<script setup>
import { ref } from "vue";
import { VueFlow, useVueFlow, Panel, MarkerType } from "@vue-flow/core";
import { Background } from "@vue-flow/background";

import RouterNode from "@/components/Wifi/Nodes/RouterNode.vue";
import MobileNode from "@/components/Wifi/Nodes/MobileNode.vue";
import NoteNode from "@/components/Wifi/Nodes/NoteNode.vue";
import CustomEdge from "@/components/Wifi/Edges/CustomEdge.vue";
import WifiPopup from "@/components/Wifi/Popups/WifiPopup.vue";

const { onNodeDragStop } = useVueFlow();

const radiusArea = { left: 700, right: 1550, bottom: 555, up: 1325 };

const instance = useVueFlow();

// STEPS
// 0 - Начало
// 1 - Первое Соединение
// 2 - Описывается соединение, после анимашка
// 3 - анимашка
// 4 - ввод пароля
// 5 - конец

let completedZero = false;

const step = ref(0);

const showStep = ref(false);

const disableRadius = ref(true);

const nodes = ref([
  {
    id: "1",
    label: "WPA Роутер",
    type: "router",
    position: { x: 777, y: 555 },
    draggable: false,
    selectable: false,
    data: { step: step, disableRadius: disableRadius },
  },
  {
    id: "2",
    label: "Клиент",
    type: "mobile",
    position: { x: 100, y: 100 },
    connectable: false,
  },
  {
    id: "Password",
    label: "Пароль 123",
    type: "note",
    position: { x: 1400, y: 600 },
    class: "password",
    draggable: false,
    selectable: false,
    connectable: false,
    hidden: true,
  },
]);

const edges = ref([
  {
    id: "e2-1",
    source: "2",
    target: "1",
    type: "custom",
    animated: true,
    hidden: true,
  },
]);

function changeTarget() {
  const edge = { ...edges.value[0] };
  if (edge.source == 1) {
    edge.source = "2";
    edge.target = "1";
  } else {
    edge.source = "1";
    edge.target = "2";
  }
  edges.value = Array(edge);
}

onNodeDragStop(({ node }) => {
  checkRadius(node);
});

function checkRadius(node) {
  let edge = { ...edges.value[0] };
  if (
    node.position.x >= radiusArea.left &&
    node.position.x <= radiusArea.right &&
    node.position.y <= radiusArea.up &&
    node.position.y >= radiusArea.bottom
  ) {
    if (!completedZero) {
      completedZero = true;
      step.value++;
    }
    edge.hidden = false;
    disableRadius.value = false;
  } else {
    edge.hidden = true;
    disableRadius.value = true;
  }
  edges.value = Array(edge);
}

function stepPlus() {
  if (step.value == 5) return;
  step.value++;
  if (step.value == 5) {
    showStep.value = !showStep.value;
    instance.findNode("Password").hidden = true;
  }
  if (step.value == 4) {
    showStep.value = !showStep.value;
    instance.findNode("Password").hidden = false;
    changeTarget();
  }
}

function stepMinus() {
  if (step.value == 0) return;
  step.value--;
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Background />
    <template #node-router="customNodeRouter">
      <RouterNode v-bind="customNodeRouter" />
    </template>
    <template #node-mobile="customNodeMobile">
      <MobileNode v-bind="customNodeMobile" />
    </template>
    <template #node-note="customNote">
      <NoteNode v-bind="customNote" />
    </template>
    <template #edge-custom="customEdgeProps">
      <CustomEdge
        v-bind="customEdgeProps"
        :step="step"
        @show-step="showStep = !showStep"
        @next-step="stepPlus"
        @next-progress="changeTarget()"
      />
    </template>
    <Panel class="process-panel" position="top-left">
      <div class="layout-panel">
        <WifiPopup
          :step="step"
          :active="showStep"
          @step-plus="stepPlus"
          @step-minus="stepMinus"
          @active-cancel="
            showStep = !showStep;
            hidedPass = false;
          "
        />
        <a href="#" @click="showStep = !showStep" class="step">
          Шаг: {{ step }}/5
          <img src="/png/details.png" alt="" width="20" />
        </a>
      </div>
    </Panel>
  </VueFlow>
</template>

<style scoped>
.layout-flow {
  background-color: #170ec7;
  height: 100%;
  width: 100%;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.layout-panel > * {
  display: flex;
  align-items: center;
}

.process-panel {
  background-color: rgba(242, 194, 237, 1);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}

.MobilaToRouter {
  stroke: aqua;
}

.RouterToMobila {
  stroke: red;
}

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
}
</style>
