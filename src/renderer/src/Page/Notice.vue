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
            <div class="py-6" ref="noticeContext">
            </div>
            <button class="btn btn-primary">收到！</button>
          </div>
        </div>
      </div>
      <!--      <div class="container">-->
      <!--        <div class="item" v-for="item in items" :key="item.id">{{item.name}}111</div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import "../assets/css/common.css";
import {getUrl} from "../utils/urlUtils";
import {onMounted, ref} from "vue";
import {AdminStore} from "../stores/Admin";

const adminStore = AdminStore()
const noticeContext = ref(null)

function isNotEmptyStr(s) {
  return typeof s == 'string' && s.length > 0;
}

onMounted(async () => {
  let notice = await adminStore.getNotice()
  if (notice == null || isNotEmptyStr(notice)) {
    notice = `<p> 负责人还没写公告呢~ </p>`
    noticeContext.value.innerHTML = notice
  } else {
    noticeContext.value.innerHTML = notice
  }
})

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.item {
  margin: 0 10px;
}

</style>
