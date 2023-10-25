<script setup lang="ts">
// const fallback = ()=>{ router.back() }
import {onBeforeMount, ref} from "vue";
import {UserInfo, UserTime} from "../api/interfaces/Schema";
import {ElNotification} from "element-plus";
import {getAvatarById, queryAllUser, queryUser, updateUser} from "../api/API";

const svgLoading = `<circle cx="12.5" cy="12.5" r="12.5">
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
    </circle>`
const GradeFormatter = (row, colum) => {
  return row.uid.substring(0, 2);
}
const filterHandler = (value: string, row: UserTime) => {
  return row.id.substring(0, 2) === value;
}
let SelectedList = ref<UserInfo[]>([])
const handleSelectionChange = (list: UserInfo[]) => {
  SelectedList.value = list;
}


let LoadingData = ref(true)
let UserList = ref<UserInfo[]>();
let withAFK = ref(true);
let GradeList = ref([]);
let GradeFilters = ref([]);
let information = ref(null)

const loadUserList = async () => {
  LoadingData.value = true;
  //获取排行列表
  let res = await queryAllUser(withAFK.value)
  if (!res.success) {
    ElNotification({
      title: "请求失败！",
      message: res.msg,
      type: "error",
    });
    return;
  }
  document.getElementsByClassName('circular')[0].attributes[1].value = "0 0 108 108"
  UserList.value = res.data;
  //TODO 到时候让大家把个人信息都填一填，现在先用学号来判断
  GradeList.value = [];
  for (let i = 0; i < UserList.value.length; i++) {
    let user = UserList.value[i];
    let g = user.id.substring(0, 2);
    let index = GradeList.value.indexOf(g);
    if (index == -1) GradeList.value.push(g);
    let res = await getAvatarById(user.id);
    if (res.success) {
      UserList.value[i].avatar = res.data + "?" + Math.random();
    }
  }
  GradeFilters.value = [];
  GradeList.value.forEach((i) => {
    let obj = {
      text: i + "级",
      value: i,
    };
    GradeFilters.value.push(obj);
  });
  LoadingData.value = false;
};
onBeforeMount(async () => {
  await loadUserList()
})
let emptyInformation: UserInfo = {WeekTime: 0, avatar: "", grade: "", id: "", admin: false, major: "", name: "", token: "", work_group: ""}
let currentUser = ref<UserInfo>(emptyInformation)
const handleChangeInformation = async (id: string) => {
  let res = await queryUser(id);
  if (res.success) {
    currentUser.value = res.data;
    information.value.showModal()
  } else {
    ElNotification({
      title: "请求失败！",
      message: res.msg,
      type: "error"
    });
  }
}
const applyUserInfo = async ()=>{
  let res = await updateUser(currentUser.value);
  if(res.success){
    ElNotification({
      title:"操作成功",
      message:"修改成功",
      type:'success'
    })
  }else {
    ElNotification({
      title:"操作失败",
      message:res.msg,
      type:'error'
    })
  }
}
</script>

<template>
  <div class="menu">
    <div class="white-box-rank">
      <div class="Title p-4">工作室人员设置</div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Remember me</span>
          <input type="checkbox" checked="checked" class="checkbox checkbox-accent"/>
        </label>
      </div>
      <svg
          class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="32" height="32">
        <path
            d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
            fill="#272636" p-id="4009"></path>
      </svg>
      <div class="user-list overflow-auto">
        <el-table
            :data="UserList"
            v-loading="LoadingData"
            :element-loading-svg="svgLoading"
            @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30" fixed/>
          <el-table-column label="姓名" prop="name" min-width="60" sortable>
            <template #default="scope">
              <div style="display: flex; align-items: center">
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
              label="学号"
              prop="id"
              min-width="40"
              show-overflow-tooltip
          />
          <el-table-column
              :filter-method="filterHandler"
              :filters="GradeFilters"
              :formatter="GradeFormatter"
              label="年级"
              prop="grade"
              min-width="40"
          >
            <template #default="scope">
              <el-tag disable-transitions>
                {{ scope.row.id.substring(0, 2) }} 级
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              label="减时情况"
              prop="reduceTime"
              min-width="50"
          >
            <template #default="scope">
              {{ (scope.row.reduceTime / 3600).toFixed(2) }} 小时
            </template>
          </el-table-column>
          <el-table-column
              label="是否退休"
              prop="afk"
              min-width="40"
          >
            <template #default="scope">
              {{ scope.row.afk ? '已退休' : '还没退休' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template #default="scope">
              <button class="btn btn-ghost btn-xs" @click="handleChangeInformation(scope.row.id)">修改信息</button>
              <button class="btn btn-ghost btn-xs">设置为退休</button>
              <button class="btn btn-ghost btn-xs">删除</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="action-list m-2">
        <button class="btn">批量设置减时</button>
        <button class="btn">批量设置退休</button>
        <button class="btn">批量删除</button>
      </div>
      <!--      修改信息对话框-->
      <!--设置个人信息页面-->
      <dialog id="information" ref="information" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box user-info-box">
          <h3 class="font-bold text-lg">修改 {{ currentUser.name }} 的用户信息</h3>
          <div class="flex justify-stretch m-4">
            <label class="label">
              <span class="label-text">姓名</span>
            </label>
            <input type="text" placeholder="名字" class="input input-bordered" v-model="currentUser.name"/>
            <label class="label">
              <span class="label-text">年级</span>
            </label>
            <input type="text" placeholder="年级" class="input input-bordered" v-model="currentUser.grade"/>
          </div>
          <div class="flex justify-stretch m-4">
            <label class="label">
              <span class="label-text">方向</span>
            </label>
            <input type="text" placeholder="方向" class="input input-bordered" v-model="currentUser.work_group"/>
            <label class="label">
              <span class="label-text">专业</span>
            </label>
            <input type="text" placeholder="专业" class="input input-bordered" v-model="currentUser.major"/>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn m-2" @click="applyUserInfo">保存</button>
              <button class="btn m-2">关闭</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

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

.user-info-box {
  @apply max-w-2xl;
}

:deep(.el-loading-spinner) {
  top: 10%
}

:deep(.el-scrollbar__bar is-vertical) {
  display: none;
}
</style>
