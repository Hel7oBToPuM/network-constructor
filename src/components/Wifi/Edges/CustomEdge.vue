<script setup>
import progressPopup from "@/components/Wifi/Popups/progressPopup.vue";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  MarkerType,
} from "@vue-flow/core";
import { computed, ref } from "vue";

const emit = defineEmits(["showStep", "nextStep", "nextProgress"]);

const props = defineProps([
  "sourceX",
  "sourceY",
  "targetX",
  "targetY",
  "sourcePosition",
  "targetPosition",
  "step",
]);

const path = computed(() => getBezierPath(props));

const inputPass = ref("");

const progressStep = ref(0);

const progress = ref(false);

function checkPass() {
  if (inputPass.value != 123) {
    return;
  }
  emit("nextStep");
}

function stepProgressPlus() {
  progress.value = true;
  progressStep.value++;
  emit("nextProgress");
}
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <!-- Мобила к роутеру -->
  <BaseEdge
    v-if="progressStep == 2 || progressStep == 4"
    :style="{ stroke: 'blue' }"
    :path="path[0]"
    :marker-start="MarkerType.Arrow"
  />
  <!-- Роутер к мобиле -->
  <BaseEdge
    v-else-if="progressStep == 1 || progressStep == 3"
    :style="{ stroke: 'red' }"
    :path="path[0]"
    :marker-start="MarkerType.Arrow"
    :marker-end="MarkerType.ArrowClosed"
  />
  <BaseEdge v-else :path="path[0]" />
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <!-- prettier-ignore -->
      <button v-if="step == 1" class="edge-button" @click="$emit('showStep')">Подключится</button>
      <!-- prettier-ignore -->
      <button v-else-if="step == 2" class="edge-button" @click="$emit('nextStep'); progressStep++; $emit('nextProgress')">Начать рукопожатие</button>
      <progressPopup
        v-else-if="step == 3"
        :step="step"
        @progress-exit="
          $emit('nextStep');
          stepProgressPlus();
        "
        @progress-plus="stepProgressPlus()"
      />
      <div v-else-if="step == 4" class="inputDiv">
        <input
          class="inputPass"
          v-model="inputPass"
          type="text"
          placeholder="Пароль"
        />
        <button class="btn" @click="checkPass()">
          <img src="/png/play.png" alt="да" width="15" />
        </button>
      </div>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.reverse {
  transform: scale(-1, 1);
}

.edge-button:hover {
  cursor: pointer;
  filter: opacity(55%);
}

.vue-flow__edge-path.MobilaToRouter {
  stroke: aqua;
}

.vue-flow__edge-path.RouterToMobila {
  stroke: red;
}

.inputDiv {
  display: flex;
  gap: 5px;
}

.inputPass {
  border: 1px solid;
  border-radius: 10px;
  font-size: small;
  padding-left: 10px;
  width: 80px;
}

.btn:hover {
  filter: opacity(55%);
  cursor: pointer;
}
</style>
