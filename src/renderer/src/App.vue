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
        <router-view></router-view
        ><!-- 路由显示 -->
      </div>
      <div class="love">
        <Love></Love>
      </div>
      <div class="star">
        <button class="button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
              fill="white"
            ></path>
          </svg>
          <p class="text">Star</p>
        </button>
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


/* star */
.star {
  position: absolute;
  bottom: 9px;
  left: 200px;
  transform: scale(0.9);
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  @apply bg-primary;
  outline: 3px solid;
  outline-offset: -3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 400ms;
}

.button .text {
  @apply text-primary-content;
  font-weight: 700;
  font-size: 1em;
  transition: 400ms;
}

.button svg path {
  transition: 400ms;
  @apply  fill-primary-content;
}

.button:hover {
  background-color: transparent;
}

.button:hover .text {
  @apply text-current;
}

.button:hover svg path {
  @apply  fill-current;
}
</style>
