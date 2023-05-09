<template>
  <div class="menu">
    <div class="title">设置功能</div>
    <div class="white-box">
      <span class="demonstration">进度条1(&lt;24h)渐变色0%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.big.start" />
      <span class="demonstration">进度条1(&lt;24h)渐变色100%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.big.end" />
      <br>
      <span class="demonstration">进度条2(&lt;48h)渐变色0%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.medium.start" />
      <span class="demonstration">进度条2(&lt;48h)渐变色100%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.medium.end" />
      <br>
      <span class="demonstration">进度条3(&lt;72h)渐变色0%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.small.start" />
      <span class="demonstration">进度条3(&lt;72h)渐变色100%</span><el-color-picker :predefine="lastChoice"
      @change="addChoiceList" v-model="timerStore.progressColor.small.end" />
      <br>
      <el-button plain type="success" @click="ColorSelector">想自己取个色？</el-button>
      <br>
      <el-button plain type="default" @click="SaveSetting">保存!</el-button>
      <el-button plain type="info" @click="ResetSetting">重置默认设置</el-button>
      <br>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/common.css'
import {TimerStore} from "../stores/Timer";
import {ElNotification} from "element-plus";
import  * as SettingJS from "../utils/Setting";
import {ref} from "vue";

const props = defineProps(['text'])
let lastChoice = ref([]);
const timerStore = TimerStore()
const ColorSelector = async () => {
  ElNotification({
    title: '开始取色',
    message: '选取任意区域开始选色，按ESC取消',
    type: 'info'
  })
  let color = await window.electronAPI.saveColorToClipboard()
  if (color) {
    let message = `颜色代码:${color},已经帮你复制到剪切板上了`
    ElNotification({
      title: '取色结果',
      message,
      type: 'success'
    })
  } else {
    ElNotification({
      title: '取色取消',
      type: 'info'
    })
  }
}

const SaveSetting = () => {
  SettingJS.Setting.progressBar.color = timerStore.progressColor
  let flag = window.electronAPI.SaveSetting(JSON.stringify(SettingJS.Setting))
  if(flag){
    ElNotification({
      title: '保存成功',
      type:'success'
    })
  }else {
    ElNotification({
      title: '保存失败',
      type:'error'
    })
  }
}
const ResetSetting = () => {
  let DefaultSetting = SettingJS.DefaultSetting
  timerStore.progressColor = DefaultSetting.progressBar.color
  let flag = window.electronAPI.SaveSetting(JSON.stringify(DefaultSetting))
  if(flag){
    ElNotification({
      title: '重置成功',
      type:'success'
    })
  }else {
    ElNotification({
      title: '保存失败',
      type:'error'
    })
  }
}

const addChoiceList = (value) => {
  if (!value) return
  if(lastChoice.value.length>=20){
    lastChoice.value.pop()
  }
  lastChoice.value.push(value)
}

</script>

<style scoped>
.demonstration {
  margin-right: 16px;
}
.white-box *{
  padding: 15px;
}

.text {
  margin-right: 10px;
}
.dark-mode {
  display: flex;
  align-items: center;
}
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 1.95em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  --background: #28096b;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  transition: .5s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 50%;
  left: 10%;
  bottom: 15%;
  box-shadow: inset 8px -4px 0px 0px #fff000;
  background: var(--background);
  transition: .5s;
}

input:checked + .slider {
  background-color: #522ba7;
}

input:checked + .slider:before {
  transform: translateX(100%);
  box-shadow: inset 15px -4px 0px 15px #fff000;
}
</style>
