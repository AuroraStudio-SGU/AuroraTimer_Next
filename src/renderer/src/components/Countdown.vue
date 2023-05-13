<template>
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span class="num-hour"></span>
    </span>
      hours
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span class="num-min"></span>
    </span>
      min
    </div>
  </div>
</template>

<script setup>
import {TimerStore} from "../stores/Timer";
import {onMounted, ref} from "vue";
import {GlobalStore} from "../stores/Global";
import {ElNotification} from "element-plus";

let hour = ref('00')
let min = ref('00')
let timer = null
const timeStore = TimerStore()
const globalStore = GlobalStore()


const startTimer = () => {
  if (!timeStore.isStarted) {
    timeStore.OpenTimer()
    const tick = () => {
      let time = timeStore.time
      let nowTimeStr = SecondToTimeStr(time)
      if (time % 1800 === 0 && time!==0 && globalStore.AFKDetected) {
        window.electronAPI.getMousePoint().then((point) => {
          if (globalStore.lastMousePoint.x === point.x || globalStore.lastMousePoint.y === point.y) {
            StopTimer()
            //TODO 提示用户是否正在挂机
            const NOTIFICATION_TITLE = "你是不是正在挂机？";
            const NOTIFICATION_BODY =
              "点我恢复计时！";
            new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY}).onclick =
              () => {
                tick()
                ElNotification({
                  title: '重新恢复计时',
                  type: 'success'
                })
              };
          }
          globalStore.lastMousePoint = point
          timeStore.TimePlusPlus()
        })
      }
      hour.value = nowTimeStr.hour
      min.value = nowTimeStr.min
      timeStore.TimePlusPlus()
      timeStore.timer = setTimeout(tick, 1000)
    }
    tick();
  }
}
const StopTimer = async () => {
  window.clearTimeout(timeStore.timer)
  timeStore.CloseTimer()
}
const clearTime = () => {
  hour.value = '00'
  min.value = '00'
  timeStore.time = 0
}

const SecondToTimeStr = (second) => {
  let hour = Math.floor((second / 3600))
  if (hour < 10) hour = '0' + hour
  if (hour > 99) hour = '99' //不会真的有人能99+把
  let min = Math.floor((second % 3600) / 60)
  if (min < 10) min = '0' + min
  return {
    hour,
    min
  }
}
onMounted(() => {
  let time = timeStore.time
  let nowTimeStr = SecondToTimeStr(time)
  hour.value = nowTimeStr.hour
  min.value = nowTimeStr.min
  if (timeStore.isStarted) {
    window.clearTimeout(timeStore.timer)
    startTimer()
  }
  window.electronAPI.getMousePoint().then((point) => {
    globalStore.lastMousePoint = point;
  })
})

defineExpose({
  startTimer,
  StopTimer,
  clearTime,
})
</script>

<style scoped>
.num-hour {
  --value: v-bind(hour)
}

.num-min {
  --value: v-bind(min)
}
</style>
