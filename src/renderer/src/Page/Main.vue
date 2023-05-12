<template>
  <div class="menu">
    <div class="white-box bg-base-100">
      <div class="hero min-h-screen bg-base-100">
        <div class="hero-content flex-col lg:flex-row">
          <img
          :src="getUrl('icon.jpg')"
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
</script>

<style scoped>
.xiaoxi-box {
  transform: scale(0.7);
}
.white-box {
  width: 123vh;
  border-radius: 20px;
}
</style>
