<template>
  <div class="menu">
    <div class="white-box">
      <div class="between">
        <div class="progress1">
          <div class="little">
            <el-progress
              :hidden="115"
              :percentage="timerStore.getTimerProgress.little"
              :stroke-width="40"
              :width="115"
              class="littleCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
          <div class="medium">
            <el-progress
              :hidden="195"
              :percentage="timerStore.getTimerProgress.middle"
              :stroke-width="40"
              :width="195"
              class="mediumCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
          <div class="big">
            <el-progress
              :hidden="270"
              :percentage="timerStore.getTimerProgress.big"
              :stroke-width="40"
              :width="270"
              class="bigCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
        </div>
        <div class="svg-box">
          <svg>
            <defs>
              <linearGradient id="little-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.small.start}" offset="0%" stop-opacity="0.8"></stop>
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.small.end}" offset="100%" stop-opacity="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
            <defs>
              <linearGradient id="medium-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.medium.start}" offset="0%" stop-opacity="0.8"></stop>
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.medium.end}" offset="100%" stop-opacity="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
            <defs>
              <linearGradient id="big-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.big.start}" offset="0%" stop-opacity="0.8"></stop>
                <stop :style="{stopColor:globalStore.Setting.progressBar.color.big.end}" offset="100%" stop-opacity="0.9"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="container">
          <div class="swtich">
            <span class="label-text">挂机检测</span>
            <el-switch
              v-model="globalStore.AFKDetected"
              :active-icon="Check"
              :inactive-icon="Close"
              class="mt-2"
              inline-prompt
              style="margin-left: 24px"
            />
          </div>
          <div class="time">已打卡：</div>
          <div class="clock">
<!--            <FlipClock ref="flipClock"></FlipClock>-->
            <countdown ref="CountDown"></countdown>
          </div>
        </div>
      </div>
      <div class="btns">
        <button class="btn btn-success" @click="startTimer">开始计时</button>
        <button class="btn btn-error" @click="stopTimer">停止计时</button>
        <button class="btn btn-warning" @click="clearTimer">清除计时</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '../assets/css/common.css'
import {onMounted, ref} from 'vue'
import {TimerStore} from '../stores/Timer'
import Countdown from "../components/Countdown.vue";
import {GlobalStore} from "../stores/Global";
import {Check, Close} from "@element-plus/icons-vue";

const globalStore = GlobalStore()
const timerStore = TimerStore()
const CountDown = ref(null)

const startTimer = () => {
  CountDown.value.startTimer()
}
const stopTimer = () => {
  CountDown.value.StopTimer()
}
const clearTimer = () => {
  CountDown.value.clearTime()
}
onMounted(() => {

})
</script>


<style scoped>
.between {
  @apply flex space-x-4 items-center;
}
.btns {
  @apply p-8;
  @apply grid grid-cols-3 space-x-12;
}

.progress1 {
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
  @apply stroke-base-100;
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
  font-size: 50px;
  font-weight: 600;
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
