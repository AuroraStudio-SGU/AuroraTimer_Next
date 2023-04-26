<template>
  <router-view v-if="!loginPanel"></router-view>
  <div class="main" v-if="loginPanel">
    <div>
      <!--    标题栏-->
    </div>
    <div class="top-bar">
      <div class="drag-bar"></div>
      <div class="window-bar">
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Min')" style="transform: scale(0.8)"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Max')" style="transform: scale(0.8)"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Close')" style="transform: scale(0.8)"/>
      </div>
    </div>
    <div class="app-box">
      <SliderBar></SliderBar>

      <router-view></router-view>
      <!--    <timer-progress :size="300" :bar-size="25"></timer-progress>-->
    </div>
    <!--    <el-slider :min="0" :max="10" :step="0.01" v-model="plex" />-->
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import TimerProgress from "./Page/TimerProgress.vue";
import Other from "./Page/Other.vue";
import {Edit} from '@element-plus/icons-vue'
import {GlobalStore} from "./stores/Global";
import * as url from "url";
import {ref} from "vue";


const loginPanel = ref(false)

//主进程通知主窗口进行渲染
try{
  window.electronAPI.changeLoginPanel((_event, value) => {
    console.log("状态修改")
    loginPanel.value = true
  })
}catch (e) {
  console.log(e)
}


const windowOperation = (op) => {
  window.electronAPI.windowOperate(op)
}

const debug = ()=>{
  const path = 'D:\\void风花节4k.jpg'
  img.value = `custom://${path}`
}

let img = ref('')


</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main {
  margin: 5PX 5PX;
  height: 99vh;
  background-color: #eef2f5;
  border-radius: 20px 20px;
  box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.2);
  transform: scale(v-bind(plex));
}

.app-box {
  display: flex;
  border-radius: 20px;
}

.drag-bar{
  border-radius: 20px;
  width: 86vw;
  height: 100%;
  background-color: #9feaf9;
  -webkit-app-region: drag;
}

.top-bar{
  border-radius: 20px;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
}

.window-bar {
  padding: 5px 5px;
  border-radius: 20px;
  width: 14vw;
  /*display: flex;*/
  /*justify-content: flex-end;*/
}
/* 自义定提示主题 */
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(201, 204, 201), rgb(213, 215, 209));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, rgb(201, 204, 201), rgb(201, 204, 201));
  right: 0;
}
/* */

</style>
