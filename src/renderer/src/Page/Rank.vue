<template>
  <div class="menu">
    <div ref="boxComponent" class="white-box">
      <div class="Title">
        工作室本周打卡情况
      </div>
      <el-table
        :data="UserList"
        :default-sort="{ prop: 'weekTime', order: 'descending' }"
        v-loading="Loading"
      >
        <el-table-column label="姓名" prop="name"/>
        <el-table-column
          :filter-method="filterHandler" :filters="GradeFilters"
          :formatter="GradeFormatter"
          label="年级"
          prop="grade"
        >
          <template #default="scope">
            <el-tag disable-transitions>
              {{ scope.row.id.substring(0, 2) }} 级
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :formatter="TimeFormatter" label="该学期打卡时长" prop="totalTime" sortable/>
        <el-table-column :formatter="TimeFormatter" label="本周打卡时长" prop="weekTime" sortable/>
<!--        <el-table-column label="职位" prop="job" width="60px">-->
<!--          <template #default="{ row }">-->
<!--            &lt;!&ndash; 使用自定义列模板 &ndash;&gt;-->
<!--            <template v-if="row.job === 'normal'">-->
<!--              <el-icon>-->
<!--                <UserFilled/>-->
<!--              </el-icon>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              {{ row.job }}-->
<!--            </template>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {UserFilled} from '@element-plus/icons-vue'
import {formatSecondTime} from "../utils/TimeUtil";
import {nextTick, onBeforeMount, onMounted, ref, watchEffect} from "vue";
import '../assets/css/common.css'
import {getRank} from "../utils/API";
import {ElNotification} from "element-plus";

interface UserTime {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
}


const boxComponent = ref(null)
const isLoaded = ref(false)

let tableHeight = ref(0)
let tableWidth = ref(0)
let GradeList = ref([])
let GradeFilters = ref([])
let Loading = ref(true)
let UserList = ref<UserTime[]>()
let lastXWeek = 0;

const filterHandler = (
  value: string,
  row: UserTime
) => {
  return row.id.substring(0, 2) === value
}
onBeforeMount(async ()=>{
  //获取排行列表
  await getRank(lastXWeek)
    .then(res=>{
      let r = res.data
      UserList.value = r.data
    })
    .catch(res=>{
      ElNotification({
        title: "请求失败！",
        message:res.msg,
        type:"error"
      });
    })
  //在加载前获取所有成员的年级列表
  UserList.value.forEach(user => {
    let g = user.id.substring(0, 2)
    let index = GradeList.value.indexOf(g)
    if (index == -1)
      GradeList.value.push(g)
  })
  GradeList.value.forEach(i => {
    let obj = {
      text: i + '级',
      value: i
    }
    GradeFilters.value.push(obj)
  })
  Loading.value = false;
})

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
  return row.uid.substring(0, 2)
}

const TimeFormatter = (row, colum) => {
  return formatSecondTime(row[colum.property])
}

//
</script>

<style scoped>
@font-face {
  font-family: "WenKai-B"; /*字体名称*/
  src: url("../assets/LXGWWenKai-Bold.ttf"); /*字体源文件*/
}
:deep(.el-table) {
  --el-table-border-color : hsl(var(--ac) / var(--tw-text-opacity));
  --el-table-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));
  --el-table-tr-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));;
  //--el-table-row-hover-bg-color: hsl(var(--pc) / var(--tw-text-opacity));
  --el-table-header-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));;
}
:deep(.cell) {
  font-family: "Sanchez", "WenKai-B",serif;
  font-weight: 700;
  color : hsla(var(--bc) / var(--tw-text-opacity, 1));
}
</style>
