<template>
  <div class="Retract-sidebar">
    <div class="navbar bg-base-100 fixed top-35 get-topup">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-3xl">Aurora</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered"
          />
        </div>
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
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
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
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              <span
                class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >Pro</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                ></path>
                <path
                  d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span
                class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >3</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
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
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
/* 导入的icon图标，可以换成其他icon */
.Retract-sidebar {
  
}

.sidebar-item {
  display: flex;
  align-items: center;
  height: 15%;
  @apply w-11/12;
  margin: 9px;
  border-radius: 25px;
  position: relative;
  transition: 0.3s;
  color: rgb(160, 160, 175);
}

.sidebar-item img {
  position: absolute;
}

.sidebar-item:nth-child(1)::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(25, 99, 219);
  position: absolute;
  bottom: -10px;
}

.sidebar-item:nth-child(5)::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(43, 93, 173);
  position: absolute;
  bottom: -10px;
}

.sidebar-item span {
  position: relative;
  @apply left-20;
  font-weight: 500;
  font-size: 15px;
  opacity: 0;
  transition: 0.1s;
}



.sidebar-item:hover {
  /* background-color: rgb(55, 65, 81); */
  background-color: #c73b3b;
  color: #fff;
}









.logo {
  margin-left: 10px;
  height: 40px;
  width: 40px;
}
/* 对应分组
   .green
   .blue
   .navy
   .yellow
   .red
 */

.icon {
  position: relative;
  flex-shrink: 0;
  font-size: 40px;
  color: #ffffff;
  width: 50px;
  margin: 6px;
  height: 50px;
  line-height: 75px;
  display: block;
  text-align: center;
  border-radius: 50%;
}

.icon * {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.icon:before,
.icon:after {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.icon:before {
  position: relative;
  bottom: 15px;
  color: #ffffff;
}

.icon:after {
  background: #333333;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 4px solid #000000;
  content: "";
  z-index: -1;
  border-radius: 50%;
  box-sizing: border-box;
}

.icon.blue:after {
  border-color: #2980b9;
  background-color: #123851;
}

.icon.yellow:after {
  border-color: #f39c12;
  background-color: #7f5006;
}

.icon.green:after {
  border-color: #27ae60;
  background-color: #104627;
}

.icon.navy:after {
  border-color: #34495e;
  background-color: #1b2029;
}

.icon.red:after {
  border-color: #c0392b;
  background-color: #581a14;
}

.icon:hover:after,
.icon.hover:after {
  border-color: transparent;
  animation: icon cubic-bezier(0.18, 0.14, 0.29, 1) 1s;
  border-right-color: #000000;
  border-left-color: #000000;
  border-top-color: #ffffff !important;
  border-bottom-color: #ffffff !important;
}

.icon:hover.blue,
.icon.hover.blue {
  color: #2980b9;
}

.icon:hover.blue:after,
.icon.hover.blue:after {
  border-right-color: #2980b9;
  border-left-color: #2980b9;
}

.icon:hover.yellow,
.icon.hover.yellow {
  color: #f39c12;
}

.icon:hover.yellow:after,
.icon.hover.yellow:after {
  border-right-color: #f39c12;
  border-left-color: #f39c12;
}

.icon:hover.green,
.icon.hover.green {
  color: #27ae60;
}

.icon:hover.green:after,
.icon.hover.green:after {
  border-right-color: #27ae60;
  border-left-color: #27ae60;
}

.icon:hover.navy,
.icon.hover.navy {
  color: #34495e;
}

.icon:hover.navy:after,
.icon.hover.navy:after {
  border-right-color: #34495e;
  border-left-color: #34495e;
}

.icon:hover.red,
.icon.hover.red {
  color: #c0392b;
}

.icon:hover.red:after,
.icon.hover.red:after {
  border-right-color: #c0392b;
  border-left-color: #c0392b;
}

@-webkit-keyframes icon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes icon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.set-high {
  height: 86vh;
  border-radius: 18px;
}

.get-topup {
  z-index: 99;
}
</style>
