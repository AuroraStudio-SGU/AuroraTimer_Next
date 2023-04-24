<template>
  This is Main Page {{ counter }}<br>
</template>

<script setup>

import {ref} from "vue";

window.electronAPI.handleCounter((event, value) => {
  counter.value = counter.value + value
  event.sender.send('counter-value', counter.value)
})


const counter = ref(0)



</script>

<style scoped>

</style>
