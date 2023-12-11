<template>
  <div class="big-box bg-base-300 font-semibold" data-theme="cupcake">
    <div class="container">
      <div class="welcome">
        <div class="pinkbox">
          <!-- 注册 -->
          <div class="signup nodisplay">
            <h1 class="font-bold">注册</h1>
            <div class="Form">
              <input type="text" placeholder="学号" v-model="id"/>
              <input type="text" placeholder="姓名" v-model="name"/>
              <select class="selector" v-model="Grade">
                <option selected disabled >请选择年级</option>
                <option v-for="(item,index) in GradeList" :key="index">{{item}}</option>
              </select>
                <select class="selector" v-model="SelectedWorkGroup">
                    <option selected disabled >请选择方向</option>
                    <option v-for="(item,index) in WorkGroupList" :key="index">{{item}}</option>
                </select>
              <input type="text" placeholder="密码" v-model="password"/>
              <input type="text" placeholder="确认密码" v-model="confirmPsw" @keydown.enter="register"/>
              <button class="btn btn-accent sumbit" @click="register">注册</button>
            </div>
          </div>
          <!-- 登录 -->
          <div class="signin">
            <h1 class="font-bold">登录</h1>
            <div class="more-padding Form">
              <input placeholder="学号" type="text" v-model="id">
              <input placeholder="密码" type="password" v-model="password" @keydown.enter="login">
              <div class="Checkbox">
                <label class="label cursor-pointer">
                  <span class="label-text">自动登录</span>
                  <input type="checkbox" checked="checked" class="checkbox" style="margin: 0 0.5rem" v-model="AutoLogin"/>
                </label>
              </div>
              <div class="btn-list">
                <button class="btn btn-accent login-btn" @click="login">登录</button>
                <a class="link link-hover" style="font-size: 13px" onclick="restPwd.showModal()">忘记密码了?</a>
              </div>
            </div>
          </div>
        </div>
        <div class="leftbox">
          <h2 class="title"><span>Aurora</span>&<br>Studio</h2>
          <p class="desc">Pick your perfect <span>bouquet</span></p>
          <img class="flower smaller"
               src="https://hbimg.huabanimg.com/c09305167a883e60179a45374df73252304001359acca-W3qbYm_fw658/format/webp"/>
          <p class="account ">已经有账号了?</p>
          <button id="signin" class="button">登录</button>
        </div>
        <div class="rightbox">
          <h2 class="title"><span>Aurora</span>&<br>Studio</h2>
          <p class="desc">Pick your perfect <span>bouquet</span></p>
          <img class="flower"
               src="https://hbimg.huabanimg.com/b28be92c8198975a74ad656eba00b352c9b9e589819af-lDXUAS_fw658/format/webp"/>
          <p class="account">还没有账号?</p>
          <button id="signup" class="button">立即注册</button>
        </div>
        <!--重置密码页面-->
        <dialog id="restPwd" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">忘了密码</h3>
            <p class="py-4">输入你的学号，直接帮你重置回123456,当然,你想设置新的密码也行</p>
            <label class="label">
              <span class="label-text">学号:</span>
            </label>
            <input type="text" placeholder="学号~~" class="input input-bordered w-full max-w-xs" v-model="account"/>
            <label class="label">
              <span class="label-text">密码:</span>
            </label>
            <input type="text" placeholder="不填就123456哦~" class="input input-bordered w-full max-w-xs"
                   v-model="RestPwd"/>
            <div class="modal-action">
              <form method="dialog" class="w-32">
                <div class="flex items-center justify-around w-full">
                  <button class="btn" @click="forgetPwd">重置</button>
                  <button class="btn">关闭</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import $ from 'jquery';
import {ElNotification} from "element-plus";
import * as API from "../api/API";
import {init, restPassword} from "../api/API";
import {GlobalStore} from "../stores/Global";
import {md5} from "js-md5";
import {User, UserInfo,WorkGroupList} from "../api/interfaces/Schema";
import {isNotEmptyStr} from "../utils/StringUtil";

const globalStore = GlobalStore()
let AutoLogin = ref(true)
let account = ref()
let RestPwd = ref("123456")
let Grade = ref()
let GradeList = ref([])
const restPwd = ref(null) //组件对象
let SelectedWorkGroup = ref("请选择方向")

onBeforeMount(  () => {
  loadGradeList();
  window.electronAPI.handleSetting((_event, value) => {
    if (value) {
      console.log("从主进程加载配置文件");
      globalStore.loadAllSetting(JSON.parse(value));
      init(globalStore.Setting.netWork.host, globalStore.Setting.userInfo.token);
    }
  });
})

onMounted( () => {

  $('#signup').click(function () {
    $('.pinkbox').css('transform', 'translateX(80%)');
    $('.signin').addClass('nodisplay');
    $('.signup').removeClass('nodisplay');
  });
  $('#signin').click(function () {
    $('.pinkbox').css('transform', 'translateX(0%)');
    $('.signup').addClass('nodisplay');
    $('.signin').removeClass('nodisplay');
  });
})

let id = ref('')
let name = ref('')
let password = ref('')
let confirmPsw = ref('')

const login = async () => {
  console.log("登录操作")
  const user = {
    id: id.value,
    name: name.value,
    grade:Grade.value,
    password: md5(password.value),
  }
  let Response = await API.login(<User>user)
  if (!Response.success) {
    ElNotification({
      title: "登录失败！",
      message: Response.msg,
      type: "error",
    });
    return;
  }
  let result = Response.data
  window.electronAPI.pushDataToMain({
    type: "UserInfo",
    data: result
  });
  globalStore.Setting.userInfo = result;
  globalStore.Setting.autoLogin = AutoLogin.value;
  await window.electronAPI.SaveSetting(JSON.stringify(globalStore.Setting))
  window.electronAPI.login()
}


const register = async () => {
  if(!isNotEmptyStr(password.value)){
    ElNotification({
      title: "密码空的？",
      type: "error"
    });
    return;
  }
  if (password.value !== confirmPsw.value) {
    ElNotification({
      title: "密码需要和确认密码一致！",
      type: "error"
    });
    return;
  }
  const user = {
    id: id.value,
    name: name.value,
    password: password.value,
    grade:Grade.value,
    workGroup:SelectedWorkGroup.value,
  }
  let Response = await API.register(<User>user)
  if (!Response.success) {
    ElNotification({
      title: "注册失败！",
      message: Response.msg,
      type: "error",
    });
    return;
  }
  $('.pinkbox').css('transform', 'translateX(0%)');
  $('.signup').addClass('nodisplay');
  $('.signin').removeClass('nodisplay');
}

const forgetPwd = async () => {
  if (!isNotEmptyStr(account.value)) {
    ElNotification({
      title: "参数错误",
      message: "填一下学号拉",
      type: "error"
    });
    return;
  }
  if (!isNotEmptyStr(RestPwd.value)) {
    RestPwd.value = "123456";
  }
  let res = await restPassword(account.value, RestPwd.value);
  if (!res.success) {
    ElNotification({
      title: "系统错误!",
      message: res.msg,
      type: "error",
    });
  } else {
    ElNotification({
      title: "设置成功!",
      type: "success",
    });
  }
  restPwd.value.close()
}
const loadGradeList = ()=>{
  let date = new Date();
  let utcFullYear = date.getUTCFullYear();
  let cur = Number(utcFullYear.toString().substring(2,4));
  Grade.value = cur
  for (let i = cur-3; i <=cur+3 ; i++) {
      GradeList.value.push(i);
  }
}
</script>

<style scoped>

.modal-action {
  justify-content: flex-end;
}

.btn-list {
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
 flex-direction: column;
  height: 6rem;
}


* {
  margin: 0;
  padding: 0;
  font-family: "WenKai-B", "Sanchez", serif;
}

@font-face {
  font-family: "WenKai-B"; /*字体名称*/
  src: url("../assets/LXGWWenKai-Bold.ttf"); /*字体源文件*/
}

/* 容器的样式 */
.container {
  margin: auto;

  height: 400px;
  position: relative;

}

.label-mod {
  font-family: "Open Sans", sans-serif;
  @apply text-primary-content;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.welcome {
  @apply bg-base-100;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.pinkbox {
  position: absolute;
  top: -10%;
  left: 5%;
  @apply bg-primary;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.nodisplay {
  display: none;
  transition: all 0.5s ease;
}

.leftbox, .rightbox {
  position: absolute;
  width: 50%;
  transition: 1s all ease;
}

.leftbox {
  left: -2%;
}

.rightbox {
  right: -2%;
}

/* 字体和按钮的样式 */
h1 {
  font-family: "Open Sans", sans-serif;

  text-align: center;
  margin-top: 95px;
  text-transform: uppercase;

  font-size: 2em;
  letter-spacing: 8px;
}

.title {
  font-family: "Lora", serif;
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
}

.desc {
  margin-top: -8px;
}

.account {
  margin-top: 45%;
  font-size: 10px;
}

p {
  font-family: "Open Sans", sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  font-weight: 600;
  text-align: center;
}

.span {
  @apply text-primary;
}

.flower {
  position: absolute;
  width: 120px;
  height: 120px;
  top: 45%;
  left: 32%;
  opacity: 0.8;
}

.smaller {
  width: 110px;
  height: 110px;
  top: 48%;
  left: 34%;
  opacity: 0.9;
}

button {
  padding: 12px;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
}

button:hover {
  @apply bg-primary text-primary-content;

  transition: background-color 1s ease-out;
}

.button {
  margin-top: 3%;
  @apply bg-base-200 text-primary-content;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: 600;
}

/* 表单样式 */
.Form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 7px;
}

.more-padding {
  padding-top: 35px;
}

.more-padding input {
  padding: 12px;
}

.more-padding .sumbit {
  margin-top: 45px;
}

.sumbit {
  margin-top: 25px;
  padding: 12px;
  @apply border-primary-content;
}

.sumbit:hover {
  @apply bg-base-100 border-primary;

}

input {
  @apply bg-primary;
  @apply text-primary-content font-bold;
  border: none;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
  padding: 9px;
  font-weight: 100;
}

input::placeholder {
  @apply text-primary-content font-bold;
  letter-spacing: 2px;
  font-size: 1.0em;
  font-weight: 100;
}

input:focus {
  @apply text-primary-content font-bold;
  outline: none;
  border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
  font-size: 1.0em;
  transition: 0.8s all ease;
}

input:focus::placeholder {
  opacity: 0;
}

.Checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  top: 25px;
}

.big-box {
  width: 1000px;
  height: 600px;
  border-radius: 20px;
}
.selector{
  width: 13.5rem;
  background: hsl(var(--p) / var(--tw-bg-opacity));
  outline: none;
  padding: 9px 9px 9px 5px;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
}
.login-btn{
  width: 6rem;
  font-size: 1.125rem;
}
</style>
