<template>
  <div class="menu">
    <div class="title">
      <p>Aurora</p>
    </div>
    <div class="white-box">
      <div class="between">
      <div class="progress">
        <div class="little">
          <el-progress
            class="littleCircle"
            :width="115"
            :hidden="115"
            type="circle"
            :percentage="timerStore.getTimerProgress.little"
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
            :width="195"
            :hidden="195"
            type="circle"
            :percentage="timerStore.getTimerProgress.middle"
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
            :width="270"
            :hidden="270"
            type="circle"
            :percentage="timerStore.getTimerProgress.big"
            :color="percentageStyle.big.bar_color"
            :stroke-width="40"
          >
            <!--        <span class="percentage-label">{{ props.percent }}</span>-->
            <span class="percentage-label"></span>
          </el-progress>
        </div>
      </div>

      <div class="svg-box">
        <svg >
          <defs>
            <linearGradient id="little-w" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #fff1eb" stop-opacity="0.8"></stop>
              <stop offset="100%" style="stop-color: #ace0f9" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg >
          <defs>
            <linearGradient id="medium-w" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #a8edea" stop-opacity="0.8"></stop>
              <stop offset="100%" style="stop-color: #fed6e3" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg >
          <defs>
            <linearGradient id="big-w" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #a6c0fe" stop-opacity="0.8"></stop>
              <stop offset="100%" style="stop-color: #f68084" stop-opacity="0.9"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="container">
        <div class="time">已打卡：</div>
        <div class="time">{{ timerStore.getTimeStr }}</div>
      </div>

    </div>
    <div class="slider">
        <div>
          <el-button type="success" @click="SwitchTimer(true)">开始计时</el-button>
          <el-button type="success" @click="SwitchTimer(false)">停止计时</el-button>
          <el-button type="success" @click="clearTimer">清除计时</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {TimerStore} from '../stores/Timer'
import {Timer} from "../utils/Timer";

const timerStore = TimerStore()

const SwitchTimer = (flag)=>{
  Timer(flag)
}


const clearTimer = ()=>{
  timerStore.clearTime()
}
const percentageStyle = {
  little: {
    track_color: 'rgba(252,222,56,0.55)',
    bar_color: '#58ffea'
  },
  middle: {
    track_color: 'rgba(0,128,28,0.6)',
    bar_color: '#72ccb4'
  },
  big: {
    track_color: 'rgba(255,0,0,0.52)',
    bar_color: '#d23d5f'
  }
}

const percent = ref(0)

const progress = () => {
  return {
    big: percent.value,
    middle: percent.value - 100 < 0 ? 0 : percent.value - 100,
    little: percent.value - 200 < 0 ? 0 : percent.value - 200
  }
}
</script>
<style scoped>

.between {
  display: flex;
  align-items: center;
}

.title {
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20PX;
}

.progress {
  margin-left: 5px;
  position: relative;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.little {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.medium {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
}

.big {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/*v-bind('percentageStyle.middle.track_color');*/
:deep(.el-progress path:first-child) {
  stroke: #ffffff;
}

:deep(.bigCircle path:first-child) {

  stroke: #eef2f5;
}

:deep(.littleCircle) svg > path:nth-child(2) {
  stroke: url(#little-w);
}

:deep(.mediumCircle) svg > path:nth-child(2) {
  stroke: url(#medium-w);
}

:deep(.bigCircle) svg > path:nth-child(2) {
  stroke: url(#big-w);
}

.svg-box {
  position: absolute;
}

.time {
  font-size: 60px;
  font-weight: 600;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

.container {
  margin-left: 20px;

}
.white-box {
  background-color: #fff;
  padding: 30px 100px 30px 50px;
  border-radius: 35px;
}
</style>
