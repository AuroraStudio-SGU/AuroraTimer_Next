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
import * as API from '../utils/API'

let hour = ref('00')
let min = ref('00')
let second = ref('00')
let timer = null
const timeStore = TimerStore()
const globalStore = GlobalStore()
let tickTask

try{
  timeStore.timer.onmessage = (event) => {
    timeStore.TimePlusPlus();
    console.log("++")
    let time = timeStore.time
    let nowTimeStr = SecondToTimeStr(time)
    hour.value = nowTimeStr.hour;
    min.value = nowTimeStr.min;
    second.value = nowTimeStr.second;
  }
}catch (e) {}
const StartTimer = () => {
  if(!timeStore.isStarted){
    timeStore.OpenTimer()
    timeStore.timer.postMessage('start')
  }
}
const StopTimer = () => {
  if(timeStore.isStarted){
    timeStore.CloseTimer()
    timeStore.timer.postMessage('stop')
  }
}


const startTimer = () => {
  if (!timeStore.isStarted) {
    timeStore.OpenTimer()
    tickTask();
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
    hour:String(hour),
    min:String(min),
    second:String(seconds),
  }
}
const setUpTimer = () => {
  tickTask = () => {
    globalStore.isAFK = false
    let time = timeStore.time
    let nowTimeStr = SecondToTimeStr(time)
    if(time % 300 === 0 && time!==0){
      //尝试上传时间
      // uploadTime() current disable
    }
    if (time % 1800 === 0 && time!==0 && globalStore.AFKDetected) {
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
              tickTask();
              ElNotification({
                title: '重新恢复计时',
                type: 'success'
              })
            };
        }
        globalStore.lastMousePoint = point
      })
    }
    hour.value = nowTimeStr.hour
    min.value = nowTimeStr.min
    second.value = nowTimeStr.second
    timeStore.TimePlusPlus()
    timeStore.timer = setTimeout(tickTask, 1000)
  }
}

const uploadTime = async () => {
  await API.addTime(globalStore.Setting.userInfo.uid)
    .then(res=>{
      if(res.code==="200") return true
      else {
        ElNotification({
          title: "请求失败！",
          message:res.msg,
          type:"error"
        });
      }
    })
    .catch(res=>{
      ElNotification({
        title: "请求失败！",
        message:res.msg,
        type:"error"
      });
    })

}

onMounted(() => {
  if(!(timeStore.timer instanceof Worker)){
    timeStore.timer = new Worker(new URL('../utils/Timer.js',import.meta.url).href)
  }
  let time = timeStore.time
  let nowTimeStr = SecondToTimeStr(time)
  hour.value = nowTimeStr.hour;
  min.value = nowTimeStr.min;
  second.value = nowTimeStr.second;
  if(timeStore.isStarted){
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
