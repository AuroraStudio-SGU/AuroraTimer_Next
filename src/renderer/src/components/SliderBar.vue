<template>
  <div class="Retract-sidebar">
    <a class="sidebar-item" @click="jumpTo('Timer')"
    ><img :src="getUrl('icon.png')" alt="" class="logo"/><span>计时</span></a>
    <a class="sidebar-item" @click="jumpTo('Main')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>公告</span></a>
    <a class="sidebar-item" @click="jumpTo('Rank')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>排行榜</span></a>
    <a class="sidebar-item" @click="jumpTo('Other')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>测试</span></a>
    <a class="sidebar-item" @click="jumpTo('About')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>设置</span></a>
    <a class="sidebar-item" @click="jumpTo('Welcome')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>早安晚安动画</span></a>
    <a class="sidebar-item" @click="jumpTo('IconTest')"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>图标测试</span></a>
    <a class="sidebar-item"
    ><img :src="getUrl('icon.png')" class="logo" alt=""/><span>leave</span></a>
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
.Retract-sidebar {

  margin-top: 15px;
  width: 7%;
  height: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  transition: 0.3s;
  border-radius: 25px;
  overflow: hidden;
  margin-right: 40px;
  margin-left: 20px;
  box-shadow: 2px 2px 9px 2px rgba(90, 90, 90, 0.2);
}

.sidebar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15%;
  width: 85%;
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
  left: 100px;
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
</style>
