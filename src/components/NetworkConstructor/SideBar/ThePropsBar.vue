<script setup>
import {useVueFlow} from "@vue-flow/core";
import propsParams from '@/assets/json/NetworkLayer/ComponentsProps.json';
import components from '@/assets/json/NetworkLayer/NetworkComponents.json';

defineEmits(["deleteSelectedEdge"]);
defineProps(["objectType"]);
const objectProps = defineModel({type: Object, required: true});

const {findNode} = useVueFlow()
</script>

<template>
  <div class="container">
    <div class="title">Параметры</div>
    <template v-if="objectType === 'node'">
      <template v-for="(prop, key, index) in objectProps" :key="index">
        <div v-if="propsParams[key].type === 'object'" class="object-prop-container">
          <input class="checkbox" type="checkbox" :id="key" :name="key" v-model="prop.enabled"/>
          <label :for="key" />
          <div class="object-prop">
            <div class="object-prop-title prop-title">{{propsParams[key].title}}</div>
            <input class="object-prop-text" type="text" :placeholder="propsParams[key].placeholder" v-model="prop.value"/>
          </div>
        </div>
        <div v-else-if="propsParams[key].type === 'boolean'" class="boolean-prop-container">
          <input class="checkbox" type="checkbox" :id="key" v-model="prop.enabled">
          <label :for="key" />
          <div class="boolean-prop-title prop-title">
            {{propsParams[key].title}}
          </div>
        </div>
      </template>
    </template>
    <template v-else-if="objectType === 'edge'">
      <table class="table">
        <thead :style="{height: 'fit-content'}"><tr :style="{height: 'fit-content'}">
          <th class="col-title type-col">Тип</th>
          <th class="col-title ip-col">IP</th>
        </tr></thead>
        <tbody><tr v-for="(nodeId) in objectProps" :key="nodeId">
          <td class="col type-col">{{components.nodes[findNode(nodeId).type].title}}</td>
          <td class="col ip-col>">{{findNode(nodeId).data.ip}}</td>
        </tr></tbody>
      </table>
      <button class="edge-delete-btn" @click="$emit('deleteSelectedEdge')">
        Удалить соединение
      </button>
    </template>
  </div>
</template>

<style scoped>
.container {
  padding: 4% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}

.title {
  font-size: 1.7vw;
  margin-bottom: 0.5vh;
}

.prop-title, .object-prop, .object-prop-text {
  font-size: 1.2vw;
}

.object-prop-container, .boolean-prop-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  gap: 4%;
}

.object-prop{
  height: 1.6vw;
  padding: 0 2%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 3vh;
  gap: 1.5%;
  overflow: hidden;
}

.object-prop-text {
  text-align: center;
  width: 100%;
}

.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 0;
  width: 0;
  height: 0;
}

.checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.checkbox+label::before {
  content: '';
  display: inline-flex;
  width: 1.2vw;
  height: 1.2vw;
  background: white;
  border: 0.15vw solid #eda1e7;
  border-radius: 100%;
  transition: border, color 0.3s ease-in-out;
  font-size: 1vw;
  text-align: end;
  line-height: 0;
  justify-content: center;
  align-items: center;
  color: #eda1e7;
}

.checkbox:not(:disabled):not(:checked)+label:hover::before {
  border-color: rgba(237, 161, 231, 0.6);
}

.checkbox:checked+label:hover::before {
  color: rgba(237, 161, 231, 0.6);
}

.checkbox:checked+label::before {
  content: '✔';
  color: #eda1e7;
  font-size: 1vw;
  text-align: end;
  line-height: 0;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.7vw;
}

table, th, td {
  border: 1px solid black;
  overflow: hidden;
}

.table {
  width: 90%;
  height: fit-content;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: 4px;
}

.col-title {
  background-color: #edd5ec;
  border-bottom: 2px solid black;
  font-weight: normal;
  font-size: 1vw;
  padding: 2% 0;
}

.col {
  text-align: center;
  font-size: 0.8vw;
  padding: 2% 0;
  background-color: #ffffff;
}

.type-col {
  width: 40%;
}

.edge-delete-btn {
  padding: 2% 4%;
  font-size: 1vw;
  font-family: Montserrat, sans-serif;
  background-color: white;
  border: 0.15vw solid #eda1e7;
  border-radius: 2vh;
  transition: opacity, color 0.3s ease-in-out;
  cursor: pointer;
}

.edge-delete-btn:hover {
  opacity: 80%;
  color: #eda1e7;
}
</style>