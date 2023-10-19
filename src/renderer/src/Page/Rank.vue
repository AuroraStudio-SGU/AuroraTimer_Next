<template>
  <div class="menu">
    <div ref="boxComponent" class="white-box-rank">
      <div class="header">
        <div class="Title">
          工作室本周打卡情况
        </div>
        <div class="join">
          <button class="join-item btn" @click="handlePageChange(true)">«</button>
          <button class="join-item btn">{{ WeekIndex[lastXWeek].name }}</button>
          <button class="join-item btn" @click="handlePageChange(false)">»</button>
        </div>
      </div>
      <el-table
        :data="UserList"
        :default-sort="{ prop: 'weekTime', order: 'descending' }"
        v-loading="Loading"
      >
        <el-table-column label="姓名" prop="name" min-width="40">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img :src="scope.row.avatar" height="30" width="30" style="border-radius: 10px" @click="showInformation(scope.row.id)" />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
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
      <dialog id="user" ref="user" class="modal">
        <div class="modal-box-notice modal-box relative overflow-hidden">
          <h3 class="font-bold text-lg">公告设置📢</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div class="container">
            114514
          </div>
          <div class="modal-action">
            <label for="notice" class="btn">保存</label>
          </div>
        </div>
      </dialog>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {formatSecondTime} from "../utils/TimeUtil";
import {nextTick, onBeforeMount, onMounted, ref} from "vue";
import '../assets/css/common.css'
import {ElNotification} from "element-plus";
import {GlobalStore} from "../stores/Global";
import {TimerStore} from "../stores/Timer";
import {UserTime} from "../api/interfaces/Schema";
import {intToRoman} from "../utils/NumberUtil";
import {getAvatarById} from "../api/API";


interface Week {
    index:number,
    name:string,
}

const globalStore = GlobalStore()
const timerStore = TimerStore()

const boxComponent = ref(null)

let GradeList = ref([])
let GradeFilters = ref([])
let Loading = ref(true)
let UserList = ref<UserTime[]>()
let WeekIndex = ref<Week[]>([])
let lastXWeek = ref(0);

const filterHandler = (
  value: string,
  row: UserTime
) => {
  return row.id.substring(0, 2) === value
}
onBeforeMount(async () => {
  await loadWeekList();
  await loadRankList();
})

onMounted(async () => {
  await nextTick()
})
const GradeFormatter = (row, colum) => {
  return row.uid.substring(0, 2)
}

const TimeFormatter = (row, colum) => {
  return formatSecondTime(row[colum.property])
}
const user = ref(null);
const showInformation = (id:string) =>{
  user.value.showModal()
  console.log("show")
}

const handlePageChange = async (state:boolean) => {
  if(Loading.value) return;
  if(state){
    //to last week
    if(lastXWeek.value===99){return;}
    lastXWeek.value++;
  }else {
    //to next week
    if(lastXWeek.value===0){return}
    lastXWeek.value--;
  }
  await loadRankList();
}


const max_week_size = 100;
const loadWeekList = async () =>{
  for (let i = 0; i < max_week_size ; i++) {
      let str = "本周";
      if(i===0){
        str = "本周";
      }else {
        str = "上" + intToRoman(i) + '周'
      }
      let week:Week = {
        index:i,
        name:str
      }
      WeekIndex.value[i] = week;
  }
}
const loadRankList = async () => {
  Loading.value = true
  //获取排行列表
  let res = await globalStore.getUserRankList(true, lastXWeek.value)
  if (!res) {
    ElNotification({
      title: "请求失败！",
      message: "系统异常",
      type: "error"
    });
    return;
  }
  UserList.value = res
  timerStore.setUserTimeList(UserList.value)
  //在加载前获取所有成员的年级列表
  GradeList.value = [];
  for (let i = 0; i < UserList.value.length; i++) {
    let user = UserList.value[i];
    let g = user.id.substring(0, 2)
    let index = GradeList.value.indexOf(g)
    if (index == -1)
      GradeList.value.push(g)
    let res = await getAvatarById(user.id)
    if (res.success) {
      UserList.value[i].avatar = res.data + '?' + Math.random();
    }
  }
  GradeFilters.value = [];
  GradeList.value.forEach(i => {
    let obj = {
      text: i + '级',
      value: i
    }
    GradeFilters.value.push(obj)
  })
  Loading.value = false;
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
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
