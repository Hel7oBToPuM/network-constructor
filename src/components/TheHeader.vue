<script setup>
import TheLogo from "./TheLogo.vue";
import TheHeaderInfo from "./TheHeaderInfo.vue";
</script>
<template>
  <header>
    <TheLogo></TheLogo>
    <TheHeaderInfo :show="true"></TheHeaderInfo>
  </header>
</template>
<style scoped>
header {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(242, 194, 237, 0.8) 0%,
    rgba(238, 225, 237, 0.8) 100%
  );
}
</style>
