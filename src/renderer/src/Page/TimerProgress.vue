<template>
  <div class="menu">
    <div class="white-box space-change">
      <div class="between">
        <div class="progress1">
          <div class="little">
            <el-progress
              :hidden="115"
              :percentage="globalStore.getTimerProgress.little"
              :stroke-width="40"
              :width="115"
              class="littleCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
          <div class="medium">
            <el-progress
              :hidden="195"
              :percentage="globalStore.getTimerProgress.middle"
              :stroke-width="40"
              :width="195"
              class="mediumCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
          <div class="big">
            <el-progress
              :hidden="270"
              :percentage="globalStore.getTimerProgress.big"
              :stroke-width="40"
              :width="270"
              class="bigCircle"
              type="circle"
            >
              <span class="percentage-label"></span>
            </el-progress>
          </div>
        </div>
        <div class="svg-box">
          <svg>
            <defs>
              <linearGradient id="little-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop
                  :style="{stopColor:globalStore.Setting.progressBar.color.small.start}"
                  offset="0%"
                  stop-opacity="0.8"
                ></stop>
                <stop
                  :style="{stopColor: globalStore.Setting.progressBar.color.small.end}"
                  offset="100%"
                  stop-opacity="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
            <defs>
              <linearGradient id="medium-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop
                  :style="{
                    stopColor:globalStore.Setting.progressBar.color.medium.start}"
                  offset="0%"
                  stop-opacity="0.8"
                ></stop>
                <stop
                  :style="{stopColor: globalStore.Setting.progressBar.color.medium.end}"
                  offset="100%"
                  stop-opacity="1"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg>
            <defs>
              <linearGradient id="big-w" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop
                  :style="{stopColor: globalStore.Setting.progressBar.color.big.start}"
                  offset="0%"
                  stop-opacity="0.8"
                ></stop>
                <stop
                  :style="{stopColor: globalStore.Setting.progressBar.color.big.end}"
                  offset="100%"
                  stop-opacity="0.9"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="container">
          <div class="flex flex-col items-center">
            <div class="time">已计时</div>
            <div class="clock">
              <countdown ref="CountDown"></countdown>
            </div>
          </div>
        </div>
      </div>
      <div class="stats shadow-md flex " style="margin-top: 15px;">
        <div class="stat place-items-center">
          <div class="stat-title">本周计时</div>
          <div class="stat-value">{{ TargetTime }}H</div>
          <div class="stat-desc">周一到周日</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">成员名</div>
          <div class="stat-value text-secondary">{{ globalStore.getUserInfo.name }}</div>
          <div class="stat-desc text-secondary">{{ globalStore.getUserInfo.id }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">本周值日</div>
          <div class="stat-desc">周三 周日</div>
          <div class="stat-value">{{ DutyList.wed }} {{ DutyList.sun }}</div>
        </div>
      </div>
      <!--      只在挂机的时候显示恢复按钮-->
      <button class="btn btn-success" style="position: absolute;right: 200px;" v-show="globalStore.isAFK"
              @click="startTimer(true)">恢复计时
      </button>
    </div>
  </div>
  <!--值日设置页面-->
  <dialog id="update" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-2xl">版本提示</h3>
      <p class="py-4">当前你的版本为{{ config.version }}},最低版本要求为{{ MiniVersion }}</p>
      <p class="py-4">不更新不会影响你的计时功能，但是不保证其它任何功能可以正常使用</p>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">我知道了</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import "../assets/css/common.css";
import {onBeforeMount, ref, toRaw} from "vue";
import {TimerStore} from "../stores/Timer";
import Countdown from "../components/Countdown.vue";
import {GlobalStore} from "../stores/Global";
import {ElNotification} from "element-plus";
import config from '../../../../package.json'
import {getMiniVersion} from "../api/API";

const globalStore = GlobalStore();
const timerStore = TimerStore();
const CountDown = ref(null);
const update = ref(null) //更新面板
const MiniVersion = ref();
const startTimer = (restart: boolean) => {
  if (!timerStore.isStarted) {
    if (CountDown.value.StartTimer() && restart) {
      ElNotification({
        title: '重新恢复计时',
        type: 'success'
      })
    }
  }
};

const DutyList = ref(
  {
    wed: '暂未公布',
    sun: '暂未公布',
    createTime: new Date(),
  }
)
const TargetTime = ref(18)
const compareVersions = (version1, version2) => {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = parseInt(v1[i] || 0);
    const num2 = parseInt(v2[i] || 0);
    if (num1 < num2) {
      return -1;
    } else if (num1 > num2) {
      return 1;
    }
  }
  return 0;
}
const checkIsTooOld = async () => {
  let version = config.version;
  let miniVersion = await getMiniVersion();
  if (!miniVersion) return false;//为空不判断
  MiniVersion.value = miniVersion;
  return compareVersions(version, miniVersion) < 0;
}
onBeforeMount(async () => {
  try {
    let dutyList = toRaw(await globalStore.getDutyList())
    DutyList.value.wed = dutyList.wed
    DutyList.value.sun = dutyList.sun
    DutyList.value.createTime = dutyList.createTime
    let res = await globalStore.getTargetTime()
    TargetTime.value = toRaw(res).targetTime
    startTimer(false);
    if (await checkIsTooOld()) {
      update.value.showModal()
    }
  } catch (e) {
  }
})


</script>


<style scoped>
.between {
  @apply flex space-x-4 items-center justify-between;
  margin-top: 10px;
}

.progress1 {
  margin-left: 30px;
  position: relative;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.little {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.medium {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
}

.big {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

:deep(.el-progress path:first-child) {
  @apply stroke-base-100;
}

:deep(.bigCircle path:first-child) {
  stroke: #b5b8ba35;
}

:deep(.littleCircle) svg > path:nth-child(2) {
  stroke: url(#little-w);
}

:deep(.mediumCircle) svg > path:nth-child(2) {
  stroke: url(#medium-w);
}

:deep(.bigCircle) svg > path:nth-child(2) {
  stroke: url(#big-w);
}

.svg-box {
  position: absolute;
  pointer-events: none;
}

.time {
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 25px;
}

.container {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.clock {
  display: flex;
}

/* 时钟的分隔 */
.clock .divider {
  font-size: 66px;
  line-height: 102px;
  font-style: normal;
  color: rgb(51, 50, 50);
}

/* 时钟的卡片 */
.clock .flip {
  position: relative;
  width: 60px;
  height: 100px;
  margin: 2px;
  font-size: 70px;
  font-weight: 700;
  line-height: 100px;
  text-align: center;
  background: rgb(46, 45, 45);
  border: 1px solid rgb(34, 33, 33);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(54, 54, 54, 0.5);
}

/* 时钟上的数字 */
.clock .flip .digital::before,
.clock .flip .digital::after {
  position: absolute;
  content: attr(data-number);
  left: 0;
  right: 0;
  color: white;
  background: rgb(51, 50, 50);
  overflow: hidden;
  -webkit-perspective: 160px;
  perspective: 160px;
}

/* 翻页前的数字 */
.clock .flip .digital::before {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid #666;
  border-radius: 10px 10px 0 0;
}

/* 翻页后的数字 */
.clock .flip .digital::after {
  top: 50%;
  bottom: 0;
  line-height: 0;
  border-radius: 0 0 10px 10px;
}

.clock .flip .back::before,
.clock .flip .front::after {
  z-index: 1;
}

.clock .flip .back::after {
  z-index: 2;
}

.clock .flip .front::before {
  z-index: 3;
}

.clock .flip .back::after {
  -webkit-transform-origin: center top;
  transform-origin: center top;
  -webkit-transform: rotateX(0.5turn);
  transform: rotateX(0.5turn);
}

.clock .flip.running .front::before {
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-animation: frontFlipDown 0.6s ease-in-out;
  animation: frontFlipDown 0.6s ease-in-out;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.clock .flip.running .back::after {
  -webkit-animation: backFlipDown 0.6s ease-in-out;
  animation: backFlipDown 0.6s ease-in-out;
}

@-webkit-keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
    transform: rotateX(0.5turn);
  }
}

@keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
    transform: rotateX(0.5turn);
  }
}

@-webkit-keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}

@keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
}

.space-change {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
