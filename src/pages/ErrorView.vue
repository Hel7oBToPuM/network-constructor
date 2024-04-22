<script setup>
setTimeout(() => {
  window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=guRIpafTke4NckY9&t=6";
}, 6000);
</script>

<template>
  <div class="center">
    <div class="group">
      <h1>404</h1>
      <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
    </div>
    <img class="nyan" src="/gif/nyanCat.gif" />
    <img class="nyan-reverse" src="/gif/nyanCat.gif" />
    <div class="gif">
      <img src="/gif/countDown.gif" />
      <div class="black"></div>
    </div>
  </div>
</template>

<style scoped>
.center {
  gap: 4vw;
  width: 100vw;
  height: calc(100vh - 12vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}
[class^="nyan"] {
  position: absolute;
  width: 20vw;
  height: 20vw;
}
.nyan {
  left: 10vw;
}
.nyan-reverse {
  right: 10vw;
  transform: scale(-1, 1);
}
.gif {
  position: absolute;
  display: flex;
  bottom: 1vw;
}
.black {
  z-index: -1;
  position: absolute;
  left: 1vw;
  top: 1vw;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background-color: black;
}
img {
  width: 7vw;
  height: 7vw;
}
h1 {
  display: flex;
  justify-content: baseline;
  gap: 10px;
  font-size: 10vw;
}
h2 {
  font-size: 2vw;
  font-weight: 400;
}
</style>
