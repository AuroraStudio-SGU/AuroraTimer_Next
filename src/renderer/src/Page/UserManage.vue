<script setup lang="ts">
//加载图标
import {GlobalStore} from "../stores/Global";

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
import {onBeforeMount, ref} from "vue";
import {getPriv, PrivList, User, UserTime, WorkGroupList as wgList} from "../api/interfaces/Schema";
import {ElNotification} from "element-plus";
import {deleteUser, queryAllUser, queryUser, updateUser} from "../api/API";
import {getGrade} from "../utils/StringUtil";
import {useRouter} from "vue-router";



const router = useRouter()
const globalStore = GlobalStore()

let emptyInformation: User = {
  afk: false, avatar: "", password: "", grade: "", id: "", admin: false, major: "", name: "", token: "", workGroup: "", priv: 0, reduceTime: 0
}
const fallback = () => {
  router.back()
}
const operator = ref<User>(emptyInformation)

//处理权限过滤匹配
const PrivFilterHandler = (value: number, row: UserTime) => {
  return value === row.priv;
}
//处理方向过滤匹配
const WorkGroupFilterHandler = (value: string, row: UserTime) => {
  if(value==="全体成员") return true;
  return row.workGroup === value;
}

let WorkGroupFilters = ref([]);
let PrivFilters = ref([]);
//加载过滤器列表
let WorkGroupList = ref(wgList)
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
const GradeFormatter = (row, colum) => {
  return row.uid.substring(0, 2);
}
const filterHandler = (value: string, row: UserTime) => {
  return row.id.substring(0, 2) === value;
}
let SelectedList = ref<User[]>([])
const handleSelectionChange = (list: User[]) => {
  SelectedList.value = list;
}



let LoadingData = ref(true)
let UserList = ref<User[]>();
let withAFK = ref(true);
let GradeList = ref([]);
let GradeFilters = ref([]);
let information = ref(null);//修改信息对话框对象
let confirm_delete = ref(null);//确认删除成员对话框对象
const usercard = ref(null);//用户信息弹窗对象
let UserInformation = ref<User>(emptyInformation)
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
  UserList.value = res.data;
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
  LoadingData.value = false;
};
onBeforeMount(async () => {
  await loadUserList()
  loadFilters();
  let res = await queryUser(globalStore.Setting.userInfo.id);
  if(res.success){
    operator.value = res.data;
  }

})
const handleChangeInformation = (user: User) => {
  UserInformation.value = user;
  information.value.showModal()
}


const applyUserInfo = async () => {
  let res = await updateUser(UserInformation.value);
  if (res.success) {
    ElNotification({
      title: "操作成功",
      message: "修改成功",
      type: 'success'
    })
  } else {
    ElNotification({
      title: "操作失败",
      message: res.msg,
      type: 'error'
    })
  }
}
const setUserAfk = async (user: User) => {
  user.afk = true;
  let res = await updateUser(user);
  if (res.success) {
    ElNotification({
      title: "操作成功",
      type: "success",
    })
  } else {
    ElNotification({
      title: "系统错误",
      message: res.msg,
      type: "error",
    })
  }
}

let isCrossWorkGroup = ref(false)
const confirm_delete_list = ref(null);
const handleMulitDel = () => {
  SelectedList.value.forEach(u=>{
    if(u.workGroup!=operator.value.workGroup && operator.value.priv<100){
      isCrossWorkGroup.value = true;
    }
  })
  confirm_delete_list.value.showModal()
}
const handelDelModal = (user: User) => {
  UserInformation.value = user;
  confirm_delete.value.showModal()
}
const DeleteBatchUser = async ( users:User[])=>{
  //没有选择则不处理
  if(users.length==0) return;
  for (const u of users) {
    if(u.workGroup==operator.value.workGroup || operator.value.priv>=100){
      await deleteUser(u.id);
    }
  }
}
const DeleteUser = async (id: string) => {
  let res = await deleteUser(id);
  if (res.success) {
    ElNotification({
      title: "删除成功",
      type: "success"
    })
  } else {
    ElNotification({
      title: "删除失败",
      message: res.msg,
      type: "error"
    })
  }
}
//触发展示个人信息弹窗
const showInformation = async (user: User) => {
  UserInformation.value = user;
  usercard.value.showModal();
};
</script>

<template>
  <div class="menu">
    <div class="white-box-rank">
      <div class="Title flex">
        <svg
            class="icon m-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            width="32" height="32" @click="fallback">
          <path
              d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
              fill="#272636"></path>
        </svg>
        工作室人员设置
      </div>
      <div class="user-list overflow-auto">
        <el-table
            :data="UserList"
            v-loading="LoadingData"
            :element-loading-svg="svgLoading"
            @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30" fixed @selection-change="handleSelectionChange"/>
          <el-table-column label="姓名" prop="name" min-width="35" sortable>
            <template #default="scope">
              <div style="display: flex; align-items: center" @click="showInformation(scope.row)">
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
              min-width="30"
              show-overflow-tooltip
          />
          <el-table-column
              :filter-method="filterHandler"
              :filters="GradeFilters"
              :formatter="GradeFormatter"
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
          <el-table-column label="操作" min-width="70">
            <template #default="scope">
              <button class="btn btn-ghost btn-xs" @click="handleChangeInformation(scope.row)">修改信息</button>
              <button class="btn btn-ghost btn-xs" v-if="scope.row.afk==false" @click="setUserAfk(scope.row)">
                设置为退休
              </button>
              <button class="btn btn-ghost btn-xs" @click="handelDelModal(scope.row)">删除</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="action-list m-2">
        <button class="btn" @click="handleMulitDel">删除已选的成员</button>
      </div>
      <!--修改信息对话框-->
      <dialog id="information" ref="information" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box user-info-box">
          <h3 class="font-bold text-2xl">修改 {{ UserInformation.name }} 的用户信息</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div class="flex justify-stretch m-4">
            <label class="label">
              <span class="label-text">姓名</span>
            </label>
            <input type="text" placeholder="名字" class="input input-bordered" v-model="UserInformation.name"/>
            <label class="label">
              <span class="label-text">年级</span>
            </label>
            <select class="selector input input-bordered" v-model="UserInformation.grade">
              <option selected disabled >请选择年级</option>
              <option v-for="(item,index) in GradeList" :key="index">{{item}}</option>
            </select>
          </div>
          <div class="flex justify-stretch m-4">
            <label class="label">
              <span class="label-text">方向</span>
            </label>
            <select class="selector input input-bordered" v-model="UserInformation.workGroup">
              <option disabled >请选择方向</option>
              <option selected v-show="UserInformation.workGroup==item" v-for="(item,index) in WorkGroupList" :key="index">{{item}}</option>
              <option v-show="UserInformation.workGroup!=item" v-for="(item,index) in WorkGroupList" :key="index">{{item}}</option>
            </select>
            <label class="label">
              <span class="label-text">专业</span>
            </label>
            <input type="text" placeholder="专业" class="input input-bordered" v-model="UserInformation.major"/>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn m-2" @click="applyUserInfo">保存</button>
              <button class="btn m-2">关闭</button>
            </form>
          </div>
        </div>
      </dialog>
      <!--确认删除-->
      <dialog id="confirm_delete" ref="confirm_delete" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-2xl">请确认</h3>
          <p class="py-4">你真的要删除 [{{ UserInformation.name }}] 吗?</p>
          <div class="modal-action">
            <form method="dialog" class="">
              <button class="btn m-2" @click="DeleteUser(UserInformation.id)">我老残忍了</button>
              <button class="btn m-2">还是算了</button>
            </form>
          </div>
        </div>
      </dialog>
      <!--确认删除(List)-->
      <dialog id="confirm_delete_list" ref="confirm_delete_list" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h2 class="font-bold text-2xl">请确认</h2>
          <p class="py-4">你真的要删除以下成员吗?</p>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div class="names" v-for="(user,index) in SelectedList" :key="index">
            <h3 class="text-lg" v-show="user.workGroup==operator.workGroup || operator.priv>=100" > {{ user.name }} </h3>
          </div>
          <div class="crossDel" v-show="isCrossWorkGroup">
            <h2 class="font-bold text-lg">此外,这些成员的方向与你不同，非管理员无法删除</h2>
            <div class="names" v-for="(user,index) in SelectedList" :key="index">
              <h3 class="text-lg" v-if="user.workGroup!=operator.workGroup" > {{ user.name }} </h3>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn m-2" @click="DeleteBatchUser(SelectedList)">我老残忍了</button>
              <button class="btn m-2">还是算了</button>
            </form>
          </div>
        </div>
      </dialog>
      <!--用户信息展示弹窗-->
      <dialog id="usercard" ref="usercard" class="modal">
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
                <h3 class="text-xl">年级: {{ UserInformation.grade }} {{ UserInformation.major }}</h3>
                <h3 class="text-lg">方向: {{ UserInformation.workGroup }}</h3>
                <h3 class="text-lg">减时情况: {{ (UserInformation.reduceTime / 3600).toFixed(2) }} 小时 是否退休: {{  UserInformation.afk? '已退休' : '还没退休'}}</h3>
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
  padding: 0 6px;
}
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left) {
  background: hsl(var(--ac) / var(--tw-text-opacity));
}

:deep(.el-loading-spinner) {
  margin-top: 10rem;
  position: static;
}

:deep(.el-scrollbar__bar is-vertical) {
  display: none;
}

.glassmophism {
  background: rgba(255, 255, 255, .2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
