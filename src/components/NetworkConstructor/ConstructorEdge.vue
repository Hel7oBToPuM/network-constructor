<script setup>
import {getSmoothStepPath, SmoothStepEdge, useEdge} from "@vue-flow/core";
import {computed, onUnmounted} from "vue";

const props = defineProps(["id", "sourceX", "sourceY", "targetX", "targetY",
  "sourcePosition", "targetPosition", "markerEnd", "style", "events"]);
const emit = defineEmits(["setting"]);

const {edge} = useEdge();
edge.style = {
  strokeWidth: 2,
  stroke: "black"
}

const path = computed(() => getSmoothStepPath(props));

const edgeStrokeStyle = computed(() => {
  return {
    stroke: edge.data.focus ? "#eda1e7" : "black",
    transition: "stroke 0.3s ease-in-out"
  }
})

props.events.click(()=>{
  emit("setting", {id: props.id, mode: "props"});
})

onUnmounted(() => {
  emit("setting", {id: null, mode: null});
})

// console.log(edge);
</script>

<template>
  <SmoothStepEdge :id="id"
                  :style="[style, edgeStrokeStyle]"
                  :path="path[0]"
                  :marker-end="markerEnd">
  <div></div>
  </SmoothStepEdge>

</template>

<style scoped>
</style>