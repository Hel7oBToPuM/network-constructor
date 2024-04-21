<script setup></script>
<template>
  <RouterLink class="logo" to="/">
    <div>
      <img src="/png/logo.png" />
      <div>Network Constructor</div>
    </div>
  </RouterLink>
</template>
<style scoped>
.logo {
  margin-left: 1.3%;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  font-size: 2vw;
}
.logo div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5vw;
}
.logo img {
  width: 2.2vw;
  height: 2.2vw;
}
.logo:focus {
  outline: 1px dashed rgba(240, 230, 239, 1);
}
</style>
