<script setup lang="ts">
import type {Sector} from './types.ts';

import { ref, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Legend, ArcElement } from 'chart.js';
import ChartModal from './ChartModal.vue';
import Button from 'primevue/button';

ChartJS.register(Title, Legend, ArcElement);

const isModalOpen = ref(false);
const sectors = ref<Sector[]>([
  { label: 'Сектор-1', value: 40, color: '#41B883' },
  { label: 'Сектор-2', value: 20, color: '#E46651' },
  { label: 'Сектор-3', value: 12, color: '#00D8FF' },
]);

const editingSectorIndex = ref<number | null>(null);
const sectorToEdit = computed(() =>
  editingSectorIndex.value !== null ? sectors.value[editingSectorIndex.value] : null
);

const chartData = computed(() => ({
  labels: sectors.value.map(s => s.label),
  datasets: [
    {
      backgroundColor: sectors.value.map(s => s.color),
      data: sectors.value.map(s => s.value),
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 12,
        padding: 20
      }
    }
  }
});

function openAddModal() {
  editingSectorIndex.value = null;
  isModalOpen.value = true;
}

function openEditModal(index: number) {
  editingSectorIndex.value = index;
  isModalOpen.value = true;
}

function handleDelete(index: number) {
  sectors.value.splice(index, 1);
}

function handleSave(sector: Sector) {
  if (editingSectorIndex.value !== null) {
    sectors.value[editingSectorIndex.value] = sector;
  } else {
    sectors.value.push(sector);
  }
  isModalOpen.value = false;
}
</script>

<template>
  <div class="chart-page">
    <h2>Круговая диаграмма</h2>

    <div class="content-wrapper">
      <div class="sectors-list">
        <div v-for="(sector, index) in sectors" :key="index" class="sector-item">
          <div class="sector-info">
            <span class="color-indicator" :style="{ backgroundColor: sector.color }"></span>
            <span class="sector-label">{{ sector.label }}: {{ sector.value }}</span>
          </div>
          <div class="sector-actions">
            <Button label="Edit" size="small" text rounded @click="openEditModal(index)" />
            <Button label="Del" size="small" text rounded severity="danger" @click="handleDelete(index)" />
          </div>
        </div>
        <Button label="Добавить сектор" @click="openAddModal" class="add-btn" />
      </div>

      <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <ChartModal
      :isOpen="isModalOpen"
      :sectorToEdit="sectorToEdit"
      @close="isModalOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<style scoped>
  .chart-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 20px;
  }

  h2 {
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
  }

  .content-wrapper {
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    width: 100%;
    max-width: 900px;
    justify-content: center;
  }

  .sectors-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;
  }

  .sector-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .sector-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .color-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
  }

  .sector-label {
    font-weight: 500;
  }

  .sector-actions {
    display: flex;
    gap: 5px;
  }

  .chart-container {
    flex: 1;
    position: relative;
    height: 400px;
    min-width: 400px;
  }

  .add-btn {
    margin-top: 10px;
    align-self: flex-start;
  }
</style>
