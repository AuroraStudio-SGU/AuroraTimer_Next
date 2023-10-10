<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title">管理员设置</div>
      <div>
        <label class="label">
          <span>本周公告设置:</span>
        </label>
        <!--公告设置触发元素-->
        <button class="btn" onclick="notice.showModal()">设置公告内容📢</button>
        <button class="btn" onclick="duty.showModal()">设置值日🧹</button>
        <button class="btn" onclick="targetTime.showModal()">设置目标时长⏰</button>
        <button class="btn" onclick="reduceTime.showModal()">设置减时⏳︎</button>
        <!--公告设置页面-->
        <dialog id="notice" class="modal">
          <div class="modal-box-notice modal-box relative overflow-hidden">
            <h3 class="font-bold text-lg">公告设置📢</h3>
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="container">
              <TextEditor data-twind-ignore ref="textEditor"></TextEditor>
            </div>
            <div class="modal-action">
              <label for="notice" class="btn" @click="uploadNotice">保存</label>
            </div>
          </div>
        </dialog>
        <!--值日设置页面-->
        <dialog id="duty" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">值日设置🧹</h3>
            <p class="py-4">分别输入周三,周日需要值日的人员。如果忘记设置，则会显示"未安排"</p>
            <label class="label">
              <span class="label-text">周三值日:</span>
            </label>
            <input type="text" placeholder="🧹🧹🧹🧹" class="input input-bordered w-full max-w-xs" v-model="WedPerson"/>
            <label class="label">
              <span class="label-text">周日值日:</span>
            </label>
            <input type="text" placeholder="🧹🧹🧹🧹" class="input input-bordered w-full max-w-xs" v-model="SunPerson"/>
            <div class="modal-action">
              <button class="btn" @click="handleDuty">保存并上传</button>
              <form method="dialog">
                <button class="btn">关闭</button>
              </form>
            </div>
          </div>
        </dialog>
        <!--打卡时长设置页面-->
        <dialog id="targetTime" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box modal-select-size">
            <h3 class="font-bold text-lg">设置目标时长⏰</h3>
            <p class="py-4">设置打卡时长要求，以最新的数据为准</p>
            <el-select v-model="targetTime" clearable placeholder="⏰⏰⏰⏰" :teleported="false">
              <el-option
                v-for="item in TargetTimeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div class="modal-action">
              <button class="btn" @click="handleTargetUpload">保存并上传</button>
              <form method="dialog">
                <button class="btn">关闭</button>
              </form>
            </div>
          </div>
        </dialog>
        <!--减时设置页面-->
        <dialog id="reduceTime" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">设置减时⏳</h3>
            <p class="py-4">输入需要减时人员的名字,以及减时的小时数。每周重置</p>
            <label class="label">
              <span class="label-text">需要减时的人员</span>
            </label>
            <input type="text" placeholder="人名" class="input input-bordered w-full max-w-xs" v-model="ReducePerson"/>
            <label class="label">
              <span class="label-text">减时时长</span>
            </label>
            <input type="text" placeholder="100" class="input input-bordered w-full max-w-xs" v-model="ReduceTime"/>
            <div class="modal-action">
              <button class="btn" @click="handleReduceTime">保存并上传</button>
              <form method="dialog">
                <button class="btn">关闭</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/css/scrollbar.css'
import {onBeforeMount, ref} from "vue";
import {AdminStore} from "../stores/Admin";
import {ElNotification} from "element-plus";
import {setDuty, setReduceTime, setTargetTime} from '../api/API'
import {GlobalStore} from "../stores/Global";
import TextEditor from "../components/TextEditor.vue";
import {TimerStore} from "../stores/Timer";

const textEditor = ref(null)
const adminStore = AdminStore()
const globalStore = GlobalStore()
const timerStore = TimerStore()


function isNotEmptyStr(s) {
  return typeof s == 'string' && s.length > 0;
}

onBeforeMount(()=>{
  let start = 12;
  let end = 48;
  let step = 0.5;
  for (let i = start; i < end; i+=step) {
    let time = {
      label:i+'H',
      value:i
    }
    TargetTimeOptions.value.push(time)
  }
})

const uploadNotice = () => {
  console.log(textEditor.value.valueHtml)
  adminStore.noticeHTML = textEditor.value.valueHtml
}

const TargetTimeOptions = ref([])

const targetTime = ref('')
const handleTargetUpload = async ()=>{
  if(targetTime.value === ""){
    return ;
  }
  let res = await setTargetTime(targetTime.value)
  if (!res.success) {
    ElNotification({
      title: "系统错误!",
      message: res.msg,
      type: "error",
    });
  } else {
    ElNotification({
      title: "设置成功!",
      type: "success",
    });
  }
}





let WedPerson = ref('')
let SunPerson = ref('')
const handleDuty = async () => {
  if (!isNotEmptyStr(WedPerson.value) || !isNotEmptyStr(SunPerson.value)) {
    ElNotification({
      title: "数据为空!",
      message: "你确定你填了吗?",
      type: "error",
    });
    return;
  }
  let res = await setDuty(WedPerson.value, SunPerson.value);
  if (!res.success) {
    ElNotification({
      title: "系统错误!",
      message: res.msg,
      type: "error",
    });
  } else {
    ElNotification({
      title: "设置成功!",
      type: "success",
    });
  }
}

let ReduceTime = ref(100.5)
let ReducePerson = ref('陈典灿')

const handleReduceTime = async () => {
  if(!isNotEmptyStr(ReducePerson.value)){
    ElNotification({
      title: "参数错误!",
      message: "你填了人名了吗？",
      type: "error",
    });
    return
  }
  let hours = Number(ReduceTime.value)
  if(isNaN(hours)){
    ElNotification({
      title: "参数错误!",
      message: "请填一个正确的数字",
      type: "error",
    });
  }else {
    let uid = await timerStore.getUidFormName(ReducePerson.value);
    if(uid === null){
      ElNotification({
        title: "参数错误!",
        message: "该成员并不存在",
        type: "error",
      });
      return
    }
    let res = await setReduceTime(uid,hours*3600);
    if (!res.success) {
      ElNotification({
        title: "系统错误!",
        message: res.msg,
        type: "error",
      });
    } else {
      ElNotification({
        title: "设置成功!",
        type: "success",
      });
    }
  }
}
</script>

<style scoped>
/*这里和组件内的样式冲突了，所以手动设置*/
.modal-box-notice {
  max-width: 40rem;
  height: 37rem;
}

.container {
  width: fit-content;
  @apply m-4;
  height: 28rem;
  min-height: 16rem;
  position: relative;
  top: 1rem;
  overflow-y: auto;
}
.modal-select-size{
  height: 32rem;
}

</style>
