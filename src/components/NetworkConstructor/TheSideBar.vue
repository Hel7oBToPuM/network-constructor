<script setup>
import components from '@/assets/json/NetworkComponents.json';
function handleDragStart(event, nodeType) {
  event.dataTransfer.setData("node", nodeType);
  event.dataTransfer.effectAllowed = 'copy'
}
</script>

<template>
<div class="side-bar">
  <div class="choose-bar">
    <div class="component" :draggable="true"  v-for="(component, index) in components"
         :key="index"
         @dragstart="handleDragStart($event, component.type)">
      <img class="component-img" :draggable="false" :src="component.img" :alt="component.title"/>
      {{component.title}}
    </div>
  </div>
  <div class="settings-bar">

  </div>
</div>
</template>

<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background: #F4F3F4;
}

.choose-bar, .settings-bar {
  width: 100%;
}

.choose-bar {
  height: fit-content;
}

.choose-bar{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 6% 0;
  border-bottom: 0.3vh solid #D9D9D9;
}

.component {
  width: 35%;
  height: fit-content;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4%;
  font-size: 1.2vw;
  background: white;
  border-radius: 0.6vw;
}

.component-img {
  width: 100%;
}


</style>