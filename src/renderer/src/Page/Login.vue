<template>
  <div class="big-box bg-base-300 font-semibold" data-theme="cupcake">
    <div class="container">
      <div class="welcome">
        <div class="pinkbox">
          <!-- 注册 -->
          <div class="signup nodisplay">
            <h1 class="font-bold">注册</h1>
            <form autocomplete="off">
              <input placeholder="Username" type="text">
              <input placeholder="Email" type="email">
              <input placeholder="Password" type="password">
              <input placeholder="Confirm Password" type="password">
              <button class="button submit">注册</button>
            </form>
          </div>
          <!-- 登录 -->
          <div class="signin">
            <h1 class="font-bold">登录</h1>
            <form autocomplete="off" class="more-padding">
              <input placeholder="Username" type="text">
              <input placeholder="Password" type="password">
              <div class="checkbox">
                <input id="remember" type="checkbox"/><label for="remember">Remember Me</label>
              </div>
              <button class="buttom sumbit"  @click="login()">登录</button>
            </form>
          </div>
        </div>
        <div class="leftbox">
          <h2 class="title"><span>Aurora</span>&<br>Studio</h2>
          <p class="desc">Pick your perfect <span>bouquet</span></p>
          <img class="flower smaller"
               src="https://hbimg.huabanimg.com/c09305167a883e60179a45374df73252304001359acca-W3qbYm_fw658/format/webp"/>
          <p class="account ">已经有账号了?</p>
          <button id="signin -" class="button">登录</button>
        </div>
        <div class="rightbox">
          <h2 class="title"><span>Aurora</span>&<br>Studio</h2>
          <p class="desc">Pick your perfect <span>bouquet</span></p>
          <img class="flower"
               src="https://hbimg.huabanimg.com/b28be92c8198975a74ad656eba00b352c9b9e589819af-lDXUAS_fw658/format/webp"/>
          <p class="account">还没有账号?</p>
          <button id="signup" class="button">立即注册</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted} from "vue";
import $ from 'jquery';


onMounted(() => {
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

const login = () => {
  console.log("登录操作")
  window.electronAPI.login()
}
</script>

<style scoped>


/* 容器的样式 */
.container {
  margin: auto;

  height: 400px;
  position: relative;

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

span {
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
  @apply border-primary-content;

}

.sumbit:hover {
  @apply bg-base-100 border-primary;

}

input {
  @apply bg-primary;
  width: 65%;
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

label {
  font-family: "Open Sans", sans-serif;
  @apply text-primary-content;
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
  @apply bg-primary;
}

.checkbox input[type=checkbox]:checked + label {
  @apply text-primary-content;
  transition: 0.5s all ease;
}

.big-box {
  width: 1000px;
  height: 600px;
  border-radius: 20px;
}
</style>
