<template>
  <div class="menu">
    <div class="white-box">
      <div class="hero h-full">
        <div class="hero-content flex-row">
          <img
            :src="getUrl('icon.png')"
            class="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 class="text-5xl font-bold">工作室公告</h1>
            <div class="py-6" ref="noticeContext"></div>
            <button class="btn btn-primary">收到！</button>
          </div>
        </div>
      </div>
      <!--      <div class="container">-->
      <!--        <div class="item" v-for="item in items" :key="item.id">{{item.name}}111</div>-->
      <!--      </div>-->
      <div class="about-guys">处刑榜</div>
      <div class="align">
        <div class="card">
          <div class="photo"><img :src="getUrl('keli.jpg')" alt="" /></div>
          <h1>打卡时长不达标(0h)</h1>
          <h2>欧润丰</h2>
        </div>
        <div class="card">
          <div class="photo"><img :src="getUrl('caos.jpg')" alt="" /></div>
          <h1>打卡时长不达标(4h)</h1>
          <h2>欧润丰</h2>
        </div>
        <div class="card">
          <div class="photo"><img :src="getUrl('hutao.jpg')" alt="" /></div>
          <h1>打卡时长不达标(7h)</h1>
          <h2>欧润丰</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/common.css";
import { getUrl } from "../utils/urlUtils";
import { onMounted, ref } from "vue";
import { AdminStore } from "../stores/Admin";

const adminStore = AdminStore();
const noticeContext = ref(null);

function isNotEmptyStr(s) {
  return typeof s == "string" && s.length > 0;
}

onMounted(async () => {
  let notice = await adminStore.getNotice();
  if (notice == null || isNotEmptyStr(notice)) {
    notice = `<p> 负责人还没写公告呢~ </p>`;
    noticeContext.value.innerHTML = notice;
  } else {
    noticeContext.value.innerHTML = notice;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.item {
  margin: 0 10px;
}

.align {
  display: flex;
}

.about-guys {
  text-align: center;
  @apply text-base;
  font-size: xx-large;

}
.card {
  position: relative;
  width: 200px;
  height: 257px;
  margin: 20px;
  @apply bg-primary;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply text-base-content;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  /* 不让其被挤压 */
  /* 这个属性兼容性差 */
  /* flex-shrink: 0; */
}
.card .photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card .photo {
  width: 100%;
  height: 100%;
  position: absolute;
  /* width: 100%;
    height: 250px; */
  top: 0;
  border-radius: 0%;
  overflow: hidden;
  transition: 0.5s;
}
.card:hover .photo {
  top: 30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}
.card h1 {
  position: absolute;
  top: 370px;
  transition: 0.5s;
}
.card:hover h1 {
  top: 170px;
}
/* 这里加个黑色的透明的渐变背景，可以更好的看清楚名字 */
.card .photo::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, transparent 50%, #222);
}
.card h2 {
  margin-top: 220px;
  width: 80%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.card p {
  width: 90%;
  /* 文本段落的第一行缩进 */
  text-indent: 32px; /*2em*/
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 30px;
}
.card a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 32px;
  border-radius: 8px;
}
.card a:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
