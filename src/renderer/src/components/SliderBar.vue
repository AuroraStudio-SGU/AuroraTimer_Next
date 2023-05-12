<template>
  <div class="Retract-sidebar">
    <div class="navbar bg-base-100 get-topup fixed">
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
              <img :src="getUrl('profile.jpg')" />
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
    <div class="fixed mt-20 left-8 " style="transform: scale(1.3);">
      <ul class="menu bg-base-100 p-2 rounded-box side-bar-self">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
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
.side-bar-self {
  height: 68vh;
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
  border-radius: 20px;
  width: 123vh;
  top: 55px;
  left: 140px;
}
</style>
