<template>

</template>

<script setup>
import {router} from "../utils/router";

const toTimer = ()=>{
  router.push({
    name:'Timer'
  })
}

const toMain = ()=>{
  router.push({
    name:'Main'
  })
}
</script>

<style scoped>

</style>
