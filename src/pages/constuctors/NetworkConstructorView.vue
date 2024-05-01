<script setup>
import {VueFlow, useVueFlow} from "@vue-flow/core";

import SideBar from "@/components/NetworkConstructor/TheSideBar.vue";
import BackgroundZone from "@/components/NetworkConstructor/TheBackgroundZone.vue";

const { addNodes, screenToFlowCoordinate } = useVueFlow()

function onDrop (event) {
  const position = screenToFlowCoordinate({
    x: event.clientX,
    y: event.clientY,
  })
  console.log(position)
}
</script>

<template>
  <main>
    <div class="drag-and-drop" @drop="onDrop">
      <VueFlow @dragover.prevent="(event) => {if (event.dataTransfer) {event.dataTransfer.dropEffect = 'copy'}}">
        <BackgroundZone/>
      </VueFlow>
    </div>
    <SideBar></SideBar>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 12vh)
}

.drag-and-drop {
  height: 100%;
  width: 100%;
}

</style>