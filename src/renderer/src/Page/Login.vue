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
  <el-button type="success" @click="login()">登录</el-button><br>
</template>

<script setup>
import {ref} from "vue";
import {GlobalStore} from "../stores/Global";

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

</style>
