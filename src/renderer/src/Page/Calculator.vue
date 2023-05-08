<template>
  <div class="menu">
    <div class="title" >
     日历测试
    </div>
    <div class="white-box">
      <el-button type='success' @click="setCalCTX" >
        测试
      </el-button>
      <el-calendar>
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-')[2] }}
            {{ data.isSelected ? '' : '' }}
          </p>
        </template>
      </el-calendar>

    </div>
  </div>
</template>

<script setup lang="ts">


import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

let dialogTableVisible = ref(false)
let content = ref('')
const setCalCTX = async ()=>{
  ElMessageBox.prompt('设置内容', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `添加成功`,
      })
      return value
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
  return content
}

</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>
