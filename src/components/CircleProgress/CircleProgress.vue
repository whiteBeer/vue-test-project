
<script setup lang="ts">
import { computed } from 'vue';
import { CircularProgressState, CircularProgressType } from './types';

const props = defineProps({
  size: {
    type: Number,
    default: 120
  },
  progress: {
    type: Number,
    default: 0
  },
  state: {
    type: String,
    default: 'inProgress',
    validator: (value: string) => {
      return Object.values(CircularProgressState).includes(value as CircularProgressState);
    }
  },
  strokeWidth: {
    type: Number,
    default: 10
  },
  fontSize: {
    type: String,
    default: '1.2rem'
  },
  type: {
    type: String,
    default: 'circle',
    validator: (v: string) => {
      return Object.values(CircularProgressType).includes(v as CircularProgressType);
    }
  }
});

const stateMap: { [key: string]: string } = {
  [CircularProgressState.inProgress]: '',
  [CircularProgressState.success]: '✔️',
  [CircularProgressState.warning]: '⚠️',
  [CircularProgressState.error]: '❌',
};

const size = computed(() => props.size);
const strokeWidth = computed(() => props.strokeWidth);
const progress = computed(() => Math.round(props.progress));
const state = computed(() => props.state);
const isDashboard = computed(() => props.type === 'dashboard');

const radius = computed(() => (size.value - strokeWidth.value) / 2);
const circleLength = computed(() => 2 * Math.PI * radius.value);
const dashboardLength = computed(() => circleLength.value * 0.75);

const strokeDasharray = computed(() => {
  if (isDashboard.value) {
    return `${dashboardLength.value} ${circleLength.value}`;
  }
  return circleLength.value;
});

const dashOffset = computed(() => {
  if (isDashboard.value) {
    return dashboardLength.value - (progress.value / 100) * dashboardLength.value;
  }
  return circleLength.value - (progress.value / 100) * circleLength.value;
});

const rotation = computed(() => {
  if (isDashboard.value) {
    return `rotate(135 ${size.value / 2} ${size.value / 2})`;
  }
  return `rotate(-90 ${size.value / 2} ${size.value / 2})`;
});

const color = computed(() => {
  const hue = (progress.value / 100) * 120;
  return `hsl(${hue}, 100%, 50%)`;
});
</script>

<template>
  <div class="circle-progress-container">
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="#eee"
        :stroke-width="strokeWidth"
        :stroke-dasharray="isDashboard ? `${dashboardLength} ${circleLength}` : undefined"
        :transform="rotation"
        stroke-linecap="round"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="dashOffset"
        :transform="rotation"
        class="progress-circle"
      />
    </svg>

    <div class="label" :style="{ fontSize: fontSize, lineHeight: fontSize }">
      {{ stateMap[state] ? stateMap[state] : (progress + '%') }}
    </div>
  </div>
</template>

<style scoped>
  .circle-progress-container {
    position: relative;
    display: inline-block;
  }
  .progress-circle {
    transition: stroke-dashoffset 0.6s ease, stroke 0.6s ease;
  }
  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    pointer-events: none;
    color: #555;
  }
</style>
