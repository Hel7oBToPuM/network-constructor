<script setup>
import { ref } from "vue";

defineProps(["reverse", "active", "step"]);

const emit = defineEmits(["StepMinus", "StepPlus", "activeCancel"]);

const PageSteps = ref([
  {
    title: "Что делать",
    description: "Перенесите Клиент в радиус роутера, после законектись к нему",
  },
  {
    title: "Как происходит коннект",
    description:
      "Клиент WiFi входит в радиус роутера завершает сканирование и инициирует точку доступа WiFi выделить и занять ресурсы для данной новой сессии и синхронизироваться с радиокартой устройства пользователя.",
    imgSrc: "/png/802frameType.png",
  },
  {
    title: "Как только соединился",
    description:
      "Происходит 4-этапное рукопожатие - Процесс включает в себя обмен четырьмя сообщениями (пакетами) между клиентом и точкой доступа, чтобы подтвердить, что обе стороны знают пароль сети, и установить ключи шифрования для защиты данных, передаваемых в беспроводной сети В первом сообщении роутер отправляет клиенту случайное число. Во втором сообщении клиент отправляет роутер своё случайное число и созданные ключи. В третьем сообщении роутер подтверждает создание ключей. В четвёртом сообщении клиент подтверждает роутер успешное установление ключей для шифрования трафика",
  },
  {
    title: "Общая Сводка",
    imgSrc: "/png/4_way_handshake.png",
  },
  {
    title: "Ввод пароля (PSK)",
    description:
      "предварительный общий ключ (PSK) - обычно это пароль, который пользователь вводит при подключении.",
  },
  {
    title: "Вы законнектились",
    description: "Поздравляю",
  },
]);

const popupActive = ref(false);

const reloadPage = () => {
  window.location.reload();
};
</script>

<template>
  <div class="btns">
    <!-- Левая кнопка -->
    <!-- prettier-ignore -->
    <button title="Remote step" class="btn" @click="popupActive = !popupActive; $emit('StepMinus');">
      <!-- prettier-ignore -->
      <img class="btn-img" src="/png/left_arrow.png" alt="<-" width="20" @dragstart.prevent />
    </button>
    <!-- Правая кнопка -->
    <!-- prettier-ignore -->
    <button title="Next step" class="btn" @click="popupActive = !popupActive; $emit('StepPlus');">
      <!-- prettier-ignore -->
      <img class="btn-img reverse" src="/png/left_arrow.png" alt="->" width="20"/>
    </button>
  </div>

  <Teleport to="body">
    <Transition name="popupWifi">
      <div
        v-show="popupActive || active"
        class="popupWifi-bg"
        @click="
          popupActive = false;
          $emit('activeCancel');
        "
      >
        <div class="popupWifi" @click.stop>
          <p class="popupWifi-title">{{ PageSteps[step].title }}</p>
          <div v-if="PageSteps[step].description" class="popupWifi-description">
            {{ PageSteps[step].description }}
          </div>
          <div class="popupWifi-img-container">
            <img
              v-if="PageSteps[step].imgSrc"
              :src="PageSteps[step].imgSrc"
              alt="Фото"
            />
            <!-- prettier-ignore -->
            <button v-if="step == 1" class="btn-popup" @click="$emit('StepPlus')">Следующий этап</button>
            <!-- prettier-ignore -->
            <button v-if="step == 5" class="btn-popup" @click="reloadPage">Начать заново?</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.reverse {
  transform: scale(-1, 1);
}

.btns {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-popup {
  padding: 10px;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
  width: 150px;
}

.btn-img {
  width: 30px;
  height: 30px;
}

.btn:hover,
.btn-popup:hover {
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

.popupWifi-bg {
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

.popupWifi-enter-from,
.popupWifi-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.popupWifi-enter-active {
  transition: background-color 1s ease-in-out;
}
.popupWifi-leave-active {
  transition: background-color 0.1s ease-in-out;
}

.popupWifi {
  width: 40%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  border-radius: 2%;
  opacity: 1;
  padding: 30px;
}

.popupWifi-enter-from .popupWifi,
.popupWifi-leave-to .popupWifi {
  opacity: 0;
}
.popupWifi-enter-active .popupWifi {
  transition: opacity 0.3s ease-in-out;
}
.popupWifi-leave-active .popupWifi {
  transition: opacity 0.1s ease-in-out;
}

.popupWifi-title {
  padding-top: 4%;
  text-align: center;
  font-size: 1.7vw;
}

.popupWifi-description {
  font-size: 1.2vw;
  line-height: 1.215;
  text-align: justify;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6%;
}

.popupWifi-img-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 30px;
  align-items: center;
  padding-bottom: 6%;
}

.popupWifi-img-container > img {
  width: 100%;
  height: 100%;
}
</style>
