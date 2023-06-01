<template>
  <div
    class="relative   break-words bg-base-100 w-full  shadow-lg rounded-xl " style="transform: scale(1);"
  >
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full flex justify-center">
          <div class="relative">
            <img
              :src="getUrl('profile.jpg')"
              class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
            />
          </div>
        </div>
        <div class="w-full text-center mt-20">
          <div class="flex justify-center lg:pt-4 pt-8 pb-0">
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
                >前端</span
              >
              <span class="text-sm text-slate-400">职位</span>
            </div>
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
                >web开发</span
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
          黄梓聪
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

</script>

<style scoped>
</style>
