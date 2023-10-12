<template>
  <div
    class="break-words bg-base-100 w-full  shadow-lg rounded-xl " style="transform: scale(1);"
  >
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full flex justify-center">
          <div class="relative" @mouseenter="handleMoveIn" @mouseout="handleMoveOut">
<!--              <div class="avatar-box">-->
<!--                <img-->
<!--                    :src="getUrl('profile.jpg')"-->
<!--                    class="shadow-xl rounded-full align-middle border-none  max-w-[150px]"-->
<!--                />-->
<!--              </div>-->
              <div class="colbox" v-show="moveIn">
                1231331
              </div>
          </div>
        </div>
        <div class="w-full text-center mt-20">
          <div class="flex justify-center lg:pt-4 pt-8 pb-0">
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
  </div>
</template>

<script setup>
import { getUrl } from '../utils/urlUtils';
import {GlobalStore} from "../stores/Global";
import {ref} from "vue";

const globalStore = GlobalStore()

let moveIn = ref(false)

const handleMoveIn = () => {
  console.log("move in")
  moveIn.value=true;
}
const handleMoveOut = () => {
  console.log("move out")
  moveIn.value=false;
}

</script>

<style scoped>
.relative {
  width: 150px;
  height: 150px;
  background: #4c3f6d;
  position: relative;
}
.avatar-box{
  position: absolute;
  width: 150px;
  height: 150px;
  left: 0;
  top: 0;
}
.colbox {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  background: rgba(222,170,186,100%);
}
</style>
