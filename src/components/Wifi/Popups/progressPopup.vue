<script setup>
import { ref } from "vue";

const emit = defineEmits(["progressExit", "progressPlus"]);
defineProps(["step"]);

const stepProgress = ref(0);

const popupActive = ref(false);

const dataProgress = [
  {
    label: "ANonce",
    title: "ANonce (1 сообщение)",
    info: "PA (роутер) отправляет временное значение nonce-value (ANonce) в STA вместе со счетчиком воспроизведения ключей, который является числом, используемым для сопоставления каждой паре отправленных сообщений и отбрасывания повторных сообщений. STA (клиент) теперь имеет все атрибуты для создания PTK.",
  },
  {
    label: "SNonce + MIC",
    title: "SNonce + MIC (2 сообщение)",
    info: "STA (клиент) отправляет свое собственное временное значение (SNonce) на AP вместе с кодом целостности сообщения (MIC), включая аутентификацию, которая на самом деле является кодом аутентификации целостности сообщения (MAIC), и счетчиком воспроизведения ключа, который будет таким же, как Сообщение 1, чтобы позволить AP (роутер) соответствовать правильному Сообщению 1.",
  },
  {
    label: "GTK + MIC",
    title: "GTK + MIC (3 сообщение)",
    info: "AP (роутер) проверяет Сообщение 2, проверяя MIC, RSN, ANonce и поле счетчика воспроизведения ключей, и, если оно является действительным, создает и отправляет GTK с другим MIC.",
  },
  {
    label: "Ack",
    title: "Ack (4 сообщение)",
    info: "STA (клиент) проверяет Сообщение 3, проверяя MIC и поле счетчика воспроизведения ключей, и, если оно действительно, отправляет подтверждение AP (роутер).",
  },
];

function stepProgressPlus() {
  stepProgress.value++;
  emit("progressPlus");
}
</script>

<template>
  <div class="progress">
    <!-- prettier-ignore -->
    <button v-if="stepProgress == 3" class="btn-progress" @click="$emit('progressExit')">{{ dataProgress[stepProgress].label }}</button>
    <!-- prettier-ignore -->
    <button class="btn-progress" v-else @click="stepProgressPlus()">{{ dataProgress[stepProgress].label }}</button>
    <button class="btn-progress" @click="popupActive = true">
      <img src="/png/details.png" alt="help" class="btn-img" />
    </button>
  </div>
  <Teleport to="body">
    <Transition name="progressPopup">
      <div
        v-show="popupActive"
        class="progressPopup-bg"
        @click="popupActive = false"
      >
        <div class="progressPopup" @click.stop>
          <p class="progressPopup-title">
            {{ dataProgress[stepProgress].title }}
          </p>
          <div class="progressPopup-description">
            {{ dataProgress[stepProgress].info }}
          </div>
          <div class="progressPopup-img-container">
            <img
              v-if="dataProgress[stepProgress].imgSrc"
              :src="dataProgress[stepProgress].imgSrc"
              alt="фото Прогресса"
            />
            <!-- prettier-ignore -->
            <button v-if="stepProgress == 3" class="btn" @click="$emit('progressExit')">Завершить рукопожатие</button>
            <!-- prettier-ignore -->
            <button v-else class="btn" @click="popupActive = false; stepProgressPlus()">Следующий этап</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.progressPopup-img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 10px;
  border: 1px solid;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
  width: 150px;
}

.btn-progress:hover,
.btn:hover {
  filter: opacity(55%);
  cursor: pointer;
}

.progress {
  display: flex;
  gap: 10px;
}

.btn-img {
  width: 15px;
  height: 15px;
}

img {
  width: 2.2vw;
  height: 2.2vw;
}
h1 {
  line-height: 1;
}
.progressPopup-enter-from,
.progressPopup-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.progressPopup-enter-active {
  transition: background-color 1s ease-in-out;
}
.progressPopup-leave-active {
  transition: background-color 0.1s ease-in-out;
}

.progressPopup-bg {
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

.progressPopup {
  margin-top: 12vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  border-radius: 2%;
  opacity: 1;
}

.progressPopup-enter-from .progressPopup,
.progressPopup-leave-to .progressPopup {
  opacity: 0;
}
.progressPopup-enter-active .progressPopup {
  transition: opacity 0.3s ease-in-out;
}
.progressPopup-leave-active .progressPopup {
  transition: opacity 0.1s ease-in-out;
}

.progressPopup-title {
  padding-top: 4%;
  text-align: center;
  font-size: 1.7vw;
}

.progressPopup-description {
  font-size: 1.2vw;
  line-height: 1.215;
  text-align: justify;
  padding: 6%;
}

.progressPopup-img-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 6%;
}

.progressPopup-img-container > img {
  width: 100%;
  height: 100%;
}
</style>
