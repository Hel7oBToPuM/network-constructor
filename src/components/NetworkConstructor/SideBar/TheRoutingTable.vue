<script setup>
const tableModel = defineModel()
</script>

<template>
  <div class="container">
    <div class="title">Маршрутизация</div>
    <table class="table">
      <thead :style="{height: 'fit-content'}"><tr :style="{height: 'fit-content'}">
        <th class="col-title ip-col">IP</th>
        <th class="col-title gateway-col">Шлюз</th>
        <th class="col-title hops-col">Путь</th>
      </tr></thead>
      <tbody><tr v-for="(route, destination) in tableModel" :key="destination">
        <td class="col ip-col">{{ destination }}</td>
        <td class="col gateway-col">{{ route.gateway }}</td>
        <td class="col hops-col">{{ route.hops }}</td>
      </tr></tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 4% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
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

.hops-col {
  width: 15%;
}
</style>