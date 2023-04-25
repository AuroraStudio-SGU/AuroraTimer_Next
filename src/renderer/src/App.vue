<template>
  <div class="main" :style="{ backgroundImage: `url(${img})` }">
    <div>
      <!--    标题栏-->
    </div>
    <div class="top-bar">
      <el-tooltip content="最小化" effect="customized">
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Min')"/>
      </el-tooltip>
      <el-tooltip content="最大化" effect="customized">
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Max')"/>
      </el-tooltip>
      <el-tooltip content="关闭窗口" effect="customized">
        <el-button type="primary" :icon="Edit" circle @click="windowOperation('Close')"/>
      </el-tooltip>
      <el-tooltip content="更改图片" effect="customized">
        <el-button type="primary" :icon="Edit" circle @click="debug"/>
      </el-tooltip>
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
}

.app-box {
  justify-content: space-between;
  display: flex;
}

.top-bar {
  width: 100%;
  height: 10%;
  background-color: #ff0000;
  /*-webkit-app-region: drag;*/
}
/* 自义定提示主题 */
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
/* */

</style>
