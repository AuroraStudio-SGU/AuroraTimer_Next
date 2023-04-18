<template>
  <div>
    <div class="app-box">
      <SliderBar></SliderBar>
      <progress-circle :size="300" :percent="time" :bar-size="25"></progress-circle>
      <!--    <Progress2></Progress2>-->
    </div>
    <div class="slider">
      <span class="demonstration">进度条</span>
      <el-slider :min="0" :max="300" :step="0.01" v-model="time"/>
    </div>
  </div>
</template>

<script setup>
import ProgressCircle from "./components/progress-circle.vue";
import {ref} from "vue";
import Progress2 from "./components/Progress2.vue";
import SliderBar from "./components/SliderBar.vue";

const time = ref(0)
</script>

<style>
.slider {
  display: flex;
  align-items: center;
}

.app-box {
  justify-content: space-between;
  display: flex;
}
</style>
