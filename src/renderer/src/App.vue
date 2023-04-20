<template>
  <div class="app-box">
    <SliderBar></SliderBar>
    <!--    <timer-progress :size="300" :bar-size="25"></timer-progress>-->
    <router-view></router-view>
  </div>
</template>

<script setup>
import SliderBar from "./components/SliderBar.vue";
import TimerProgress from "./Page/TimerProgress.vue";
import Other from "./components/Other.vue";




</script>

<style>
*{
  margin: 0;
}
.app-box {
  justify-content: space-between;
  display: flex;
}
</style>
