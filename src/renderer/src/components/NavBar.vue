<template>
  <div class="navbar bg-base-100 get-topup">
    <div class="flex-1">
      <div class="tooltip" :data-tip="config.version">
        <a class="btn btn-ghost normal-case text-3xl rounded-box">Aurora</a
        ><!--打算在这里显示版本信息(或者测试用途)-->
      </div>
      <div
          v-if="globalStore.isAFK"
          class="badge font-semibold"
          style="margin-left: 80px"
      >
        挂机中
      </div>
      <div
          v-else
          class="badge font-semibold"
          style="margin-left: 80px"
      >
        计时中
      </div>
    </div>

    <div class="flex-none gap-2 font-f">
      <LoaderTriangle></LoaderTriangle>
    </div>
    <div class="dropdown dropdown-end">
      <label
          class="btn btn-ghost btn-circle"
          :class="{
          'avatar online': !globalStore.isAFK,
          'avatar offline': globalStore.isAFK,
        }"
          tabindex="0"
      >
        <div class="w-10 rounded-full">
          <img :src="globalStore.Setting.userInfo.avatar + '?' + globalStore.AvatarUpdateFlag"/>
        </div>
      </label>
      <ul
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
          tabindex="0"
      >
        <li>
          <a class="justify-between" @click="jumpTo('Info')"> 个人信息 </a>
        </li>
        <li><a @click="jumpTo('Setting')">设置</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import LoaderTriangle from "./LoaderTriangle.vue";
import {GlobalStore} from "../stores/Global";
import {router} from "../utils/router";
import {onBeforeMount, ref} from "vue";
import {getAvatarById} from "../api/API";
import {ElNotification} from "element-plus";
import config from '../../../../package.json'

const globalStore = GlobalStore();

let avatar = ref('');

const loadAvatar = async () => {
  let res = await getAvatarById(globalStore.Setting.userInfo.id)
  if (!res.success) {
    ElNotification({
      title: "请求失败！",
      message: "系统异常",
      type: "error"
    });
  } else {
    avatar.value = res.data + '?' +Math.random();
  }
}
onBeforeMount(async ()=>{
  await loadAvatar();
})


const jumpTo = (local) => {
  router.push({
    name: local,
  });
};
</script>


<style scoped>
.get-topup {
  @apply rounded-box;
  /* top: 55px;
  left: 140px;
  width: 85%;
  */
  width: 100%;
  height: 100%;
}
</style>
