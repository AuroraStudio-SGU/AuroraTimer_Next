<template>
  <div class="menu">
    <div class="title">
      工作室本周打卡情况
    </div>
    {{ tableHeight }}
    <div class="white-box" ref="boxComponent">
      <el-table
        :border="true"
        :data="UserList"
        :default-sort="{ prop: 'WeekTime', order: 'descending' }"
      >
        <el-table-column prop="name" label="姓名"/>
        <el-table-column
          prop="grade" label="年级"
          :formatter="GradeFormatter"
          :filters="GradeFilters"
          :filter-method="filterHandler"
        >
          <template #default="scope">
            <el-tag disable-transitions>
              {{ scope.row.uid.substring(0,2) }} 级
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="TotalTime" sortable :formatter="TimeFormatter" label="该学期打卡时长"/>
        <el-table-column prop="WeekTime" sortable :formatter="TimeFormatter" label="本周打卡时长"/>
        <el-table-column prop="job" label="职位" width="60px">
          <template #default="{ row }">
            <!-- 使用自定义列模板 -->
            <template v-if="row.job === 'normal'">
              <el-icon>
                <UserFilled/>
              </el-icon>
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
import {formatSecondTime} from "../utils/TimeUtil";
import {UserList} from '../utils/offlineData'
import { nextTick, onBeforeMount, onMounted, ref, watchEffect} from "vue";
import '../assets/css/common.css'
import {User} from '../utils/offlineData'


const boxComponent = ref(null)
const isLoaded = ref(false)

let tableHeight = ref(0)
let tableWidth = ref(0)
let GradeList: string[] = []
let GradeFilters = []

onBeforeMount(() => {
  //在加载前获取所有成员的年级列表
  UserList.forEach(user => {
    let g = user.uid.substring(0, 2)
    let index = GradeList.indexOf(g)
    if (index == -1)
      GradeList.push(g)
  })
  GradeList.forEach(i=>{
    let obj ={
      text:i+'级',
      value:i
    }
    GradeFilters.push(obj)
  })
  console.log("年级列表:", GradeFilters)
})
const filterHandler = (
  value: string,
  row:User
) => {
  return row.uid.substring(0,2) === value
}


onMounted(async () => {
  await nextTick()
  isLoaded.value = true
  tableHeight.value = boxComponent.value.offsetHeight
  // console.log(document.getElementsByClassName("white-box"))
})


watchEffect(() => {
  if (isLoaded.value) {
    tableHeight.value = boxComponent.value.offsetHeight
  }
})


const GradeFormatter = (row, colum) => {
  return row.uid.substring(0,2)
}

const TimeFormatter = (row, colum) => {
  return formatSecondTime(row[colum.property])
}


</script>

<style scoped>
.white-box{
  padding: 20px 20px 20px 20px;
  width: 70vw;
}
</style>
