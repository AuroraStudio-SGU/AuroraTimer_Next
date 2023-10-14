<template>
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span class="num-hour"></span>
    </span>
      小时
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span class="num-min"></span>
    </span>
      分
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-5xl">
      <span class="num-second"></span>
    </span>
      秒
    </div>
  </div>
</template>

<script setup>
import {TimerStore} from "../stores/Timer";
import {onMounted, ref} from "vue";
import {GlobalStore} from "../stores/Global";
import {ElNotification} from "element-plus";
import * as API from '../api/API'

let hour = ref('00')
let min = ref('00')
let second = ref('00')
const timeStore = TimerStore()
const globalStore = GlobalStore()

try {
  //Timer 返回函数。
  timeStore.timer.onmessage = async (event) => {
    timeStore.TimePlusPlus();
    let time = timeStore.time
    //挂机检测
    if (time % timeStore.AfkLimit === 0 && time !== 0 && globalStore.AFKDetected) {
      window.electronAPI.getMousePoint().then((point) => {
        if (globalStore.lastMousePoint.x === point.x || globalStore.lastMousePoint.y === point.y) {
          StopTimer()
          globalStore.isAFK = true
          //TODO 提示用户是否正在挂机
          const NOTIFICATION_TITLE = "你是不是正在挂机？";
          const NOTIFICATION_BODY =
            "点我恢复计时！";
          new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY}).onclick =
            () => {
              StartTimer();
              ElNotification({
                title: '重新恢复计时',
                type: 'success'
              })
            };
        }
        globalStore.lastMousePoint = point
      })
    }
    //尝试加时 尝试保存计时记录
    if (time % 60 === 0 && time !== 0) {
      window.electronAPI.SaveSetting(JSON.stringify(globalStore.Setting))
      API.addTime(globalStore.Setting.userInfo.id).then((res) => {
        if (res.success) {
          if (typeof (res.data) == 'number') {
            timeStore.setTimeFromServer(res.data)
          }
        }
      })
    }
    let nowTimeStr = SecondToTimeStr(time)
    hour.value = nowTimeStr.hour;
    min.value = nowTimeStr.min;
    second.value = nowTimeStr.second;
  }
} catch (e) {
}
const StartTimer = () => {
  if (!timeStore.isStarted) {
    timeStore.OpenTimer()
    timeStore.timer.postMessage('start')
  }
}
const StopTimer = () => {
  if (timeStore.isStarted) {
    timeStore.CloseTimer()
    timeStore.timer.postMessage('stop')
  }
}


const clearTime = () => {
  hour.value = '00'
  min.value = '00'
  second.value = '00'
  timeStore.time = 0
}

const SecondToTimeStr = (second) => {
  let hour = Math.floor((second / 3600))
  if (hour < 10) hour = '0' + hour
  if (hour > 99) hour = '99' //不会真的有人能99+把
  let min = Math.floor((second % 3600) / 60)
  if (min < 10) min = '0' + min
  let seconds = Math.floor(second % 60)
  if (seconds < 10) seconds = '0' + seconds
  return {
    hour: String(hour),
    min: String(min),
    second: String(seconds),
  }
}


onMounted(() => {
  if (!(timeStore.timer instanceof Worker)) {
    timeStore.timer = new Worker(new URL('../utils/Timer.js', import.meta.url).href)
  }
  let time = timeStore.time
  let nowTimeStr = SecondToTimeStr(time)
  hour.value = nowTimeStr.hour;
  min.value = nowTimeStr.min;
  second.value = nowTimeStr.second;
  if (timeStore.isStarted) {
    timeStore.timer.postMessage('stop')
    timeStore.timer.postMessage('start')

  }
  window.electronAPI.getMousePoint().then((point) => {
    globalStore.lastMousePoint = point;
  })
})

defineExpose({
  StartTimer,
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

.num-second {
  --value: v-bind(second)
}
</style>
