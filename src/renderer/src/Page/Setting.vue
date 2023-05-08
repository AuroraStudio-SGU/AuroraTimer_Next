<template>
  <div class="menu">
    <div class="title" >
      设置功能
    </div>
    <div class="white-box">
      <span class="demonstration">进度条1(&lt;24h)渐变色0%</span><el-color-picker v-model="timerStore.progressColor.big.start" />
      <span class="demonstration">进度条1(&lt;24h)渐变色100%</span><el-color-picker v-model="timerStore.progressColor.big.end" />
      <br>
      <span class="demonstration">进度条2(&lt;48h)渐变色0%</span><el-color-picker v-model="timerStore.progressColor.medium.start" />
      <span class="demonstration">进度条2(&lt;48h)渐变色100%</span><el-color-picker v-model="timerStore.progressColor.medium.end" />
      <br>
      <span class="demonstration">进度条3(&lt;72h)渐变色0%</span><el-color-picker v-model="timerStore.progressColor.small.start" />
      <span class="demonstration">进度条3(&lt;72h)渐变色100%</span><el-color-picker v-model="timerStore.progressColor.small.end" />
      <br>
      <el-button plain type="success" @click="ColorSelector">想自己取个色？</el-button><br>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/common.css'
import {TimerStore} from "../stores/Timer";
import {ElNotification} from "element-plus";

const props = defineProps(['text'])

const timerStore = TimerStore()
const ColorSelector = async () => {
  ElNotification({
    title: '开始取色',
    message:'选取任意区域开始选色，按ESC取消',
    type:'info'
  })
  let color = await window.electronAPI.saveColorToClipboard();
  if(color){
    let message = `颜色代码:${color},已经帮你复制到剪切板上了`;
    ElNotification({
      title: '取色结果',
      message,
      type:'success'
    })
  }else {
    ElNotification({
      title: '取色取消',
      type:'info'
    })
  }
}

</script>

<style scoped>
.demonstration {
  margin-right: 16px;
}
.white-box *{
  padding: 10px;
}
</style>
