<script setup lang="ts">

import {ref} from 'vue';
import CircleProgress from '../../components/CircleProgress/CircleProgress.vue';

let interval:number | undefined;

const sizes = ref<{ size:number, stroke:number, fontSize:string }>({
  size: 200, stroke: 12, fontSize: '30px'
});
const progress = ref<number>(10);
const state = ref<string>('inProgress');
const type = ref<string>('circle');


function onClickSize (size:number, stroke: number, fontSize: string = '14px') {
  sizes.value = {size, stroke, fontSize};
}

function onClickProgress (newValue:number) {
  progress.value = newValue;
}

function onClickProgressAnimationStart () {
  interval = setInterval(() => {
    const newVal = progress.value + Math.random() * 10;
    if (newVal < 100) {
      progress.value = newVal;
    } else {
      progress.value = 100;
      clearInterval(interval);
    }
  }, 500);
}

function onClickProgressAnimationStop () {
  clearInterval(interval);
}

function onClickState (newValue:string) {
  state.value = newValue;
}

function onClickType (newValue:string) {
  type.value = newValue;
}

function isActiveBtn (param:string, val:string|number) {
  if (param === 'size') {
    return sizes.value.size === val;
  } else if (param === 'progress') {
    return progress.value === val;
  } else if (param === 'state') {
    return state.value === val;
  } else if (param === 'type') {
    return type.value === val;
  }
}
</script>

<template>
  <button :class="{ active: isActiveBtn('size', 50) }"
           @click="() => onClickSize(50, 5, '9px')">Size 50, Stroke 5</button>
  <button :class="{ active: isActiveBtn('size', 100) }"
          @click="() => onClickSize(100, 10)">Size 100, Stroke 10</button>
  <button :class="{ active: isActiveBtn('size', 200) }"
          @click="() => onClickSize(200, 12, '30px')">Size 200, Stroke 12</button>

  <br/>
  <br/>

  <button :class="{ active: isActiveBtn('progress', 0) }"
          @click="() => onClickProgress(0)">Progress 0</button>
  <button :class="{ active: isActiveBtn('progress', 10) }"
          @click="() => onClickProgress(10)">Progress 10</button>
  <button :class="{ active: isActiveBtn('progress', 50) }"
          @click="() => onClickProgress(50)">Progress 50</button>
  <button :class="{ active: isActiveBtn('progress', 100) }"
          @click="() => onClickProgress(100)">Progress 100</button>
  <button style="margin-left: 20px"
          @click="() => onClickProgressAnimationStart()">Progress Start</button>
  <button @click="() => onClickProgressAnimationStop()">Progress Stop</button>

  <br/>
  <br/>

  <button :class="{ active: isActiveBtn('state', 'inProgress') }"
          @click="() => onClickState('inProgress')">inProgress</button>
  <button :class="{ active: isActiveBtn('state', 'success') }"
          @click="() => onClickState('success')">success</button>
  <button :class="{ active: isActiveBtn('state', 'warning') }"
          @click="() => onClickState('warning')">warning</button>
  <button :class="{ active: isActiveBtn('state', 'error') }"
          @click="() => onClickState('error')">error</button>

  <br/>
  <br/>

  <button :class="{ active: isActiveBtn('type', 'circle') }"
          @click="() => onClickType('circle')">Type: circle</button>
  <button :class="{ active: isActiveBtn('type', 'dashboard') }"
          @click="() => onClickType('dashboard')">Type: dashboard</button>

  <div style="margin-top: 20px">
    <CircleProgress :type="type"
                    :size="sizes.size"
                    :state="state"
                    :progress="progress"
                    :stroke-width="sizes.stroke"
                    :font-size="sizes.fontSize"
    />
  </div>
</template>

<style scoped>
  .active {
    border: 1px solid red;
  }
</style>
