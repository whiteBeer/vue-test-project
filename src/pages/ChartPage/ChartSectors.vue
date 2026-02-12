<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import type { Sector } from './types';

const props = defineProps<{
  sectors: Sector[]
}>();

const emit = defineEmits<{
  (e: 'edit', index: number): void;
  (e: 'delete', index: number): void;
  (e: 'add'): void;
}>();

const totalValue = computed(() => props.sectors.reduce((acc, cur) => acc + cur.value, 0));

const sectorsWithPercent = computed(() => {
  return props.sectors.map(sector => ({
    ...sector,
    percent: totalValue.value > 0 ? Math.round((sector.value / totalValue.value) * 100) : 0
  }));
});
</script>

<template>
  <div class="sectors-list">
    <div v-for="(sector, index) in sectorsWithPercent" :key="index" class="sector-item">
      <div class="sector-info">
        <span class="sector-label" :title="sector.label">{{ sector.label }}</span>
        <span class="sector-percent"> {{ sector.percent }}%</span>
        <span class="color-indicator" :style="{ backgroundColor: sector.color }"></span>
      </div>
      <div class="sector-actions">
        <Button text rounded @click="emit('edit', index)">
          <img src="/img/Edit.svg" alt="Edit" />
        </Button>
        <Button text rounded severity="danger" @click="emit('delete', index)">
          <img src="/img/Trash.svg" alt="Delete" />
        </Button>
      </div>
    </div>
    <Button label="Добавить сектор" @click="emit('add')" class="add-btn" />
  </div>
</template>

<style scoped>
  .sectors-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;
    font-size: 16px;
    font-weight: 400;
  }

  .sector-item {
    color: #252F4A;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: rgba(219, 223, 233, 0.2);
  }

  .sector-info {
    display: flex;
    align-items: center;
  }

  .sector-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    min-width: 150px;
  }

  .sector-label, .sector-percent {
    padding: 0 20px;
    border-right: 2px solid #DBDFE9;
  }

  .color-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 20px;
  }

  .sector-actions {
    display: flex;
    gap: 15px;
  }

  .sector-actions .p-button {
    padding: 0 5px;
  }

  .add-btn {
    margin-top: 10px;
    width: 100%;
    font-size: 16px;
    align-self: flex-start;
    height: 60px;
  }
</style>
