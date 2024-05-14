<script setup>
import {computed} from "vue";
import {getSmoothStepPath, SmoothStepEdge, useEdge} from "@vue-flow/core";

const props = defineProps(["id", "sourceX", "sourceY", "targetX", "targetY",
  "sourcePosition", "targetPosition", "markerEnd", "style", "events"]);
const emit = defineEmits(["selectSetting"]);


const {edge} = useEdge();
edge.style = {strokeWidth: 2, stroke: "black"}
edge.data = {settingMode: "props", props: {source: edge.sourceNode.id, target: edge.targetNode.id}}

const path = computed(() => getSmoothStepPath(props));

const edgeStrokeStyle = computed(() => {
  return {
    stroke: edge.data.focus ? "#eda1e7" : "black",
    transition: "stroke 0.3s ease-in-out"
  }
})

props.events.click(() => emit("selectSetting", props.id));
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