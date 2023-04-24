<template>
  <el-table
    :data="UserList"
    :default-sort="{ prop: 'WeekTime', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="TotalTime" sortable :formatter="formatter" label="该学期打卡时长" width="180"/>
    <el-table-column prop="WeekTime" sortable :formatter="formatter" label="本周打卡时长"/>
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
</template>

<script lang="ts" setup>
import {UserFilled} from '@element-plus/icons-vue'
import {formatTime} from "../utils/TimeUtil";

import {UserList} from '../utils/offlineData'

const formatter = (row,colum)=>{
  return formatTime(row[colum.property])
}

</script>

<style scoped>

</style>
