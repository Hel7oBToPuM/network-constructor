<script setup>
const validateIpInput = (event) => {
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Escape', 'Enter']
  if (!controlKeys.includes(event.key) && event.key !== '.' && isNaN(parseInt(event.key, 10)) ||
      event.key === '.' && event.target.textContent.split('.').length > 3 ||
      event.target.textContent.split('.').join('').length > 11 && !controlKeys.includes(event.key) && event.key !== '.') {
    event.preventDefault();
  }
};
</script>

<template>
  <div class="sender-container">
    <input class="ip nodrag"
           placeholder="ПОЛУЧАТЕЛЬ"
           @dragstart.prevent
           @keyup.enter.esc="$event.target.blur()"
           @keydown="validateIpInput"/>
    <button class="send-btn" title="Отправить пакет">
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

.ip {
  width: 134px;
  font-size: 16px;
  text-align: center;
  border-radius: 14px;
}

.send-btn {
  width: 28px;
  line-height: 0;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
}

.send-btn:hover {
  filter: invert(75%) sepia(54%) saturate(434%) hue-rotate(273deg) brightness(98%) contrast(89%);
}

.send-btn img {
  width: 100%;
}
</style>