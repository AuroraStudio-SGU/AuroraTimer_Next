<template>
  <div class="menu">
    <div ref="boxComponent" class="white-box-rank">
      <div class="Title">
        工作室本周打卡情况
      </div>
      <el-table
        :data="UserList"
        :default-sort="{ prop: 'weekTime', order: 'descending' }"
        v-loading="Loading"
      >
        <el-table-column label="姓名" prop="name" min-width="30"/>
        <el-table-column
          :filter-method="filterHandler" :filters="GradeFilters"
          :formatter="GradeFormatter"
          label="年级"
          prop="grade"
          min-width="30"
        >
          <template #default="scope">
            <el-tag disable-transitions>
              {{ scope.row.id.substring(0, 2) }} 级
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :formatter="TimeFormatter" label="该学期打卡时长" prop="totalTime" sortable/>
        <el-table-column :formatter="TimeFormatter" label="本周打卡时长" prop="weekTime" sortable/>
      </el-table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {formatSecondTime} from "../utils/TimeUtil";
import {nextTick, onBeforeMount, onMounted, ref} from "vue";
import '../assets/css/common.css'
import {ElNotification} from "element-plus";
import {GlobalStore} from "../stores/Global";


const globalStore = GlobalStore()

const boxComponent = ref(null)
const isLoaded = ref(false)

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
onBeforeMount(async () => {
  //获取排行列表
  let res = await globalStore.getUserRankList(true, lastXWeek)
  if (!res) {
    ElNotification({
      title: "请求失败！",
      message: "系统异常",
      type: "error"
    });
    return;
  }
  UserList.value = res
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
.white-box-rank {
  @apply p-4;
  @apply rounded-box shadow-md;
  /* @apply  md:w-11/12; */
  width: 99%;
  height: 100%;
  @apply bg-base-100;

  @apply overflow-auto;
}

@font-face {
  font-family: "WenKai-B"; /*字体名称*/
  src: url("../assets/LXGWWenKai-Bold.ttf"); /*字体源文件*/
}

:deep(.el-table) {
  --el-table-border-color: hsl(var(--ac) / var(--tw-text-opacity));
  --el-table-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));
  --el-table-tr-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));;
//--el-table-row-hover-bg-color: hsl(var(--pc) / var(--tw-text-opacity)); --el-table-header-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));;
//--el-tag-bg-color: 年级标签 背景颜色; //--el-tag-text-color: 年级标签 文字颜色;
}

:deep(.cell) {
  font-family: "Sanchez", "WenKai-B", serif;
  font-weight: 700;
  color: hsla(var(--bc) / var(--tw-text-opacity, 1));
}
</style>
