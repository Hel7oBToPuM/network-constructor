<script setup>
import {computed, reactive, ref, toRef} from "vue";
import {BaseEdge, getSmoothStepPath, useEdge, EdgeLabelRenderer} from "@vue-flow/core";
import {TransitionPresets, executeTransition} from '@vueuse/core'

const props = defineProps(["id", "sourceX", "sourceY", "targetX", "targetY",
  "sourcePosition", "targetPosition", "style", "events"]);
const emit = defineEmits(["selectSetting"]);

const {edge} = useEdge();

const edgeRef = ref();
const animationPoints = reactive({
  tableToSource: -1,
  tableToTarget: -1,
  packageToSource: -1,
  packageToTarget: -1,
})

edge.style = {strokeWidth: 2}
edge.data = {
  settingMode: "props",
  props: {
    source: edge.source,
    target: edge.target
  },
  animation: {
    tableToSource: false,
    tableToTarget: false,
    packageToSource: false,
    packageToTarget: false,
  }
}
const {data} = edge;

async function runTransition (key) {
  if (key === "tableToSource" || key === "packageToSource")
    await executeTransition(toRef(animationPoints, key), edgeRef.value.pathEl.getTotalLength(), 0, {
      transition: TransitionPresets.easeInOutCubic,
      duration: key === "tableToSource" ? 1000 : 2000
    })
  else
    await executeTransition(toRef(animationPoints, key), 0, edgeRef.value.pathEl.getTotalLength(), {
      transition: TransitionPresets.easeInOutCubic,
      duration: key === "tableToTarget" ? 1000 : 2000
    })
  animationPoints[key] = -1;
  data.animation[key] = false;
}

function runAnimation(key) {
  let point;
  if (data.animation[key] === true && animationPoints[key] === -1)
    runTransition(key);
  if (animationPoints[key] !== -1) {
    point = edgeRef.value.pathEl.getPointAtLength(animationPoints[key]);
    return {transform: `translate(-50%, -50%) translate(${point.x}px, ${point.y}px)`};
  }
}

const path = computed(() => getSmoothStepPath(props));

const edgeStrokeStyle = computed(() => {
  let strokeColor;
  let strokeDasharray = 0;

  if (edge.data.focus)
    strokeColor = "#eda1e7";
  else if (Object.values(data.animation).some(el => el === true)) {
    strokeColor = "#edd5ec";
    strokeDasharray = 15;
  }
  else
    strokeColor = "black";
  return {
    stroke: strokeColor,
    strokeDasharray: strokeDasharray,
    transition: "stroke 0.3s ease-in-out"
  }
})

props.events.click(() => emit("selectSetting", props.id));
</script>

<script>
export default {
  name: 'constructor',
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge :id="id"
            ref="edgeRef"
            class="edge"
            :style="[style, edgeStrokeStyle]"
            :path="path[0]">
  </BaseEdge>
  <template v-for="(value, key, index) in data.animation" :key="index">
    <EdgeLabelRenderer v-if="value">
      <div class="edge-img-container nodrag nopan" :style="runAnimation(key)">
        <img class="edge-img" :class="key"
             :src="key === 'tableToSource' || key === 'tableToTarget' ? '/png/table.png' : '/png/ipPackage.png'"
             alt="Пакет"/>
      </div>
    </EdgeLabelRenderer>
  </template>
</template>

<style scoped>
.edge-img-container {
  position: absolute;
  z-index: 0;
}

.edge-img {
  display: inline-block;
  width: 28px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.packageToTarget, .packageToSource {
  filter: invert(68%) sepia(76%) saturate(3096%) hue-rotate(276deg) brightness(74%) contrast(85%);
  animation: pulse 2s infinite ease-in-out;
}

.tableToTarget, .tableToSource {
  filter: invert(89%) sepia(20%) saturate(201%) hue-rotate(257deg) brightness(98%) contrast(90%);
}
</style>