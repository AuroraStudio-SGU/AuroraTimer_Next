<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'WeekTime', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="TotalTime" sortable :formatter="formatter" label="该学期打卡时长" width="180"/>
    <el-table-column prop="WeekTime" sortable :formatter="formatter" label="本周打卡时长"/>
  </el-table>
</template>

<script setup>

import {formatTime} from "../utils/TimeUtil";

const formatter = (row,colum)=>{
  return formatTime(row[colum.property])
}

const tableData = [
  {
    name: '欧润丰',
    TotalTime: 4800000,
    WeekTime: 960000,
  },
  {
    name: '陈典灿',
    TotalTime: 6000000,
    WeekTime: 1080000,
  },
  {
    name: '梓聪',
    TotalTime: 7200000,
    WeekTime: 1440000,
  },
]
</script>

<style scoped>

</style>
