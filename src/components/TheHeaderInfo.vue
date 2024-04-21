<script setup>
import { computed } from "vue";

defineProps(["show"]);
</script>

<template>
  <div class="animate">
    <button v-if="show === true">
      <img src="/png/info.png" />
    </button>
    <h1 v-else>{{ show }}</h1>
  </div>
</template>

<style scoped>
div {
  display: inline-block;
  margin-right: 1.3%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  line-height: 0;
}
.animate:focus {
  outline: 1px dashed rgba(240, 230, 239, 1);
}
.animate:hover img,
.animate:hover h1 {
  filter: opacity(55%);
  cursor: pointer;
}
img {
  width: 2.2vw;
  height: 2.2vw;
  transition: filter 0.3s ease;
}
button {
  background: transparent;
  border: none;
}
</style>
