<script setup>
defineProps(["show"]);
</script>

<template>
  <button class="info" v-if="show === true">
    <img src="/png/info.png" alt="Информация"/>
  </button>
  <h1 class="info" v-else>{{ show }}</h1>
</template>

<style scoped>
.info {
  margin-right: 1.3%;
  display: inline-block;
  cursor: pointer;
  line-height: 0;
  transition: filter 0.3s ease;
}
.info:focus {
  outline: none;
}
.info:hover {
  filter: opacity(55%);
  cursor: pointer;
}

h1 {
  line-height: 1;
}

img {
  width: 2.2vw;
  height: 2.2vw;
}
</style>
