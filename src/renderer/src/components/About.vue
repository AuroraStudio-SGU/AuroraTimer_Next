<template>
  <div>
    This is About Page , Props is {{ timerStore.percent }}
  </div>
</template>

<script setup>

import {TimerStore} from "../stores/Timer";

const props = defineProps(['text'])

const timerStore = TimerStore()

</script>

<style scoped>

</style>
