<script setup>
import {ref} from "vue";

defineProps(['disabled']);
defineEmits(["sendPackage"]);

const sendIp = ref("");
const inputRef = ref();
const btnRef = ref();

const validateIpInput = (event) => {
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter'];

  if (event.clipboardData) {
    const paste = event.clipboardData.getData('text');
    if (sendIp.value.length + paste.length >= 16)
      event.preventDefault();
    return;
  }

  if (controlKeys.includes(event.key) || ((event.ctrlKey || event.metaKey)  && (event.key === 'c' || event.key === 'v')))
    return;

  if (!controlKeys.includes(event.key) && event.key !== '.' && isNaN(parseInt(event.key, 10)) ||
      event.key === '.' && event.target.textContent.split('.').length > 3 ||
      event.target.textContent.split('.').join('').length > 11 && !controlKeys.includes(event.key) && event.key !== '.') {
    event.preventDefault();
  }
};
</script>

<template>
  <div class="sender-container">
    <input class="ip-input nodrag" placeholder="ПОЛУЧАТЕЛЬ"
           ref="inputRef" @dragstart.prevent
           :disabled="disabled"
           @keyup.enter.esc="$event.target.blur()" @keydown="validateIpInput"
           @paste="validateIpInput"
           v-model="sendIp"/>
    <button class="send-btn"
            ref="btnRef"
            :title="disabled ? 'Пакет отправлен . . .' : 'Отправить пакет'"
            :disabled="disabled"
            @click.stop="() => {if (!disabled) $emit('sendPackage', sendIp)}">
      <img src="/png/play.png" alt="Отправить"/>
    </button>
  </div>
</template>

<style scoped>
.sender-container {
  width: 100%;
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
}

.ip-input {
  width: 134px;
  font-size: 16px;
  text-align: center;
  border-radius: 14px;
}

.ip-input:disabled {
  color: #B354A8;
  background-color: white;
}

.send-btn {
  width: 28px;
  line-height: 0;
  cursor: pointer;
  transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.send-btn:hover {
  filter: invert(75%) sepia(54%) saturate(434%) hue-rotate(273deg) brightness(98%) contrast(89%);
}

.send-btn:disabled, .send-btn:disabled:hover {
  opacity: 0.5;
  filter: none;
}

.send-btn img {
  width: 100%;
}
</style>