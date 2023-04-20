<template>
  <div class="Retract-sidebar">
    <a  class="sidebar-item" @click="toTimer"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>Timer</span></a>
    <a  class="sidebar-item" @click="toMain"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>Main</span></a>
    <a  class="sidebar-item" @click="jumpTo('Rank')"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>About</span></a>
    <a  class="sidebar-item"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>wallet</span></a>
    <a  class="sidebar-item"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>picture</span></a>
    <a  class="sidebar-item"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>or-code</span></a>
    <a  class="sidebar-item"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>save</span></a>
    <a  class="sidebar-item"><img :src="getUrl('icon.png')" style="height: 50px;width: 50px" alt=""><span>leave</span></a>
  </div>
</template>

<script setup>

import {getUrl} from "../utils/urlUtils";
import {router} from "../utils/router";

const toTimer = ()=>{
  console.log('toTimer')
  router.push({
    path:'/'
  })
}

const toMain = ()=>{
  console.log('toMainr')
  router.push({
    path:'/main'
  })
}

const jumpTo = (local)=>{
  router.push({
    name:local
  })
}

</script>

<style scoped>
.Retract-sidebar {
  width: 100px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(17, 24, 39);
  border-radius: 10px;
  transition: .3s;
  overflow: hidden;
  margin-right: 40px;

}
.sidebar-item {
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: .3s;
  color: rgb(160, 160, 175);
}
.sidebar-item i {
  margin-left: 27px;
  font-size: 30px;
  position: absolute;
  margin-top: 10px;
}
.sidebar-item:nth-child(1)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
}
.sidebar-item:nth-child(5)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
}
.sidebar-item span {
  position: relative;
  left: 80px;
  font-weight: 500;
  font-size: 15px;
  opacity: 0;
  transition: 0.1s;
}
.Retract-sidebar:hover {
  width: 270px;
}
.sidebar-item:hover {
  background-color: rgb(55, 65, 81);
  color: #fff;
}
.Retract-sidebar:hover span {
  opacity: 1;
}

.Retract-sidebar:nth-child(1) {
  background-color: rgb(49, 46, 129);
}
.Retract-sidebar:nth-child(1) .sidebar-item:hover {
  background-color: rgb(209, 213, 219);
  color: rgb(67, 56, 202);
}
.Retract-sidebar:nth-child(1) .sidebar-item {
  color: rgb(140, 120, 240);
}
</style>
