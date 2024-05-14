<script setup>
import {isNode, useVueFlow} from "@vue-flow/core";
import {reactive, watch} from "vue";

import RoutingTable from "@/components/NetworkConstructor/SideBar/TheRoutingTable.vue";
import PropsBar from "@/components/NetworkConstructor/SideBar/ThePropsBar.vue";

import components from '@/assets/json/NetworkLayer/NetworkComponents.json';

const props = defineProps({
  curObjId: {
    type: String,
    required: true,
    default: null
  }}
);

const {findNode, findEdge, removeEdges} = useVueFlow();

const currentObject = reactive({
  data: {},
  type: "",
});

watch(() => props.curObjId, (newId) => {
  const obj = findNode(newId) || findEdge(newId);
  if (obj) {
    currentObject.data = obj.data;
    currentObject.type = isNode(obj) ? "node" : "edge"
  }
});
</script>

<template>
  <div class="side-bar">
    <div class="choose-bar">
      <div v-for="(props, key, index) in components.nodes"
           class="component"
           :draggable="true"
           :key="index"
           @dragstart="$event.dataTransfer.setData('node', key)">
        <img class="component-img" :draggable="false" :src="props.img" :alt="props.title"/>
        {{ props.title }}
      </div>
    </div>
    <div v-if="curObjId" class="settings-bar">
      <PropsBar
          v-if="currentObject.data.settingMode === 'props'"
          :objectType="currentObject.type"
          v-model="currentObject.data.props" @deleteSelectedEdge="removeEdges(curObjId)"/>
      <RoutingTable v-else-if="currentObject.data.settingMode === 'table'"
                    v-model="currentObject.data.table"/>
    </div>
  </div>
</template>

<style scoped>
.side-bar {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F4F3F4;
}

.choose-bar, .settings-bar {
  width: 100%;
}

.choose-bar {
  height: fit-content;
}

.choose-bar {
  padding: 6% 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-bottom: 0.3vh solid #D9D9D9;
}

.component {
  width: 35%;
  height: 90%;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2vw;
  background: white;
  border-radius: 0.6vw;
  cursor: grab;
}

.component-img {
  width: 100%;
}
</style>