<template>
<!--  <el-form class="login-form" label-position="top" label-width="100px" :rules="rules" :model="formContent" status-icon-->
<!--           ref="loginForm">-->
<!--    <el-form-item class="form-item" label="邮箱" prop="email">-->
<!--      <el-input class="input-box" type="text" v-model="formContent.email"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item class="form-item" label="密码" prop="password">-->
<!--      <el-input class="input-box" type="password" v-model="formContent.password"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item>-->
<!--      <el-button style="width: 100%" type="primary" @click="submitForm()">登录</el-button>-->
<!--    </el-form-item>-->
<!--    <el-tag v-if="error" class="ml-2" type="danger">登录失败, 可能是邮箱或密码错误</el-tag>-->
<!--  </el-form>-->
<div class="container">
  <div class="welcome">
    <div class="pinkbox">
      <!-- 注册 -->
      <div class="signup nodisplay">
        <h1>Register</h1>
        <form autocomplete="off">
          <input type="text" placeholder="Username">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Password">
          <input type="password" placeholder="Confirm Password">
          <button class="button submit">Create Account</button>
        </form>
      </div>

      <!-- 登录 -->
      <div class="signin">
        <h1>Sign In</h1>
        <form class="more-padding" autocomplete="off">
          <input type="text" placeholder="Username">
          <input type="password" placeholder="Password">
          <div class="checkbox">
            <input type="checkbox" id="remember" /><label for="remember">Remember Me</label>
          </div>
          <button class="buttom sumbit" @click="login()">Login</button>
        </form>
      </div>
    </div>

    <div class="leftbox">
      <h2 class="title"><span>BLOOM</span>&<br>BOUQUET</h2>
      <p class="desc">Pick your perfect <span>bouquet</span></p>
      <img class="flower smaller" src="https://hbimg.huabanimg.com/c09305167a883e60179a45374df73252304001359acca-W3qbYm_fw658/format/webp" />
      <p class="account">Have an account?</p>
      <button class="button" id="signin">Login</button>
    </div>

    <div class="rightbox">
      <h2 class="title"><span>BLOOM</span>&<br>BOUQUET</h2>
      <p class="desc">Pick your perfect <span>bouquet</span></p>
      <img class="flower" src="https://hbimg.huabanimg.com/b28be92c8198975a74ad656eba00b352c9b9e589819af-lDXUAS_fw658/format/webp" />
      <p class="account">Don't have an account?</p>
      <button class="button" id="signup">Sign Up</button>
    </div>
  </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {GlobalStore} from "../stores/Global";
import  $  from 'jquery';

onMounted(()=>{
  $('#signup').click(function() {
  $('.pinkbox').css('transform', 'translateX(80%)');
  $('.signin').addClass('nodisplay');
  $('.signup').removeClass('nodisplay');
});

$('#signin').click(function() {
  $('.pinkbox').css('transform', 'translateX(0%)');
  $('.signup').addClass('nodisplay');
  $('.signin').removeClass('nodisplay');
});
})

const globalStore = GlobalStore()


const formContent = ref({ email: '', password: '' })

let error = ref(false)
const rules = {
  email: [{ required: true, message: '请填写邮箱', trigger: 'blur' },],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }, {
    min: 5,
    max: 12,
    message: '密码的长度范围为5-12',
    trigger: 'blur'
  }]
}

const login = ()=>{
  console.log("登录操作")
  window.electronAPI.login()
}


const submitForm = ()=>{
  console.log("登录按钮")
}
</script>

<style scoped>
body {
  background: #cbc0d3;
}

/* 容器的样式 */
.container {
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
}

.welcome {
  background: #f6f6f6;
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
  background: #eac7cc;
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
  color: #f6f6f6;
  font-size: 2em;
  letter-spacing: 8px;
}

.title {
  font-family: "Lora", serif;
  color: #8e9aaf;
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
  color: #8e9aaf;
  text-align: center;
}

span {
  color: #eac7cc;
}

.flower {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 45%;
  left: 27%;
  opacity: 0.8;
}

.smaller {
  width: 130px;
  height: 130px;
  top: 48%;
  left: 30%;
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
  background: #eac7cc;
  color: #f6f6f6;
  transition: background-color 1s ease-out;
}

.button {
  margin-top: 3%;
  background: #f6f6f6;
  color: #ce7d88;
  border: solid 1px #eac7cc;
}

/* 表单样式 */
form {
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
  border-color: #ce7d88;
}

.sumbit:hover {
  background: #cbc0d3;
  border-color: #bfb1c9;
}

input {
  background: #eac7cc;
  width: 65%;
  color: #ce7d88;
  border: none;
  border-bottom: 1px solid rgba(246, 246, 246, 0.5);
  padding: 9px;
  font-weight: 100;
}

input::placeholder {
  color: #f6f6f6;
  letter-spacing: 2px;
  font-size: 1.0em;
  font-weight: 100;
}

input:focus {
  color: #ce7d88;
  outline: none;
  border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
  font-size: 1.0em;
  transition: 0.8s all ease;
}

input:focus::placeholder {
  opacity: 0;
}

label {
  font-family: "Open Sans", sans-serif;
  color: #ce7d88;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.checkbox {
  display: inline;
  white-space: nowrap;
  position: relative;
  left: -52px;
  top: 25px;
}

input[type=checkbox] {
  width: 15px;
  background: #ce7d88;
}

.checkbox input[type=checkbox]:checked + label {
  color: #ce7d88;
  transition: 0.5s all ease;
}
</style>
