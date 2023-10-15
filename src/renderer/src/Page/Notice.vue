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
          <div class="photo"><img :src="Last3[0].avatar" alt=""/></div>
          <h2>{{ Last3[0].name }}</h2>
        </div>
        <div class="card">
          <div class="photo"><img :src="Last3[1].avatar" alt=""/></div>
          <h2>{{ Last3[1].name }}</h2>
        </div>
        <div class="card">
          <div class="photo"><img :src="Last3[2].avatar" alt=""/></div>
          <h2>{{ Last3[2].name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../assets/css/common.css";
import {AdminStore} from "../stores/Admin";
import {onBeforeMount, ref, toRaw} from "vue";
import {getUrl} from "../utils/urlUtils";
import {UserTime_avtar} from "../api/interfaces/Schema";
import {getAvatarById, getLast3} from "../api/API";
import {ElNotification} from "element-plus";

const adminStore = AdminStore();
const noticeContext = ref(null);

function isNotEmptyStr(s: string) {
  return typeof s == "string" && s.length > 0;
}


let empty: UserTime_avtar = {
  avatar: "",
  id: '', name: "获取失败", reduceTime: 0, totalTime: 0, unfinishedCount: 0, weekTime: 0
}
let Last3s = [
  empty, empty, empty
]
let Last3 = ref<UserTime_avtar[]>(Last3s);


const loadLast3 = async () => {
  let res = await getLast3()
  if (!res.success) {
    ElNotification({
      title: "请求失败！",
      message: "系统异常",
      type: "error"
    });
  } else {
    Last3.value = res.data;
    for (let i = 0; i < Last3.value.length; i++) {
      let res = await getAvatarById(Last3.value[i].id)
      if (res.success) {
        Last3.value[i].avatar = res.data;
      }
    }
  }
}

onBeforeMount(async () => {
  let notice = toRaw(await adminStore.getNotice());
  if (notice == null || !isNotEmptyStr(notice.notice)) {
    noticeContext.value.innerHTML = `<p> 负责人还没写公告呢~ </p>`
  } else {
    noticeContext.value.innerHTML = notice.notice
  }
  await loadLast3();
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
