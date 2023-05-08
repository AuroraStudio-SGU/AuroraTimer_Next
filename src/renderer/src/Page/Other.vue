<template>
  <div class="menu">
    <div class="title" >
      用来测试各种功能
    </div>
    <div class="white-box">
      <el-button class="obj" plain type="success" @click="sendMsg">测试通知</el-button>
      <el-button class="obj" plain @click="sendMsgIn"> 应用内通知</el-button>
      <el-button class="obj" plain type="success" @click="openFile">上传文件</el-button>
      <el-button class="obj" plain type="success" @click="loadSetting">加载设置文件</el-button>
      <el-button class="obj" plain type="success" @click="SunRise">日落日期测试</el-button>
    </div>
  </div>
</template>


<script setup>
import '../assets/css/common.css'
import {ElNotification} from "element-plus";
import {CalculateSunTime, currentDate, formatSecondTime} from "../utils/TimeUtil";
import {ref} from "vue";




const openFile = () => {
  window.electronAPI.openFile()

  // console.log(os.homedir())
}
const loadSetting = () => {
  window.electronAPI.loadSetting()
}

const SunRise = () => {
  let sunTime = CalculateSunTime()
  let curDate = Date.parse(currentDate().Date)
  let message = '当前日出时间' + formatSecondTime((sunTime.Sunrise - curDate ) / 1000) +
                ' \n 日落时间:' + formatSecondTime((sunTime.Sunset - curDate) / 1000)
  ElNotification({
    title: '日出日落测试',
    message,
    type:'success'
  })
}

const sendMsgIn = () => {
  ElNotification({
    title: 'Custom Position',
    message: "I'm at the top right corner",
  })
}

const sendMsg = () => {
  const NOTIFICATION_TITLE = "Title";
  const NOTIFICATION_BODY =
    "Notification from the Renderer process. Click to log to console.";
  const CLICK_MESSAGE = "Notification clicked";

  new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY}).onclick =
    () => console.log(CLICK_MESSAGE);
}

</script>

<style scoped>
.white-box .obj{
  padding: 10px;
}
</style>
