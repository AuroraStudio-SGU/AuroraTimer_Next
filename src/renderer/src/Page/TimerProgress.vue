<template>
  <div class="progress">
    <div class="little">
      <el-progress
        class="littleCircle"
        :width="185"
        :hidden="185"
        type="circle"
        :percentage="progress().little"
        :color="percentageStyle.little.bar_color"
        :stroke-width="40"
      >
<!--        <span class="percentage-label">{{ props.percent }}</span>-->
        <span class="percentage-label"></span>
      </el-progress>
    </div>
    <div class="medium">
      <el-progress
        class="mediumCircle"
        :width="265"
        :hidden="265"
        type="circle"
        :percentage="progress().middle"
        :color="percentageStyle.middle.bar_color"
        :stroke-width="40"
      >
<!--        <span class="percentage-label">{{ props.percent }}</span>-->
        <span class="percentage-label"></span>
      </el-progress>
    </div>
    <div class="big">
      <el-progress
        class="bigCircle"
        :width="340"
        :hidden="340"
        type="circle"
        :percentage="progress().big"
        :color="percentageStyle.big.bar_color"
        :stroke-width="40"
      >
<!--        <span class="percentage-label">{{ props.percent }}</span>-->
        <span class="percentage-label"></span>
      </el-progress>
    </div>
  </div>
  <div class="slider">
    <div>
      <span class="demonstration">进度条</span>
      <el-slider :min="0" :max="300" :step="0.01" v-model="percent" style="width: 100%;"/>
    </div>
  </div>
<div>
  <svg width="100%" height="100%">
    <defs>
      <linearGradient id="little-w" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#fff1eb" stop-opacity="0.8"></stop>
        <stop offset="100%" style="stop-color:#ace0f9" stop-opacity="1"></stop>
      </linearGradient>
    </defs>
  </svg>
  <svg width="100%" height="100%">
    <defs>
      <linearGradient id="medium-w" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#a8edea" stop-opacity="0.8"></stop>
        <stop offset="100%" style="stop-color:#fed6e3" stop-opacity="1"></stop>
      </linearGradient>
    </defs>
  </svg>
  <svg width="100%" height="100%">
    <defs>
      <linearGradient id="big-w" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#a6c0fe" stop-opacity="0.8"></stop>
        <stop offset="100%" style="stop-color:#f68084" stop-opacity="0.9"></stop>
      </linearGradient>
    </defs>
  </svg>

</div>


</template>

<script setup>

import {onMounted, ref} from "vue";
import {TimerStore} from "../stores/Timer";


const timerStore = TimerStore()

const percentageStyle = {
  little:{
    track_color: "rgba(252,222,56,0.55)",
    bar_color: "#58ffea",
  },
  middle:{
    track_color: "rgba(0,128,28,0.6)",
    bar_color: "#72ccb4",
  },
  big:{
    track_color: "rgba(255,0,0,0.52)",
    bar_color: "#d23d5f",
  }
}

const percent = ref(0)

const progress = () => {
  return {
    big: percent.value,
    middle: percent.value - 100 < 0 ? 0 : percent.value - 100,
    little: percent.value - 200 < 0 ? 0 : percent.value - 200
  };
}



</script>
<style scoped>

.progress {
  margin-left: 5px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

/*:deep(.el-progress path:first-child) {*/
/*  stroke: v-bind('percentageStyle.track_color');*/
/*}*/
.little {
  width: 350px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.medium{
  width: 350px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
}
.big {
  width: 350px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
}
/*v-bind('percentageStyle.middle.track_color');*/
:deep(.el-progress path:first-child) {
  stroke: #ffffff;
}

:deep(.littleCircle) svg>path:nth-child(2){
  stroke: url(#little-w);
}

:deep(.mediumCircle) svg>path:nth-child(2){
  stroke: url(#medium-w);
}

:deep(.bigCircle) svg>path:nth-child(2){
  stroke: url(#big-w);
}

.svg-box {
  position: absolute;
  top:0;
  left: 0;
}

</style>
