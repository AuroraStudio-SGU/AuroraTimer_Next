<template>
  <div class="menu">

    <div class="white-box">
      <div class="title">新UI测试playground</div>
      <div class="normalStytle">
        <h1 class="text-3xl font-bold underline text-red-600">
          Hello tailwind css
        </h1>
        <button class="btn glass w-64 rounded-full">Button</button>
      </div>
      <div class="themeTest">
        <button class="btn">Button</button>
        <button class="btn btn-primary">Button</button>
        <button class="btn btn-secondary">Button</button>
        <button class="btn btn-accent">Button</button>
        <button class="btn btn-ghost">Button</button>
        <button class="btn btn-link">Button</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted} from "vue";
import {GlobalStore} from "../stores/Global";

const globalStore = GlobalStore()

onMounted(() => {

})
</script>

<style scoped>

</style>
