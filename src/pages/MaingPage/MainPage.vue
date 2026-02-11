<script setup lang="ts">
  import {ref} from "vue";
  import CircleProgress from '../../components/CircleProgress/CircleProgress.vue';

  let interval:number | undefined;
  const progress = ref<number>(10);
  const state = ref<string>('inProgress');
  const type = ref<string>('circle');

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
    }, 500)
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
</script>

<template>
  <button @click="() => onClickType('circle')">Type: circle</button>
  <button @click="() => onClickType('dashboard')">Type: dashboard</button>
  <br/>
  <br/>

  <button @click="() => onClickProgress(0)">Progress 0</button>
  <button @click="() => onClickProgress(10)">Progress 10</button>
  <button @click="() => onClickProgress(50)">Progress 50</button>
  <button @click="() => onClickProgress(100)">Progress 100</button>
  <button style="margin-left: 20px"
          @click="() => onClickProgressAnimationStart()">Progress Start</button>
  <button @click="() => onClickProgressAnimationStop()">Progress Stop</button>

  <br/>
  <br/>
  <button @click="() => onClickState('inProgress')">inProgress</button>
  <button @click="() => onClickState('success')">success</button>
  <button @click="() => onClickState('warning')">warning</button>
  <button @click="() => onClickState('error')">error</button>

  <div style="margin-top: 20px">
    <CircleProgress :type="type" :size="200" :state="state" :progress="progress" :stroke-width="10" />
  </div>
</template>
