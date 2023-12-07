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

<script setup lang="ts">
import {TimerStore} from "../stores/Timer";
import {onBeforeMount, ref} from "vue";
import {GlobalStore} from "../stores/Global";
import {ElNotification} from "element-plus";
import * as API from '../api/API'
import {getUrl} from "../utils/urlUtils";
import {CallbackEnum} from "../api/interfaces/CallbackEnum";

let hour = ref('00')
let min = ref('00')
let second = ref('00')
const timeStore = TimerStore()
const globalStore = GlobalStore()
let notification = ref<Notification>(null)
try {
  //Timer 返回函数。
  timeStore.timer.onmessage = async (event) => {
    timeStore.TimePlusPlus();
    let time = Number(globalStore.Setting.userInfo.currentWeekTime);
    if (isNaN(time)) {
      time = 0;
    }
    //挂机检测
    if (time % timeStore.AfkLimit === 0 && time !== 0 && globalStore.AFKDetected) {
      window.electronAPI.getMousePoint().then((point:Electron.Point) => {
        if (globalStore.lastMousePoint.x === point.x || globalStore.lastMousePoint.y === point.y) {
          StopTimer()
          globalStore.isAFK = true
          //TODO 提示用户是否正在挂机
          const NOTIFICATION_TITLE = "你是不是正在挂机？";
          const NOTIFICATION_BODY = "点我恢复计时！";
          const img = getUrl('icon-sm.png')
          timeStore.AFKNotification =  new Notification(
              NOTIFICATION_TITLE,
              {body: NOTIFICATION_BODY, requireInteraction: true, icon: img});
          timeStore.AFKNotification.onclick = () => {
            if (StartTimer()) {
              ElNotification({
                title: '重新恢复计时',
                type: 'success'
              })
            }
          }
          const dialogOpts = {
            type: 'warning',
            buttons: ['恢复计时', '恢复计时'],
            title: '你还在吗?挂机太长时间不计时的哦!',
            message: "看不到通知？这个总能看到了把，要是这个看不到，那我也没办法了",
            detail: `我尽力让你看到这个消息了`,
          }
          //通过ipc通信，让主进程发送系统级通知。
          window.electronAPI.PushSysNotification(dialogOpts)

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
            if (Math.abs(Number(globalStore.Setting.userInfo.currentWeekTime) - Number(res.data)) >= 60) {
              globalStore.Setting.userInfo.currentWeekTime = Number(res.data)
            }
          }
        }
      })
    }
    let nowTimeStr = SecondToTimeStr(time)
    hour.value = nowTimeStr.hour;
    min.value = nowTimeStr.min;
    second.value = nowTimeStr.second;
  }
  //收到当前鼠标坐标
  window.electronAPI.getMousePoint().then((point:Electron.Point) => {
    globalStore.lastMousePoint = point;
  })
  //监听用户点击事件，回来确认恢复计时
  window.electronAPI.CallbackInformation((_event, Enum) => {
    if (Enum === CallbackEnum.RESTARTTIMER) {
      if (StartTimer()) {
        ElNotification({
          title: '重新恢复计时',
          type: 'success'
        })
      }
    }
  })
} catch (e) {
}
const StartTimer = () => {
  if (!timeStore.isStarted) {
    timeStore.OpenTimer()
    timeStore.timer.postMessage('start')
    if(globalStore.isAFK){
      window.electronAPI.CloseSysNotification()
      console.log(timeStore.AFKNotification)
      if(timeStore.AFKNotification!=null){
        timeStore.AFKNotification.close()
        timeStore.AFKNotification = null
      }
    }
    globalStore.isAFK = false;
    globalStore.changeMouseState(true)
    return true;
  }
  return false;
}
const StopTimer = () => {
  if (timeStore.isStarted) {
    timeStore.CloseTimer()
    timeStore.timer.postMessage('stop')
    globalStore.changeMouseState(false)
  }
}


const clearTime = () => {
  hour.value = '00'
  min.value = '00'
  second.value = '00'
  timeStore.time = 0
}

const SecondToTimeStr = (second:any) => {
  let hour:any = Math.floor((second / 3600))
  if (hour < 10) hour = '0' + hour
  if (hour > 99) hour = '99' //不会真的有人能99+把
  let min:any = Math.floor((second % 3600) / 60)
  if (min < 10) min = '0' + min
  let seconds:any = Math.floor(second % 60)
  if (seconds < 10) seconds = '0' + seconds
  return {
    hour: String(hour),
    min: String(min),
    second: String(seconds),
  }
}


onBeforeMount(() => {
  if (!(timeStore.timer instanceof Worker)) {
    timeStore.timer = new Worker(new URL('../utils/Timer.js', import.meta.url).href)
  }
  let time = Number(globalStore.Setting.userInfo.currentWeekTime)
  if (isNaN(time)) {
    time = 0;
  }
  let nowTimeStr = SecondToTimeStr(time)
  hour.value = nowTimeStr.hour;
  min.value = nowTimeStr.min;
  second.value = nowTimeStr.second;
  if (timeStore.isStarted) {
    StopTimer();
    StartTimer();
  }
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
