<template>
  <div v-for="(item, index) in 4" class="FlipClock">
    <Flipper ref="flips"/>
    <em v-if="index===1" class="divider">:</em>
  </div>
</template>

<script setup>
import Flipper from "./Flipper.vue";
import {onMounted, ref} from "vue";
import {TimerStore} from "../stores/Timer";

const timeStore = TimerStore()


let flips = ref([])
let flipObjs = []
let LastTime = 0
const StopTimer = () => {
  window.clearTimeout(timeStore.timer)
  timeStore.timer = null
  timeStore.CloseTimer()
}
const clearTimer = () => {
  init()
  LastTime = 0
  timeStore.clearTime()
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

const setTimer = () => {
  const tick = () => {
    try {
      let time = timeStore.time
      let nowTimeStr = SecondToTimeStr(time)
      let nextTimeStr = SecondToTimeStr(LastTime)
      for (let i = 0; i < flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue
        }
        flipObjs[i].flipDown(
          nextTimeStr[i],
          nowTimeStr[i]
        )
      }
      LastTime = time
      timeStore.TimePlusPlus()
    } catch (e) {
    }
    timeStore.timer = setTimeout(tick, 1000)
  }
  return tick;
}

const run = () => {
  if (timeStore.isStarted) return
  timeStore.OpenTimer()
  let tick = setTimer()
  tick()
}
defineExpose({
  run,
  StopTimer,
  clearTimer
})
onMounted(() => {
  flipObjs = flips.value

  if (timeStore.isStarted) {
    LastTime = timeStore.time
    let nowTimeStr = SecondToTimeStr(timeStore.time)
    let nextTimeStr = '0000'
    for (let i = 0; i < flipObjs.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue
      }
      flipObjs[i].flipDown(
        nextTimeStr[i],
        nowTimeStr[i]
      )
    }
    window.clearTimeout(timeStore.timer)
    let tick = setTimer()
    tick()
  } else {
    init()
  }
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
