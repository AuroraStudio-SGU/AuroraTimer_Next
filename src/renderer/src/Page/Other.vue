<template>
  <el-button type="success" @click="sendMsg">测试通知</el-button><br>
  <el-button  plain @click="sendMsgIn"> 应用内通知 </el-button><br>
  <el-button type="success" @click="saveFile">上传文件</el-button><br>
</template>


<script setup>
// import {dialog} from 'electron'
import os from 'node:os'
import fs from 'fs'
import {ElNotification} from "element-plus";

const saveFile = () => {
  window.electronAPI.loging()

  // console.log(os.homedir())
}

const sendMsgIn = ()=>{
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

</style>
