<template>
  <div class="app">
    <router-view v-if="!loginPanel"></router-view>
    <div
      v-if="loginPanel"
      :data-theme="globalStore.getCurrentTheme"
      class="main"
    >
      <div class="top-bar">
        <!-- 顶部栏 -->
        <div class="drag-bar"></div>
        <!-- 拖拽栏 -->
        <div class="window-bar">
          <!-- 红 绿 灯  -->
          <div class="circle-green" @click="windowOperation('Min')">
            <img :src="getUrl('min.png')" class="icony" />
          </div>
          <div class="circle-yellow" @click="windowOperation('Max')">
            <img :src="getUrl('max.png')" class="icony" />
          </div>
          <div class="circle-red" @click="windowOperation('Close')">
            <img :src="getUrl('close.png')" class="icony" />
          </div>
        </div>
      </div>
      <div class="some-change">
        <div class="sliderBar">
          <SliderBar></SliderBar>
        </div>
        <div class="top-bottom">
          <div class="navBar">
            <NavBar></NavBar>
          </div>
          <div class="app-box">
            <!-- 侧标栏显示 -->
            <router-view></router-view>
            <!-- 路由显示 -->
          </div>
        </div>
        <div class="love">
          <Love></Love>
        </div>
        <div class="star">
          <star></star>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import { onBeforeMount, ref } from "vue";
import { GlobalStore } from "./stores/Global";
import Love from "./components/Love.vue";
import NavBar from "./components/NavBar.vue";
import Star from "./components/Star.vue";
import { init } from "./api/API";
import { getUrl } from "./utils/urlUtils";

//登录状态栏
const loginPanel = ref(false);
const globalStore = GlobalStore();

const themeList = [];
let usingTime;
let mainProcessTime;
//主进程处理完毕,例如登录成功,通知主窗口进行渲染
try {
  window.electronAPI.changeLoginPanel((_event, value) => {
    loginPanel.value = true;
    let param = JSON.parse(value);
    let currentTime = new Date().getTime();
    let offsetTime = currentTime - param.startTime;
    usingTime = "启动用时(ms):" + offsetTime;
    mainProcessTime = "主程序用时(ms):" + param.processTime;
    window.electronAPI.mainLogger(usingTime);
    window.electronAPI.mainLogger(mainProcessTime);
  });
  window.electronAPI.handleSetting((_event, value) => {
    if (value) {
      console.log("从主进程加载配置文件");
      globalStore.loadAllSetting(JSON.parse(value));
      init(globalStore.Setting.netWork.host,globalStore.Setting.userInfo.token);
    }
  });
  window.electronAPI.OnDateFromMain((_event, value) => {
    console.log("从主进程加载数据");
    if (value) {
      if (value.type === "UserInfo") {
        globalStore.setUserInfo(value.data);
      }
      if (value.type === "Setting") {
        globalStore.Setting = value.data;
      }
      init(globalStore.Setting.netWork.host,globalStore.Setting.userInfo.token);
    }
    //检查配置情况
    setTimeout(()=>{
      console.log("检查配置文件")
      let id = undefined
      try{
        id = globalStore.Setting.userInfo.id;
        if(!id){
          //reload config
          window.electronAPI.ReloadConfig()
        }
      }catch (e) {
        //reload config
        window.electronAPI.ReloadConfig()
      }
    },1000)
  });
} catch (e) {
  console.error(e);
}
const windowOperation = (op) => {
  window.electronAPI.windowOperate(op);
};

onBeforeMount(() => {
  //加载主题列表
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
@import url("https://fonts.googleapis.com/css?family=Sanchez");

* {
  margin: 0;
  padding: 0;
  font-family: "Sanchez", "WenKai-B", serif;
}

@font-face {
  font-family: "WenKai-B"; /*字体名称*/
  src: url("./assets/LXGWWenKai-Bold.ttf"); /*字体源文件*/
}

.main {
  @apply bg-base-300;
  margin: 5px 5px;
  height: 99vh;
  /* background-color: #eef2f5ee; */
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(77, 77, 77, 0.07);
  transform: scale(v-bind(plex));
  backdrop-filter: blur(10px);
}

.drag-bar {
  border-radius: 10px;
  width: 120vw;
  height: 100%;

  -webkit-app-region: drag;
}

.top-bar {
  @apply bg-base-200;
  border-radius: 10px 10px 0 0;
  height: 5vh;
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
  width: 100px;
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

/* star */
.star {
  position: absolute;
  bottom: 9px;
  left: 200px;
  transform: scale(0.9);
}

.circle-green:hover {
  background-color: #2dcc72;
  transform: scale(1.2);
}

.circle-red:hover {
  background-color: #ea6759;
  transform: scale(1.2);
}

.circle-yellow:hover {
  background-color: #ffcc00;
  transform: scale(1.2);
}

.circle-green {
  width: 14px;
  height: 14px;
  background-color: #62d995;
  border-radius: 50%;
  transition: color 0.4s ease;
  transition: transform 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-yellow {
  width: 14px;
  height: 14px;
  background-color: #ffd941;
  border-radius: 50%;
  transition: color 0.4s ease;
  transition: transform 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-red {
  width: 14px;
  height: 14px;
  background-color: #ef887d;
  border-radius: 50%;
  transition: color 0.4s ease;
  transition: transform 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.some-change {
  display: flex;
  align-items: center;
  padding: 20px 35px 93px 35px;
  height: 100%;
}

.top-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-box {
  display: flex;
  border-radius: 10px;
  height: 85%;

  /* padding: 110px 0 0 140px; */
}

.navBar {
  /* padding: 24px 1000px 0 140px; */
  position: relative;
}

.sliderBar {
  height: 100%;
  margin-right: 35px;
  width: 100px;
}

.icony {
  width: 10px;
  height: 10px;
}
</style>
