<script setup>
defineProps({
  "imgSrc": {},
  "status": {},
})

</script>

<template>
<div class="node-status" v-show="status">
  <img v-show="imgSrc" :src="imgSrc" alt="Статус"/>
  <div>{{status}}</div>
</div>
</template>

<style scoped>

</style>