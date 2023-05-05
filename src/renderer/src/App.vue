<template>
  <router-view v-if="!loginPanel"></router-view>
  <div class="main" v-if="loginPanel">
    <div class="top-bar"><!-- 顶部栏 -->
      <div class="drag-bar"></div> <!-- 拖拽栏 -->
      <div class="window-bar"> <!-- 红 绿 灯  -->
        <div class="circle-green" @click="windowOperation('Min')" style="width: 17px;height: 17px; background-color:#65bc60;border-radius: 50%;"></div>
        <div class="circle-yellow" @click="windowOperation('Max')" style="width: 17px;height: 17px; background-color:#e7c168;border-radius: 50%;"></div>
        <div class="circle-red" @click="windowOperation('Close')" style="width: 17px;height: 17px; background-color:#e36f6c;border-radius: 50%;"></div>
      </div>
    </div>
    <div class="app-box">
      <SliderBar></SliderBar> <!-- 侧标栏显示 -->
      <router-view></router-view><!-- 路由显示 -->
    </div>
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import {ref} from "vue";
//登录状态栏
const loginPanel = ref(false)

//主进程通知主窗口进行渲染
try{
  window.electronAPI.changeLoginPanel((_event, value) => {
    loginPanel.value = true
  })
}catch (e) {
  console.error(e)
}
const windowOperation = (op) => {
  window.electronAPI.windowOperate(op)
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main {
  margin: 5px 5px ;
  height: 99vh;
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
