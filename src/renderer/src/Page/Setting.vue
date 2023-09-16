<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title p-4">设置功能</div>
      <div class="color-setting p-4">
        <div class="colorSet">
          <div>
            <span class="demonstration">进度条1(&lt;24h)渐变色0%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.big.start"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
          <div>
            <span class="demonstration">进度条1(&lt;24h)渐变色100%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.big.end"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
          <div>
            <span class="demonstration">进度条2(&lt;48h)渐变色0%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.medium.start"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
          <div>
            <span class="demonstration">进度条2(&lt;48h)渐变色100%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.medium.end"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
          <div>
            <span class="demonstration">进度条3(&lt;72h)渐变色0%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.small.start"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
          <div>
            <span class="demonstration">进度条3(&lt;72h)渐变色100%</span>
            <el-color-picker v-model="globalStore.Setting.progressBar.color.small.end"
                             :predefine="lastChoice" @change="addChoiceList"/>
          </div>
        </div>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">服务器地址</span>
        </label>
        <input type="text" v-model="globalStore.Setting.netWork.host"
               placeholder="服务器地址" class="input input-primary input-bordered w-full max-w-xs"
        />
      </div>
      <div class="dark-mode p-4">
        <p class="text">切换黑夜/白天模式(无功能)</p>
        <div class="switch">
          <label class="switch">
            <input type="checkbox"/>
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="operation p-4">
        <el-button plain type="success" @click="ColorSelector">想自己取个色？</el-button>
        <el-button plain type="default" @click="SaveSetting">保存!</el-button>
        <el-button plain type="info" @click="ResetSetting">重置默认设置</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/common.css'
import {ElNotification} from "element-plus";
import * as SettingJS from "../utils/Setting";
import {onMounted, ref} from "vue";
import {GlobalStore} from "../stores/Global";
import {init} from "../api/API";

let lastChoice = ref([]);
const globalStore = GlobalStore()
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
  let flag = window.electronAPI.SaveSetting(JSON.stringify(globalStore.Setting))
  if (flag) {
    //加载渲染进程当中需要更新的设置
    init(globalStore.Setting.netWork.host)
    ElNotification({
      title: '保存成功',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '保存失败',
      type: 'error'
    })
  }
}
const ResetSetting = () => {
  let DefaultSetting = SettingJS.DefaultSetting
  globalStore.Setting = DefaultSetting
  let flag = window.electronAPI.SaveSetting(JSON.stringify(DefaultSetting))
  if (flag) {
    ElNotification({
      title: '重置成功',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '保存失败',
      type: 'error'
    })
  }
}

const addChoiceList = (value) => {
  if (!value) return
  if (lastChoice.value.length >= 20) {
    lastChoice.value.pop()
  }
  lastChoice.value.push(value)
}


</script>

<style scoped>
.demonstration {
  margin-right: 16px;
}

.colorSet {
  @apply grid gap-1 grid-cols-2 grid-rows-3;
}
.operation {
  @apply grid gap-1 grid-cols-4;
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
