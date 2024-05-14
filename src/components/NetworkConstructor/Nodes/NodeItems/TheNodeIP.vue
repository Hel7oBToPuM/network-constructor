<script setup>
import {ref} from "vue";

defineProps(["ip"])
defineEmits(["update:ip"]);

const editable = ref(null);

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
  <div class="ip nodrag" @click.stop="editable.focus()">
    <div class="title" @click.stop="editable.focus()">
      IP
    </div>
    <div
        class="editable"
        contenteditable="true"
        ref="editable"
        @dragstart.prevent @click.stop
        @keyup.enter.esc="editable.blur()" @keydown="validateIpInput"
        @input="$emit('update:ip',editable.textContent)">
      {{ ip }}
    </div>
  </div>
</template>

<style scoped>
.ip {
  height: 28px;
  padding: 0 14px;
  display: flex;
  flex-direction: row;
  gap: 7px;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 14px;
  cursor: text;
}

.title, .editable {
  font-size: 16px;
}

.editable {
  outline: none;
  min-width: 7px;
  text-align: center;
}
</style>