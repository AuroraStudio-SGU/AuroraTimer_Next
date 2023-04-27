<template>
  <div class="menu">
    <div class="title" >
      工作室本周打卡情况
    </div>
    <div class="white-box" ref="boxComponent">
      {{ tableHeight }}
      <el-table
        :border="true"

        :data="UserList"
        :default-sort="{ prop: 'WeekTime', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="TotalTime" sortable :formatter="formatter" label="该学期打卡时长"/>
        <el-table-column prop="WeekTime" sortable  :formatter="formatter" label="本周打卡时长"/>
        <el-table-column prop="job" label="职位">
          <template #default="{ row }">
            <!-- 使用自定义列模板 -->
            <template v-if="row.job === 'normal'">
              <el-icon><UserFilled /></el-icon>
            </template>
            <template v-else>
              {{ row.job }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {UserFilled} from '@element-plus/icons-vue'
import {formatTime} from "../utils/TimeUtil";
import {UserList} from '../utils/offlineData'
import {computed, h, nextTick, onMounted, Ref, ref, watch, watchEffect} from "vue";
import '../assets/css/common.css'


const boxComponent = ref(null)
const isLoaded = ref(false)

let tableHeight = ref(0)
let tableWidth = ref(0)

onMounted(async () => {
  await nextTick()
  isLoaded.value = true
  tableHeight.value = boxComponent.value.offsetHeight
})

watchEffect(() => {
  console.log("更新数据")
  if(isLoaded.value){
    tableHeight.value = boxComponent.value.offsetHeight
  }
})



const getTableSize = computed(()=>{
  if(isLoaded.value){
    return {
      height:boxComponent.value.offsetHeight,
      width:boxComponent.value.offsetWidth
    }
  }else {
    return {
      height: 0,
      width: 0
    }
  }

})


const formatter = (row,colum)=>{
  return formatTime(row[colum.property])
}



</script>

<style scoped>

</style>
