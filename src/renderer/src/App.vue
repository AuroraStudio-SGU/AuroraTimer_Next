<template>
  <div class="main">
    <div>
      <!--    标题栏-->
    </div>
    <div class="top-bar">
      <div class="drag-bar"></div>
      <div class="window-bar">
        <div class="circle-green" @click="windowOperation('Min')" style="width: 17px;height: 17px; background-color:#65bc60;border-radius: 50%;"></div>
        <div class="circle-yellow" @click="windowOperation('Max')" style="width: 17px;height: 17px; background-color:#e7c168;border-radius: 50%;"></div>
        <div class="circle-red" @click="windowOperation('Close')" style="width: 17px;height: 17px; background-color:#e36f6c;border-radius: 50%;"></div>
        <!-- <el-button type="primary" :icon="Edit" circle @click="windowOperation('Min')" style="transform: scale(0.8)"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Max')" style="transform: scale(0.8)"/>
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Close')" style="transform: scale(0.8)"/> -->
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


const globalStore = GlobalStore()

const plex = ref(1)


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
  margin: 5px 5px ;
  height: 97vh;
  background-color: #eef2f5;
  border-radius: 20px 20px;
  box-shadow: 2px 2px 2px 1px rgba(77, 77, 77, 0.2);
  transform: scale(v-bind(plex));
}

.app-box {
  display: flex;
  border-radius: 20px;
  height: 97vh;
  
}

.drag-bar{
  border-radius: 20px;
  width: 86vw;
  height: 100%;
  
  -webkit-app-region: drag;
}

.top-bar{
  border-radius: 20px;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}

.window-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 5px;
  border-radius: 20px;
  width: 11vw;
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
