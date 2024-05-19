<script setup></script>

<template>
  <main>
    <img class="nyan" src="/gif/nyanCat.gif" alt="Нян-кэт"/>
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
    </div>
    <img class="nyan-reverse" src="/gif/nyanCat.gif" alt="Нян-кэт"/>
  </main>
</template>

<style scoped>
main {
  height: calc(100% - 12%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 9%
}

div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 20vw;
  height: 20vw;
}

.nyan-reverse {
  transform: scale(-1, 1);
}

h1 {
  font-size: 10vw;
}

p {
  font-size: 2vw;
  text-transform: uppercase;
}
</style>
