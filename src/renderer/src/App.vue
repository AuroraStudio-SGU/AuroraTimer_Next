<template>
  <div class="main">
    <div>
      <!--    标题栏-->
    </div>
    <div class="top-bar">
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Min')"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Max')"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Close')"/>
        <el-button type="primary" :icon="Edit" circle @click="debug"/>
    </div>
    <div class="app-box">
      <SliderBar></SliderBar>
      
      <router-view></router-view>
      <!--    <timer-progress :size="300" :bar-size="25"></timer-progress>-->
    </div>
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

const globalStore = GlobalStore()


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
  height: 95vh;
  background-color: #eef2f5;
  border-radius: 20px 20px;
  box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.2);
}

.app-box {
  
  display: flex;
  border-radius: 20px;
}

.top-bar {
  padding: 5px 5px;
  background-color: #eef2f5;
  /* -webkit-app-region: drag; */
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
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
