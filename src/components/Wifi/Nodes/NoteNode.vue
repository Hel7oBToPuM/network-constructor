<script setup>
defineProps(["label"]);
</script>

<template>
  <div class="node">
    {{ label }}
  </div>
</template>

<style scoped>
.node {
  height: fit-content;
  padding: 30px;
  background-color: #fbbc04;
}
</style>
