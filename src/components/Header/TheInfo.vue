<script setup>
import {ref} from "vue";

defineProps(["show"]);

const infoClicked = ref(false)
</script>

<template>
  <button v-if="show === true" class="info" @click="infoClicked = !infoClicked">
    <img src="/png/info.png" alt="Информация" @dragstart.prevent />
  </button>
  <h1 class="info" v-else>{{ show }}</h1>
  <Teleport to="body">
    <Transition name="popup">
      <div v-show="infoClicked" class="popup-bg" @click="infoClicked = false">
        <div class="popup" @click.stop>
          <p class="popup-title">Информация</p>
          <div class="popup-description">Веб-приложение разработано для дисциплины "Сети и телекомуникации ЭВМ" на кафедры 316 МАИ бывшим студентом этой кафедры под псевдонимом Pumblu. Цель приложения – дать студентам возможность лучше освоить данную дисциплину.</div>
          <div class="popup-btn-container">
            <a class="href-github" href="https://github.com/Hel7oBToPuM">
              <img src="/svg/Github.svg" alt="Гитхаб"/>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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

img {
  width: 2.2vw;
  height: 2.2vw;
}

h1 {
  line-height: 1;
}

.popup-bg {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.popup-enter-from, .popup-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.popup-enter-active {
  transition: background-color 1s ease-in-out;
}
.popup-leave-active {
  transition: background-color 0.1s ease-in-out;
}

.popup {
  margin-top: 12vh;
  width: 23%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  border-radius: 2%;
  opacity: 1;
}

.popup-enter-from .popup, .popup-leave-to .popup{
  opacity: 0;
}
.popup-enter-active .popup{
  transition: opacity 0.3s ease-in-out;
}
.popup-leave-active .popup{
  transition: opacity 0.1s ease-in-out;
}

.popup-title {
  padding-top: 4%;
  text-align: center;
  font-size: 1.7vw;
}

.popup-description {
  font-size: 1.2vw;
  line-height: 1.215;
  text-align: justify;
  padding: 6%;
}

.popup-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: 6%;
}

.href-github {
  transition: opacity 0.3s ease-in-out;
}

.href-github:hover {
  opacity: 0.8;
}
</style>
