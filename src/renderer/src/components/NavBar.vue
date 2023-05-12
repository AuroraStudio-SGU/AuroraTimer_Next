<template>
  <div class="navbar bg-base-100 get-topup fixed">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-3xl">Aurora</a>
    </div>
    <div class="flex-none gap-2">
      <LoaderTriangle></LoaderTriangle>
      <div class="dropdown dropdown-end">
        <label class="btn btn-ghost btn-circle avatar" tabindex="0">
          <div class="w-10 rounded-full">
            <img :src="getUrl('profile.jpg')"/>
          </div>
        </label>
        <ul
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          tabindex="0"
        >
          <li>
            <a class="justify-between">
              个人信息
              <span class="badge">New</span>
            </a>
          </li>
          <li><a @click="jumpTo('Setting')">设置</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getUrl} from "../utils/urlUtils";
import LoaderTriangle from "./LoaderTriangle.vue";</script>

<style scoped>
.get-topup {
  z-index: 99;
  border-radius: 20px;
  @apply w-10/12;
  top: 55px;
  left: 140px;
}
</style>
