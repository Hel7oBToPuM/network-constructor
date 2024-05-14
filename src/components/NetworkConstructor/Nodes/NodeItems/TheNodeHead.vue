<script setup>
defineProps(['nodeType'])
defineEmits(['setting'])
</script>

<template>
  <div class="head">
    <img class="node-img" :src="`/png/${nodeType}.png`" alt="Компьютер"/>
    <div class="btn-container">
      <button class="btn-props" title="Параметры"
              @click="$emit('setting', 'props')">
        <img class="btn-img" src="/png/settings.png" alt="Параметры"/>
      </button>
      <button class="btn-table" title="Таблица маршуртизации"
              @click="$emit('setting', 'table')">
        <img class="btn-img" src="/png/table.png" alt="Таблица"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.head {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 14px
}

.node-img {
  width: 120px;
}

.btn-container {
  padding: 14px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.btn-table, .btn-props {
  width: 28px;
  line-height: 0;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
}

.btn-table:hover, .btn-props:hover {
  filter: invert(75%) sepia(54%) saturate(434%) hue-rotate(273deg) brightness(98%) contrast(89%);
}

.btn-img {
  width: 100%;
}
</style>