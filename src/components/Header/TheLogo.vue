<script setup></script>

<template>
  <RouterLink class="logo" to="/">
    <img src="/png/logo.png" alt="Логотип" @dragstart.prevent/>
    <div>Network Constructor</div>
  </RouterLink>
</template>

<style scoped>
.logo {
  margin-left: 1.3%;
  display: flex;
  gap: 0.5vw;
  justify-content: space-between;
  align-items: center;
  font-size: 2vw;
  text-decoration: none;
  color: inherit;
}

.logo img {
  width: 2.2vw;
  height: 2.2vw;
}

.logo:focus {
  outline: none;
}
</style>
