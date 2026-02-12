<script setup lang="ts">
import type {Sector} from './types.ts';

import { ref, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Legend, ArcElement } from 'chart.js';
import ChartModal from './ChartModal.vue';
import ChartSectors from './ChartSectors.vue';

ChartJS.register(Title, Legend, ArcElement);

const isModalOpen = ref(false);
const sectors = ref<Sector[]>([
  { label: 'Сектор-1-Сектор-1-Сектор', value: 40, color: '#41B883' },
  { label: 'Сектор-2', value: 20, color: '#E46651' },
  { label: 'Сектор-3', value: 12, color: '#00D8FF' },
]);

const editingSectorIndex = ref<number | null>(null);
const sectorToEdit = computed(() =>
  editingSectorIndex.value !== null ? sectors.value[editingSectorIndex.value] : null
);

const chartData = computed(() => ({
  labels: sectors.value.map(it => {
    //TODO: make in common way
    return it.label.length > 15 ? it.label.substring(0, 15) + '...' : it.label;
  }),
  datasets: [{
    backgroundColor: sectors.value.map(s => s.color),
    data: sectors.value.map(s => s.value),
  }],
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
      <ChartSectors
        :sectors="sectors"
        @edit="openEditModal"
        @delete="handleDelete"
        @add="openAddModal"
      />

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
    gap: 40px;
    padding: 20px;
  }

  h2 {
    width: 100%;
    padding-bottom: 15px;
    font-size: 32px;
    font-weight: 600;
    border-bottom: 1px solid #DBDFE9;
    margin: 0;
  }

  .content-wrapper {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    justify-content: center;
  }

  .chart-container {
    flex: 1;
    position: relative;
    height: 400px;
    min-width: 400px;
  }

  @media (max-width: 900px) {
    .content-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    .chart-container {
      width: 100%;
      min-width: 0;
      max-width: 500px;
    }
  }
</style>
