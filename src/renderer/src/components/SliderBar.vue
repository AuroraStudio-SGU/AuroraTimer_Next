<template>
  <div class="Retract-sidebar">
    <a class="sidebar-item" @click="jumpTo('Timer')"
    ><i class="icon ion-ios-gear-outline"></i><span>计时</span></a>
    <a class="sidebar-item" @click="jumpTo('Main')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>公告</span></a>
    <a class="sidebar-item" @click="jumpTo('Rank')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>排行榜</span></a>
    <a class="sidebar-item" @click="jumpTo('Other')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>测试</span></a>
    <a class="sidebar-item" @click="jumpTo('Setting')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>设置</span></a>
    <a class="sidebar-item" @click="jumpTo('Welcome')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>早安晚安动画</span></a>
    <a class="sidebar-item" @click="jumpTo('NewUI')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>新UI测试</span></a>
    <a class="sidebar-item" @click="jumpTo('Calculator')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>日历测试</span></a>
  </div>
</template>
<script setup>
import {getUrl} from '../utils/urlUtils'
import {router} from '../utils/router'

const jumpTo = (local) => {
  router.push({
    name: local
  })
}
</script>

<style scoped>
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
/* 导入的icon图标，可以换成其他icon */
.Retract-sidebar {
  margin-top: 15px;
  width: 10%;
  height: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  opacity: 0.99;
  transition: 0.3s;
  border-radius: 25px;
  overflow: hidden;
  margin-right: 40px;
  margin-left: 20px;
  box-shadow: 2px 2px 9px 2px rgba(90, 90, 90, 0.2);
}

.sidebar-item {
  display: flex;
  align-items: center;
  height: 15%;
  @apply w-11/12;
  margin: 9px;
  border-radius: 25px;
  position: relative;
  transition: 0.3s;
  color: rgb(160, 160, 175);
}

.sidebar-item img {
  position: absolute;
}

.sidebar-item:nth-child(1)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(25, 99, 219);
  position: absolute;
  bottom: -10px;
}

.sidebar-item:nth-child(5)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(43, 93, 173);
  position: absolute;
  bottom: -10px;
}

.sidebar-item span {
  position: relative;
  @apply left-20;
  font-weight: 500;
  font-size: 15px;
  opacity: 0;
  transition: 0.1s;
}

.Retract-sidebar:hover {
  width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-item:hover {
  /* background-color: rgb(55, 65, 81); */
  background-color: #c73b3b;
  color: #fff;

}

.Retract-sidebar:hover span {
  opacity: 1;
}

.Retract-sidebar:nth-child(1) {
  background-color: rgb(255, 255, 255);
  opacity: 0.99;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.Retract-sidebar:nth-child(1) .sidebar-item:hover {
  background-color: rgb(227, 227, 227);
  transform: scale(1.2);
  transition: all 0.5s;
  color: #0077ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.Retract-sidebar:nth-child(1) .sidebar-item {
  color: rgb(82, 82, 82);
}

.logo {
  margin-left: 10px;
  height: 40px;
  width: 40px;
}
/* 对应分组
   .green
   .blue
   .navy
   .yellow
   .red
 */

.icon {
  position: relative;
  flex-shrink: 0;
  font-size: 40px;
  color: #ffffff;
  width: 50px;
  margin: 6px;
  height: 50px;
  line-height: 75px;
  display: block;
  text-align: center;
  border-radius: 50%;
}

.icon * {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.icon:before,
.icon:after {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.icon:before {
  position: relative;
  bottom: 15px;
  color: #ffffff;
}

.icon:after {
  background: #333333;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 4px solid #000000;
  content: '';
  z-index: -1;
  border-radius: 50%;
  box-sizing: border-box;
}

.icon.blue:after {
  border-color: #2980b9;
  background-color: #123851;
}

.icon.yellow:after {
  border-color: #f39c12;
  background-color: #7f5006;
}

.icon.green:after {
  border-color: #27ae60;
  background-color: #104627;
}

.icon.navy:after {
  border-color: #34495e;
  background-color: #1b2029;
}

.icon.red:after {
  border-color: #c0392b;
  background-color: #581a14;
}

.icon:hover:after,
.icon.hover:after {
  border-color: transparent;
  animation: icon cubic-bezier(0.18, 0.14, 0.29, 1) 1s;
  border-right-color: #000000;
  border-left-color: #000000;
  border-top-color: #ffffff !important;
  border-bottom-color: #ffffff !important;
}

.icon:hover.blue,
.icon.hover.blue {
  color: #2980b9;
}

.icon:hover.blue:after,
.icon.hover.blue:after {
  border-right-color: #2980b9;
  border-left-color: #2980b9;
}

.icon:hover.yellow,
.icon.hover.yellow {
  color: #f39c12;
}

.icon:hover.yellow:after,
.icon.hover.yellow:after {
  border-right-color: #f39c12;
  border-left-color: #f39c12;
}

.icon:hover.green,
.icon.hover.green {
  color: #27ae60;
}

.icon:hover.green:after,
.icon.hover.green:after {
  border-right-color: #27ae60;
  border-left-color: #27ae60;
}

.icon:hover.navy,
.icon.hover.navy {
  color: #34495e;
}

.icon:hover.navy:after,
.icon.hover.navy:after {
  border-right-color: #34495e;
  border-left-color: #34495e;
}

.icon:hover.red,
.icon.hover.red {
  color: #c0392b;
}

.icon:hover.red:after,
.icon.hover.red:after {
  border-right-color: #c0392b;
  border-left-color: #c0392b;
}

@-webkit-keyframes icon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes icon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
