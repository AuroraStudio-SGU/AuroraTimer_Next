<template>
  <div class="menu">
    <div class="title">
      主题切换测试
    </div>
    <div class="white-box bg-base-100">
      <el-select v-model="themeSelected" class="m-2" placeholder="主题切换" @change="switchTheme"><!-- 太多测试页面了放不下！!-->
        <el-option
          v-for="item in themeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <button class="btn">Button</button>
      <button class="btn btn-primary">Button</button>
      <button class="btn btn-secondary">Button</button>
      <button class="btn btn-accent">Button</button>
      <button class="btn btn-ghost">Button</button>
      <button class="btn btn-link">Button</button>
    </div>
  </div>

</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";


let themeSelected = ref('light')
const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter"]

const themeList = []

let htmlObj
onBeforeMount(()=>{
  themes.forEach((value,index)=>{
    let obj = {
      label:value,
      value:value,
    }
    themeList.push(obj)
  })
})
onMounted(()=>{
  htmlObj = document.getElementsByTagName('html')[0]
})
const switchTheme = (theme) => {
  htmlObj.dataset.theme = theme
}
</script>

<style scoped>

</style>
