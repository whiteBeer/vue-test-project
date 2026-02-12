<script setup lang="ts">
import type {Sector} from './types.ts';

import { ref, watch, computed } from 'vue';
import { ChromePicker } from 'vue-color';
import 'vue-color/style.css';
import Modal from '@/components/ModalContainer/ModalContainer.vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps<{
  isOpen: boolean;
  sectorToEdit?: Sector | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', sector: Sector): void;
}>();

const name = ref('');
const value = ref<number | undefined>(undefined);
const color = ref('#5272e3');
const isColorPickerVisible = ref(false);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      if (props.sectorToEdit) {
        name.value = props.sectorToEdit.label;
        value.value = props.sectorToEdit.value;
        color.value = props.sectorToEdit.color;
      } else {
        name.value = '';
        value.value = undefined;
        color.value = '#5272e3';
      }
      isColorPickerVisible.value = false;
    }
  }
);

function toggleColorPicker() {
  isColorPickerVisible.value = !isColorPickerVisible.value;
}

function updateColor(newColor: string) {
  color.value = newColor;
}

function handleSubmit() {
  if (isFormValid.value) {
    emit('save', {
      label: name.value,
      value: +(value.value || 0),
      color: color.value
    });
  }
}

const isFormValid = computed(() => {
  return !!name.value && value.value !== undefined && value.value > 0 && !!color.value;
});
</script>

<template>
  <Modal :isOpen="isOpen" @close="emit('close')">
    <div class="modal-form">
      <h3>{{ sectorToEdit ? 'Редактирование сектора' : 'Добавление сектора' }}</h3>

      <FloatLabel variant="in" class="form-group">
        <InputText id="sector-name" v-model="name" />
        <label for="sector-name">Название</label>
      </FloatLabel>

      <FloatLabel variant="in" class="form-group">
        <InputText id="sector-value" v-model="value" type="number" />
        <label for="sector-value">Значение</label>
      </FloatLabel>

      <div class="form-group color-input">
        <FloatLabel @click="toggleColorPicker" variant="in" class="form-group">
          <InputText id="sector-name" v-model="color" />
          <div class="color-preview" :style="{ backgroundColor: color }"></div>
          <label for="sector-value">Цвет</label>
        </FloatLabel>

        <div v-if="isColorPickerVisible" class="color-picker-popup">
          <ChromePicker :modelValue="color" @update:modelValue="updateColor" />
        </div>
      </div>

      <Button
        class="add-btn"
        :label="sectorToEdit ? 'Сохранить изменения' : 'Добавить'"
        @click="handleSubmit"
        :disabled="!isFormValid"
      />
    </div>
  </Modal>
</template>

<style scoped>
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  .form-group {
    margin-top: 1rem;
  }
  .p-inputtext, .p-inputnumber {
    width: 100%;
  }
  .p-floatlabel {
    margin-top: 0;
  }

  .color-input {
    position: relative;
    margin-top: 0;
  }

  .color-preview {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .color-picker-popup {
    z-index: 100;
    top: 100%;
    left: 0;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .add-btn {
    height: 60px;
  }
</style>
