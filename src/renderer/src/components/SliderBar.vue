<template>
  <div class="Retract-sidebar">
    <div class="navbar bg-base-100 fixed top-35 get-topup">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-3xl">Aurora</a>
      </div>
      <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="getUrl('icon.png')" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
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
    <aside
      id="default-sidebar"
      class="fixed bottom-0 left-0 w-50 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div
        class="set-high px-3 py-5 overflow-y-auto bg-base-100 dark:bg-gray-800"
      >
        <ul class="space-y-2 font-medium">
          <li>
            <a
              @click="jumpTo('Timer')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg-1"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#chart"></use>
              </svg>
              <span class="ml-3">打卡器</span>
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('Main')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#square"></use>
              </svg>
              <span class="navbar-span">公告</span>
              <span
                class="navbar-span-icon-2"
                >Pro</span
              >
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('Rank')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#download"></use>
              </svg>
              <span class="navbar-span">排行榜</span>
              <span
                class="navbar-span-icon-1"
                >3</span
              >
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('Welcome')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#user"></use>
              </svg>
              <span class="navbar-span">日落测试</span>
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('Other')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#shop"></use>
              </svg>
              <span class="navbar-span">测试功能页</span>
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('IconTest')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#login-in"></use>
              </svg>
              <span class="navbar-span">图标测试</span>
            </a>
          </li>
          <li>
            <a
              @click="jumpTo('NewUI')"
              class="navbar-a"
            >
              <svg
                class="navbar-svg"
              >
                <use xlink:href="../assets/svg/SliderBarIcons.svg#login-out"></use>
              </svg>
              <span class="navbar-span">新UI测试</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script setup>
import { getUrl } from "../utils/urlUtils";
import { router } from "../utils/router";

const jumpTo = (local) => {
  router.push({
    name: local,
  });
};
</script>

<style scoped>
.navbar-a{
  @apply flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700;
}
.navbar-svg-1{
  @apply w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white;
}
.navbar-svg{
  @apply flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white;
}
.navbar-span{
  @apply flex-1 ml-3 whitespace-nowrap;
}
.navbar-span-icon-1{
  @apply inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300;
}
.navbar-span-icon-2{
  @apply inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300;
}

.set-high {
  height: 86vh;
  border-radius: 18px;
}

.get-topup {
  z-index: 99;
}
</style>
