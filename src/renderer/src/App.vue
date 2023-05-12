<template>
  <div class="app">
    <router-view v-if="!loginPanel"></router-view>
    <div v-if="loginPanel" :data-theme="globalStore.currentTheme" class="main">
      <div class="top-bar">
        <!-- 顶部栏 -->
        <div class="drag-bar"></div>
        <!-- 拖拽栏 -->
        <div class="window-bar">
          <!-- 红 绿 灯  -->
          <div
            class="circle-green"
            style="
              width: 17px;
              height: 17px;
              background-color: #65bc60;
              border-radius: 50%;
            "
            @click="windowOperation('Min')"
          ></div>
          <div
            class="circle-yellow"
            style="
              width: 17px;
              height: 17px;
              background-color: #e7c168;
              border-radius: 50%;
            "
            @click="windowOperation('Max')"
          ></div>
          <div
            class="circle-red"
            style="
              width: 17px;
              height: 17px;
              background-color: #e36f6c;
              border-radius: 50%;
            "
            @click="windowOperation('Close')"
          ></div>
        </div>
      </div>
      <div class="navBar">
        <NavBar></NavBar>
      </div>
      <div class="sliderBar">
        <SliderBar></SliderBar>
      </div>
      <div class="app-box">
        <!-- 侧标栏显示 -->
        <router-view></router-view><!-- 路由显示 -->
      </div>
      <div class="love">
        <Love></Love>
      </div>
    </div>
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import {onBeforeMount, ref} from "vue";
import {GlobalStore} from "./stores/Global";
import Love from "./components/Love.vue";
import NavBar from "./components/NavBar.vue";
//登录状态栏
const loginPanel = ref(false);
const globalStore = GlobalStore();


const themeList = [];
//主进程处理完毕,例如登录成功,通知主窗口进行渲染
try {
  window.electronAPI.changeLoginPanel((_event, value) => {
    loginPanel.value = true;
  });
  window.electronAPI.handleSetting((_event, value) => {
    if (value) {
      console.log("从主进程加载配置文件");
      globalStore.loadAllSetting(JSON.parse(value));
    }
  });
} catch (e) {
  console.error(e);
}
const windowOperation = (op) => {
  window.electronAPI.windowOperate(op);
};


onBeforeMount(() => {
  globalStore.ThemeList.forEach((value, index) => {
    let obj = {
      label: value,
      value: value,
    };
    themeList.push(obj);
  });
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.main {
  @apply bg-base-300;
  margin: 5px 5px;
  height: 99vh;
  /* background-color: #eef2f5ee; */
  border-radius: 20px 20px;
  box-shadow: 2px 2px 2px 1px rgba(77, 77, 77, 0.07);
  transform: scale(v-bind(plex));
  backdrop-filter: blur(10px);
}

.app-box {
  display: flex;
  border-radius: 20px;
  height: 97vh;
  padding: 110px 0 0 140px;
}

.drag-bar {
  border-radius: 20px;
  width: 86vw;
  height: 100%;

  -webkit-app-region: drag;
}

.top-bar {
  @apply bg-base-200;
  border-radius: 20px 20px 0 0;
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

.love {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 400px;
}
</style>
