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
              :stroke-width="40"
            >
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
              :stroke-width="40"
            >
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
              :stroke-width="40"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
        </div>

        <div class="svg-box">
          <svg>
            <defs>
              <linearGradient id="little-w" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #fff1eb" stop-opacity="0.8"></stop>
                <stop offset="100%" style="stop-color: #ace0f9" stop-opacity="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
            <defs>
              <linearGradient id="medium-w" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #a8edea" stop-opacity="0.8"></stop>
                <stop offset="100%" style="stop-color: #fed6e3" stop-opacity="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
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
          <div class="clock">
            <FlipClock ref="flipClock"></FlipClock>
          </div>
        </div>
      </div>
      <div class="slider">
        <div>
          <el-button type="success" @click="startTimer">开始计时</el-button>
          <el-button type="success" @click="stopTimer">停止计时</el-button>
          <el-button type="success" @click="clearTimer">清除计时</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '../assets/css/common.css'
import {onMounted, ref} from 'vue'
import {TimerStore} from '../stores/Timer'
import FlipClock from "../components/FlipClock.vue";

const timerStore = TimerStore()
const flipClock = ref(null)

const flips = ref(null)


const startTimer = () => {
  flipClock.value.run()
}
const stopTimer = () => {
  flipClock.value.StopTimer()
}
const clearTimer = () => {
  flipClock.value.clearTimer()
}
onMounted(() => {

})
</script>


<style scoped>
.between {
  display: flex;
  align-items: center;
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
  pointer-events: none;
}

.time {
  font-size: 60px;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container {
  margin-left: 20px;
}


body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.clock {
  display: flex;
}

/* 时钟的分隔 */
.clock .divider {
  font-size: 66px;
  line-height: 102px;
  font-style: normal;
  color: rgb(51, 50, 50);
}

/* 时钟的卡片 */
.clock .flip {
  position: relative;
  width: 60px;
  height: 100px;
  margin: 2px;
  font-size: 70px;
  font-weight: 700;
  line-height: 100px;
  text-align: center;
  background: rgb(46, 45, 45);
  border: 1px solid rgb(34, 33, 33);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(54, 54, 54, 0.5);
}

/* 时钟上的数字 */
.clock .flip .digital::before, .clock .flip .digital::after {
  position: absolute;
  content: attr(data-number);
  left: 0;
  right: 0;
  color: white;
  background: rgb(51, 50, 50);
  overflow: hidden;
  -webkit-perspective: 160px;
  perspective: 160px;
}

/* 翻页前的数字 */
.clock .flip .digital::before {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid #666;
  border-radius: 10px 10px 0 0;
}

/* 翻页后的数字 */
.clock .flip .digital::after {
  top: 50%;
  bottom: 0;
  line-height: 0;
  border-radius: 0 0 10px 10px;
}

.clock .flip .back::before,
.clock .flip .front::after {
  z-index: 1;
}

.clock .flip .back::after {
  z-index: 2;
}

.clock .flip .front::before {
  z-index: 3;
}

.clock .flip .back::after {
  -webkit-transform-origin: center top;
  transform-origin: center top;
  -webkit-transform: rotateX(0.5turn);
  transform: rotateX(0.5turn);
}

.clock .flip.running .front::before {
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-animation: frontFlipDown 0.6s ease-in-out;
  animation: frontFlipDown 0.6s ease-in-out;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.clock .flip.running .back::after {
  -webkit-animation: backFlipDown 0.6s ease-in-out;
  animation: backFlipDown 0.6s ease-in-out;
}

@-webkit-keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
    transform: rotateX(0.5turn);
  }
}

@keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
    transform: rotateX(0.5turn);
  }
}

@-webkit-keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}

@keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}


</style>
