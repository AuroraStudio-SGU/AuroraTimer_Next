<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title">管理页面 当前职位:{{ priv.candidName }}</div>
      <div class="buttons">
        <div class="button-items admin" v-show="priv.val>=100">
        <!--管理员设置元素-->
          <button class="btn" style="margin-right: 1rem" onclick="notice.showModal()">设置公告内容📢</button>
          <button class="btn" style="margin-right: 1rem" onclick="targetTime.showModal()">设置目标时长⏰</button>
          <button class="btn" style="margin-right: 1rem" onclick="reduceTime.showModal()">设置减时⏳︎</button>
          <button class="btn" style="margin-right: 1rem" @click="handelOpenCalendar">学期情况︎</button>
        </div>
        <div class="button-items duty" v-show="priv.val==2 || priv.val>=100">
          <button class="btn" onclick="duty.showModal()">设置值日🧹</button>
        </div>
        <div class="button-items manager" v-show="priv.val>=11">
          <button class="btn" @click="toUserManage">成员管理</button>
        </div>
      </div>
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
      <!--公告设置页面-->
      <dialog id="notice" ref="notice"  class="modal">
        <div class="modal-box-notice modal-box relative overflow-hidden">
          <h3 class="font-bold text-lg">公告设置📢</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div class="container text-editor">
            <TextEditor data-twind-ignore ref="textEditor"></TextEditor>
          </div>
          <div class="modal-action">
            <label for="notice" class="btn" @click="uploadNotice">保存</label>
          </div>
        </div>
      </dialog>
      <!--打卡时长设置页面-->
      <dialog id="targetTime" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box modal-select-size">
          <h3 class="font-bold text-lg">设置目标时长⏰</h3>
          <p class="py-4">设置打卡时长要求，以最新的数据为准</p>
          <select class="selector input input-bordered" v-model="targetTime">
            <option selected disabled >⏰⏰⏰⏰</option>
            <option v-for="(item,index) in TargetTimeOptions" :key="index" :value="item.value">{{item.label}}</option>
          </select>
          <div class="modal-action">
            <button class="btn" @click="handleTargetUpload">保存并上传</button>
            <form method="dialog">
              <button class="btn">关闭</button>
            </form>
          </div>
        </div>
      </dialog>
      <!--设置减时页面-->
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
      <!--学期情况-->
      <dialog id="Calendar" ref="Calendar" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box modal-select-size term-modal">
          <h3 class="font-bold text-lg">学期情况</h3>
          <el-date-picker
            v-model="TermList"
            type="daterange"
            start-placeholder="学期开始日期"
            end-placeholder="学期结束日期"
          />
          <div class="modal-action">
            <button class="btn" @click="handleSaveTerm">保存并上传</button>
            <form method="dialog">
              <button class="btn">关闭</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/css/scrollbar.css'
import {onBeforeMount, ref} from "vue";
import {ElNotification} from "element-plus";
import {setDuty, setReduceTime, setTargetTime, createNotice, getPriv, getTerm, updateTerm} from '../api/API'
import {GlobalStore} from "../stores/Global";
import TextEditor from "../components/TextEditor.vue";
import {TimerStore} from "../stores/Timer";
import {Notice, Priv, Term} from "../api/interfaces/Schema";
import {useRouter} from "vue-router";


const router = useRouter()
//学期情况对话框对象
const Calendar = ref()

const InvalidPriv:Priv = {val:-1,candidName:"权限未找到"}
const textEditor = ref(null)
const globalStore = GlobalStore()
const timerStore = TimerStore()
const notice = ref(null)//对话框对象
let priv = ref<Priv>(InvalidPriv)

function isNotEmptyStr(s) {
  return typeof s == 'string' && s.length > 0;
}


onBeforeMount(async () => {
  let start = 12;
  let end = 48;
  let step = 0.5;
  for (let i = start; i < end; i += step) {
    let time = {
      label: i + 'H',
      value: i
    }
    TargetTimeOptions.value.push(time)
  }
  //load priv
  let res = await getPriv();
  if(!res.success){
    priv.value = InvalidPriv;
  }else {
    if(res.data == null){
      priv.value = InvalidPriv;
    }else {
      try{
        priv.value = JSON.parse(res.data);
      }catch (e) {
        priv.value = InvalidPriv;
        console.error(e)
      }
    }
  }
})

const uploadNotice = async () => {
  if (isNotEmptyStr(textEditor.value.valueHtml)) {
    let notice:Notice = {
      user_id:globalStore.Setting.userInfo.id,
      context:textEditor.value.valueHtml,
      notice_id:null,
    }
    let res = await createNotice(notice);
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
  } else {
    ElNotification({
      title: "参数错误!",
      message: "公告内容为空",
      type: "error",
    });
  }
  notice.value.close()
}

const TargetTimeOptions = ref([])

const targetTime = ref('')
const handleTargetUpload = async () => {
  let time = Number(targetTime.value)
  if (isNaN(time)) {
    ElNotification({
      title: "参数错误",
      message: "请填一个数字",
      type: "error",
    });
  }
  let res = await setTargetTime(time)
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
  if (!isNotEmptyStr(ReducePerson.value)) {
    ElNotification({
      title: "参数错误!",
      message: "你填了人名了吗？",
      type: "error",
    });
    return
  }
  let hours = Number(ReduceTime.value)
  if (isNaN(hours)) {
    ElNotification({
      title: "参数错误!",
      message: "请填一个正确的数字",
      type: "error",
    });
  } else {
    let uid = globalStore.getUidFormName(ReducePerson.value);
    if (uid === null) {
      ElNotification({
        title: "参数错误!",
        message: "该成员并不存在",
        type: "error",
      });
      return
    }else if(uid==="ERROR_MULTI_USER_RESULT"){
      ElNotification({
        title: "参数错误!",
        message: "存在多个相同id的成员,请联系管理员",
        type: "error",
      });
      return
    }
    let res = await setReduceTime(uid, hours * 3600);
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
let EmptyTerm:Term = {
  end: new Date(), id: "", start: new Date()
}
let TermList = ref([])
let SelectedTerm = ref<Term>(EmptyTerm)
const handelOpenCalendar = async () =>{
  //加载学期情况
  let res = await getTerm();
  if(!res.success){
    ElNotification({
      title: "加载失败!",
      message: res.msg,
      type: "error",
    });
    return;
  }
  TermList.value[0] = new Date(res.data.start)
  TermList.value[1] =  new Date(res.data.end)
  SelectedTerm.value.id = res.data.id;
  SelectedTerm.value.start = new Date(res.data.start)
  SelectedTerm.value.end = new Date(res.data.end)
  //解决element-plus兼容问题
  const el_pop = document.querySelector('div[id^="el-popper-container-"]');
  const dialog = document.getElementById("Calendar");
  if(el_pop){
    dialog.appendChild(el_pop)
  }
  Calendar.value.showModal()
}
const handleSaveTerm = async () =>{
  //TODO 日期检测
  SelectedTerm.value.start = TermList.value[0];
  SelectedTerm.value.end = TermList.value[1];
  let res = await updateTerm(SelectedTerm);
  if(!res.success){
    ElNotification({
      title: "加载失败!",
      message: res.msg,
      type: "error",
    });
  }else {
    ElNotification({
      title: "更新成功!",
      type: "success",
    });
  }
}

const toUserManage = () => {
  router.push({name:'Users'})
}
</script>

<style scoped>
/*这里和组件内的样式冲突了，所以手动设置*/
.modal-box-notice {
  max-width: 40rem;
  height: 40rem;
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

.modal-select-size {
  height: 32rem;
}

.button-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.buttons{
  display: flex;
  align-items: center;
  justify-content: space-around;

}
.term-modal {
  max-width: 48rem !important;
}
.modal-action{
  margin-top: 0;
}
</style>
