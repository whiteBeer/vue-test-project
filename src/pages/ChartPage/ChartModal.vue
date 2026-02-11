<script setup lang="ts">
import { ref, watch } from 'vue';
import { ChromePicker } from 'vue-color';
import 'vue-color/style.css';
import Modal from '@/components/ModalContainer/ModalContainer.vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

interface Sector {
  label: string;
  value: number;
  color: string;
}

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
const color = ref('#f87171');

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
        color.value = '#f87171';
      }
    }
  }
);

function handleSubmit() {
  if (name.value && value.value && value.value > 0) {
    const colorHex = typeof color.value === 'object'
      ? (color.value as any).hex
      : color.value;

    emit('save', {
      label: name.value,
      value: value.value,
      color: colorHex
    });
  }
}
</script>

<template>
  <Modal :isOpen="isOpen" @close="emit('close')">
    <div class="modal-form">
      <h3>{{ sectorToEdit ? 'Редактировать сектор' : 'Добавить новый сектор' }}</h3>

      <FloatLabel variant="in" class="form-group">
        <InputText id="sector-name" v-model="name" />
        <label for="sector-name">Название</label>
      </FloatLabel>

      <FloatLabel variant="in" class="form-group">
        <InputNumber id="sector-value" v-model="value" mode="decimal" />
        <label for="sector-value">Значение</label>
      </FloatLabel>

      <div class="form-group">
        <div class="color-picker-wrapper">
          <ChromePicker v-model="color" />
        </div>
      </div>

      <Button
        :label="sectorToEdit ? 'Сохранить изменения' : 'Добавить'"
        @click="handleSubmit"
      />
    </div>
  </Modal>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  margin-top: 1rem;
}
.color-picker-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
