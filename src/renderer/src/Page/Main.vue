<template>
  <div class="menu">
    <div class="white-box">
      <div class="hero h-full ">
        <div class="hero-content flex-row">
          <img
            :src="getUrl('icon.png')"
            class="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 class="text-5xl font-bold">工作室公告</h1>
            <p class="py-6">
              本周打卡时间为0小时，祝大家国庆节快乐！
            </p>
            <button class="btn btn-primary">收到！</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/common.css";
import {getUrl} from "../utils/urlUtils";</script>

<style scoped>


</style>
