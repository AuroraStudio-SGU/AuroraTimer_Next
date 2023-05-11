<template>
  <div class="app">
    <router-view v-if="!loginPanel"></router-view>
    <div class="main bg-base-300" v-if="loginPanel" data-theme="valentine">
      <div class="top-bar bg-base-200" >
        <!-- 顶部栏 -->
        <div class="drag-bar"></div>
        <!-- 拖拽栏 -->
        <div class="window-bar">
          <!-- 红 绿 灯  -->
          <div
            class="circle-green"
            @click="windowOperation('Min')"
            style="
              width: 17px;
              height: 17px;
              background-color: #65bc60;
              border-radius: 50%;
            "
          ></div>
          <div
            class="circle-yellow"
            @click="windowOperation('Max')"
            style="
              width: 17px;
              height: 17px;
              background-color: #e7c168;
              border-radius: 50%;
            "
          ></div>
          <div
            class="circle-red"
            @click="windowOperation('Close')"
            style="
              width: 17px;
              height: 17px;
              background-color: #e36f6c;
              border-radius: 50%;
            "
          ></div>
        </div>
      </div>
      <SliderBar></SliderBar>
      <div class="app-box">
        
        <!-- 侧标栏显示 -->
        <router-view></router-view><!-- 路由显示 -->
      </div>
      <div class="animate">
        <div class="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div class="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>
      <div class="select-bar-self">
        <el-select
          v-model="themeSelected"
          class="m-2"
          placeholder="主题切换"
          @change="switchTheme"
          ><!-- 太多测试页面了放不下！!-->
          <el-option
            v-for="item in themeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="love">
        <p class="text">喜欢本打卡器请给个赞吧</p>
        <div class="heart">
          <div class="con-like">
            <input
              title="like"
              type="checkbox"
              class="like"
              @click="toProjectHub"
            />
            <div class="checkmark">
              <svg
                viewBox="0 0 24 24"
                class="outline"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"
                ></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                class="filled"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
                ></path>
              </svg>
              <svg
                class="celebrate"
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="10,10 20,20" class="poly"></polygon>
                <polygon points="10,50 20,50" class="poly"></polygon>
                <polygon points="20,80 30,70" class="poly"></polygon>
                <polygon points="90,10 80,20" class="poly"></polygon>
                <polygon points="90,50 80,50" class="poly"></polygon>
                <polygon points="80,80 70,70" class="poly"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import { ref } from "vue";
import { GlobalStore } from "./stores/Global";
import { onBeforeMount, onMounted } from "vue";
//登录状态栏
const loginPanel = ref(false);
let themeChanged = "light";
const globalStore = GlobalStore();
let themeSelected = ref("light");
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

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
const toProjectHub = () => {
  window.electronAPI.openBrowser(globalStore.ProjectLink);
};

const switchTheme = (theme) => {
  this.themeChanged = theme;
};
onBeforeMount(() => {
  themes.forEach((value, index) => {
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
  padding: 67px 0 0 206px;
}

.drag-bar {
  border-radius: 20px;
  width: 86vw;
  height: 100%;

  -webkit-app-region: drag;
}

.top-bar {
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

.animate {
  position: absolute;
  right: 5px;
  top: 60px;
  transform: scale(0.7);
}

.love {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 400px;
}
.heart {
  transform: scale(0.5);
}

.loader {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
}

.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
}

.con-like {
  --red: #ee427b;
  position: relative;
  width: 50px;
  height: 50px;
}

.con-like .like {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.con-like .checkmark {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con-like .outline,
.con-like .filled {
  fill: var(--red);
  position: absolute;
}

.con-like .filled {
  animation: kfr-filled 0.5s;
  display: none;
}

.con-like .celebrate {
  position: absolute;
  animation: kfr-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
}

.con-like .poly {
  stroke: var(--red);
  fill: var(--red);
}

.con-like .like:checked ~ .checkmark .filled {
  display: block;
}

.con-like .like:checked ~ .checkmark .celebrate {
  display: block;
}

@keyframes kfr-filled {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes kfr-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
    display: none;
  }
}

.select-bar-self {
  position: absolute;
  bottom: 40px;
  left: 400px;
}

</style>
