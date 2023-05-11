<template>
  <div class="menu">
    <div class="title">工作室公告</div>
    <div class="white-box bg-base-100">
      今天是个好日子
      <div class="xiaoxi-box">
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="../assets/icon.png" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">打卡时长</h2>
            <p>本周打卡时长改为0小时</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">收到！</button>
            </div>
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
</style>
