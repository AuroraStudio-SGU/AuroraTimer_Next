<template>
  <div class="menu">
    <div ref="boxComponent" class="white-box-rank">
      <div class="header">
        <div class="Title">工作室本周打卡情况</div>
        <div class="join">
          <button class="btn " style="margin-right: 2rem" v-show="lastXWeek!=0" @click="resetLastWeek">回到本周</button>
          <button class="join-item btn" @click="handlePageChange(true)">
            «
          </button>
          <button class="join-item btn">{{ WeekIndex[lastXWeek].name }}</button>
          <button class="join-item btn" @click="handlePageChange(false)">
            »
          </button>
        </div>
      </div>
      <el-table
        :data="UserList"
        :default-sort="{ prop: 'weekTime', order: 'descending' }"
        v-loading="Loading"
        :element-loading-svg="svgLoading"
        border
      >
        <el-table-column label="姓名" prop="name" min-width="35">
          <template #default="scope">
            <div style="display: flex; align-items: center" @click="showInformation(scope.row.id)">
              <img
                :src="scope.row.avatar"
                height="30"
                width="30"
                style="border-radius: 10px"
              />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :filter-method="filterHandler"
          :filters="GradeFilters"
          label="年级"
          prop="grade"
          min-width="30"
        >
          <template #default="scope">
            <div class="badge badge-info gap-2">
              {{ getGrade(scope.row) }} 级
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="TimeFormatter"
          label="该学期打卡时长"
          prop="totalTime"
          min-width="45"
          sortable
        />
        <el-table-column
          :formatter="TimeFormatter"
          label="本周打卡时长"
          prop="weekTime"
          min-width="40"
          sortable
        />
        <el-table-column
          :filter-method="WorkGroupFilterHandler"
          :filters="WorkGroupFilters"
          label="方向"
          prop="workGroup"
          min-width="30"
        >
          <template #default="scope">
            <div class="badge badge-accent">
              {{ scope.row.workGroup }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :filter-method="PrivFilterHandler"
          :filters="PrivFilters"
          label="权限"
          prop="priv"
          min-width="35"
        >
          <template #default="scope">
            <div class="badge badge-primary">
              {{ getPriv(scope.row.priv) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
<!--用户信息展示弹窗-->
      <dialog id="user" ref="user" class="modal">
        <div class="modal-box   glassmophism">
          <div
            class="items-center  rounded-md "
          >
            <section
              class="justify-center items-center w-20 h-20 rounded-full shadow-md bg-gradient-to-r hover:cursor-pointer hover:scale-110 duration-300"
            ><img :src="UserInformation.avatar" class="rounded-full"></section>

            <section class="block border-l border-white m-3">
              <div class="pl-3">

                <h3
                  class="bg-clip-text text-4xl font-bold gradient"
                >
                  {{ UserInformation.name }}
                </h3>
                <h3 class="text-xl"> {{ UserInformation.grade }} {{ UserInformation.major }}</h3>
                <h3 class="text-lg">{{ UserInformation.workGroup }}</h3>
              </div>
              <div class="flex gap-3 pt-2 pl-3"></div>
            </section>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {formatSecondTime} from "../utils/TimeUtil";
import {nextTick, onBeforeMount, onMounted, ref} from "vue";
import "../assets/css/common.css";
import {ElNotification} from "element-plus";
import {GlobalStore} from "../stores/Global";
import {TimerStore} from "../stores/Timer";
import {EmptyUserInfo, getPriv, PrivList, UserInfo, UserTime, WorkGroupList as wgList} from "../api/interfaces/Schema";
import {intToRoman} from "../utils/NumberUtil";
import {getRank, queryUser} from "../api/API";
import {getGrade} from "../utils/StringUtil";


interface Week {
  index: number;
  name: string;
}
const globalStore = GlobalStore();

const boxComponent = ref(null);

let GradeList = ref([]);
let GradeFilters = ref([]);
let WorkGroupFilters = ref([]);
let PrivFilters = ref([]);
let Loading = ref(true);
let UserList = ref<UserTime[]>();
let WeekIndex = ref<Week[]>([]);
let lastXWeek = ref(0);
let UserInformation = ref<UserInfo>(EmptyUserInfo)
let WorkGroupList = ref(wgList)

//处理年级过滤匹配
const filterHandler = (value: string, row: UserTime) => {
  return getGrade(row) === value;
};
//处理权限过滤匹配
const PrivFilterHandler = (value: number, row: UserTime) => {
    return value === row.priv;
}
//处理方向过滤匹配
const WorkGroupFilterHandler = (value: string, row: UserTime) => {
  return row.workGroup === value;
}
//首次加载
onBeforeMount(async () => {
  await loadWeekList();
  await loadRankList();
  loadFilters();
  Loading.value = false;
});

onMounted(async () => {
  await nextTick();
});

const TimeFormatter = (row, colum) => {
  return formatSecondTime(row[colum.property]);
};

const user = ref(null);
//触发展示个人信息弹窗
const showInformation = async (id: string) => {
  let res = await queryUser(id)
  if (!res.success) {
    ElNotification({
      title: "请求失败！",
      message: res.msg,
      type: "error"
    });
  } else {
    UserInformation.value = res.data;
    user.value.showModal();
  }
};

//处理更换x周的计时数据
const handlePageChange = async (state: boolean) => {
  if (Loading.value) return;
  if (state) {
    //to last week
    if (lastXWeek.value === 99) {
      return;
    }
    lastXWeek.value++;
  } else {
    //to next week
    if (lastXWeek.value === 0) {
      return;
    }
    lastXWeek.value--;
  }
  await loadRankList();
};
//最多显示100周前的数据
const max_week_size = 100;
//加载可选的周列表
const loadWeekList = async () => {
  for (let i = 0; i < max_week_size; i++) {
    let str = "本周";
    if (i === 0) {
      str = "本周";
    } else {
      str = "上" + intToRoman(i) + "周";
    }
    WeekIndex.value[i] = {
      index: i,
      name: str,
    };
  }
};
//加载排行榜
const loadRankList = async () => {
  Loading.value = true;
  //获取排行列表
  let res = await getRank(lastXWeek.value)
  if (!res.success) {
    ElNotification({
      title: "请求失败！",
      message: res.msg,
      type: "error",
    });
    return;
  }
  UserList.value = res.data;
  globalStore.setUserRankList(res.data)
  //在加载前获取所有成员的年级列表
  GradeList.value = [];
  for (let i = 0; i < UserList.value.length; i++) {
    let user = UserList.value[i];
    let g = getGrade(user)
    let index = GradeList.value.indexOf(g);
    if (index == -1) GradeList.value.push(g);
    UserList.value[i].avatar = UserList.value[i].avatar + "?" + Math.random();
  }
  GradeFilters.value = [];
  GradeList.value.forEach((i) => {
    let obj = {
      text: i + "级",
      value: i,
    };
    GradeFilters.value.push(obj);
  });
  Loading.value = false;
};
//加载过滤器列表
const loadFilters = () => {
  //方向过滤器
  WorkGroupList.value.forEach((i) => {
    let obj = {
      text: i,
      value: i,
    }
    WorkGroupFilters.value.push(obj)
  })
  //权限过滤器
  PrivList.forEach((i)=>{
    let obj = {
      text: i.name,
      value: i.val,
    }
    PrivFilters.value.push(obj)
  })
}

//重置时间
const resetLastWeek = async () => {
  if (Loading.value) {
    return
  }
  lastXWeek.value = 0;
  await loadRankList();
}
//加载图标
const svgLoading = `<svg viewBox="0 0 108 108">
<circle cx="12.5" cy="12.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="0s" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">
        <animate attributeName="fill-opacity"
         begin="100ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="52.5" cy="12.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="300ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="52.5" cy="52.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="600ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="92.5" cy="12.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="800ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="92.5" cy="52.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="400ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="12.5" cy="92.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="700ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="52.5" cy="92.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="500ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="92.5" cy="92.5" r="12.5">
        <animate attributeName="fill-opacity"
         begin="200ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
</svg>`
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
  --el-table-tr-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));
  --el-table-row-hover-bg-color: hsl(var(--pc) / var(--tw-text-opacity));
  --el-table-header-bg-color: hsl(var(--b1) / var(--tw-bg-opacity));;
  /*
  //--el-tag-bg-color: 年级标签 背景颜色; //--el-tag-text-color: 年级标签 文字颜色;
   */
}

:deep(.cell) {
  font-family: "Sanchez", "WenKai-B", serif;
  font-weight: 700;
  color: hsla(var(--bc) / var(--tw-text-opacity, 1));
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-loading-spinner) {
  margin-top: 10rem;
  position: static;
}

.glassmophism {
  background: rgba(255, 255, 255, .2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

</style>
