<script setup>
import Logo from "./Header/TheLogo.vue";
import Info from "./Header/TheInfo.vue";
</script>

<template>
  <header>
    <Logo></Logo>
    <Info :show="true"></Info>
  </header>
</template>

<style scoped>
header {
  height: 12%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
      90deg,
      rgba(242, 194, 237, 1) 0%,
      rgba(238, 225, 237, 1) 100%
  );
}
</style>
