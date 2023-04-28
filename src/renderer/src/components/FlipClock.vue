<template>
  <div class="FlipClock" v-for="(item, index) in 4">
    <Flipper ref="flips"/>
    <em class="divider" v-if="index===1">:</em>
  </div>
</template>

<script setup>
import Flipper from "./Flipper.vue";
import {onMounted, ref} from "vue";
import {TimerStore} from "../stores/Timer";

const timeStore = TimerStore()

let timer = null
let flips = ref([])
let flipObjs = []
let time = 60
const StopTimer = () => {
  window.clearInterval(timer)
  timer = null
  timeStore.CloseTimer()
}
const clearTimer = () => {
  init()
  time = 60
}

const init = () => {
  let nowTimeStr = '0000'
  for (let i = 0; i < flipObjs.length; i++) {
    flipObjs[i].setFront(nowTimeStr[i])
  }
}
const SecondToTimeStr = (second) => {
  let hour = Math.floor((second / 3600))
  if (hour < 10) hour = '0' + hour
  let min = Math.floor((second % 3600) / 60)
  if (min < 10) min = '0' + min
  return hour + min + ''
}
const run = () => {
  if (timeStore.isStarted) return
  timer = setInterval(() => {
    timeStore.OpenTimer()
    // 获取当前时间
    let nowTimeStr = SecondToTimeStr(time)
    let nextTimeStr = SecondToTimeStr(time - 60)
    for (let i = 0; i < flipObjs.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue
      }
      flipObjs[i].flipDown(
        nextTimeStr[i],
        nowTimeStr[i]
      )
    }
    time += 60
  }, 1000)
}
defineExpose({
  run,
  timer,
  StopTimer,
  clearTimer
})
onMounted(() => {
  flipObjs = flips.value
  init()
})
</script>

<style scoped>
.FlipClock {
  text-align: center;
}

.FlipClock .M-Flipper {
  margin: 0 3px;
}

.FlipClock em {
  display: inline-block;
  line-height: 102px;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
}
</style>
