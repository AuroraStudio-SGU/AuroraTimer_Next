<template>
  <div
    class="break-words bg-base-100 w-full shadow-lg rounded-xl"
    style="transform: scale(1)"
  >
    <div class="top-white"></div>
    <div>
      <div class="flex flex-wrap justify-center">
        <div class="secondary"></div>
        <div class="w-full flex justify-center absolute">
          <div
            class="relative"
            @mouseenter="handleMoveIn"
            @mouseleave="handleMoveOut"
          >
            <div class="avatar-box">
              <img
                :src="getUrl('profile.jpg')"
                class="shadow-xl rounded-full align-middle border-4 border-base-100 max-w-[150px]"
              />
            </div>
            <div class="colbox" v-show="moveIn">点击修改头像</div>
          </div>
        </div>
        <div class="w-full text-center mt-5">
          <div class="flex justify-center lg:pt-4 pb-0 pt-14">
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
                >前端</span
              >
              <span class="text-sm text-slate-400">方向</span>
            </div>
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
                >21级</span
              >
              <span class="text-sm text-slate-400">年级</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-2">
        <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
          {{ globalStore.getUserInfo.name }}
        </h3>
        <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
          <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i
          >物联网工程
        </div>
      </div>
    </div>
    <div class="button-group flex justify-center items-center" >
      <button class="btn btn-outline btn-primary" style="margin-right: 30px;">编辑个人信息</button>
      <button class="btn btn-outline btn-primary">退 出 登 录</button>
    </div>
  </div>
</template>

<script setup>
import { getUrl } from "../utils/urlUtils";
import { GlobalStore } from "../stores/Global";
import { ref } from "vue";

const globalStore = GlobalStore();

let moveIn = ref(false);

const handleMoveIn = () => {
  console.log("move in");
  moveIn.value = true;
};
const handleMoveOut = () => {
  console.log("move out");
  moveIn.value = false;
};
</script>

<style scoped>
.relative {
  width: 150px;
  height: 150px;
}
.avatar-box {
  position: absolute;
  width: 150px;
  height: 150px;
}
.colbox {
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(86, 86, 86, 0.5);
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  color: aliceblue;
}
.secondary {
  @apply bg-accent;
  width: 100%;
  height: 75px;
}
.top-white {
  @apply bg-accent;
  width: 100%;
  height: 40px;
  border-radius: 10px 10px 0 0;
}

/* .button-group {
  display: flex;
  align-items: center;
} */
</style>
