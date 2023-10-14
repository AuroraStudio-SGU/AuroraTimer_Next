<template>
  <div
    class="break-words bg-base-100 w-full shadow-lg rounded-xl"
    style="transform: scale(1)"
  >
    <div class="top-white"></div>
    <div>
      <div class="flex flex-wrap justify-center">
        <div class="secondary"></div>
        <div class="w-full flex justify-center absolute">
          <div
            class="relative"
            @mouseenter="handleMoveIn"
            @mouseleave="handleMoveOut"
          >
            <div class="avatar-box">
              <img
                :src="getUrl('profile.jpg')"
                class="shadow-xl rounded-full align-middle border-4 border-base-100 max-w-[150px]"
              />
            </div>
            <div class="colbox" v-show="moveIn" onclick="avatarUpload.showModal()">点击修改头像</div>
          </div>
        </div>
        <div class="w-full text-center mt-5">
          <div class="flex justify-center lg:pt-4 pb-0 pt-14">
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
              >前端</span
              >
              <span class="text-sm text-slate-400">方向</span>
            </div>
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-slate-700"
              >21级</span
              >
              <span class="text-sm text-slate-400">年级</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-2">
        <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
          {{ globalStore.getUserInfo.name }}
        </h3>
        <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
          <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i
          >物联网工程
        </div>
      </div>
    </div>
    <div class="button-group flex justify-center items-center">
      <button class="btn btn-outline btn-primary" style="margin-right: 30px;" onclick="userInfo.showModal()">
        编辑个人信息
      </button>
      <button class="btn btn-outline btn-primary">退 出 登 录</button>
    </div>
  </div>
  <!--设置头像页面-->
  <dialog id="avatarUpload" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">更改头像</h3>
      <label v-if="!NewAvatar" for="dropzone-file" class="dropzone">
        <div
          class="flex flex-col items-center justify-center px-3 pt-5 pb-6"
        >
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-gbase-600 dark:text-gbase-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span class="font-semibold">电极上传</span>
          <p class="text-sm text-red-500">
            {{ AvatarError }}
          </p>
        </div>
        <input id="dropzone-file" accept="image/*" type="file" class="hidden" @change="selectAvatarFile">
      </label>
      <output v-if="UploadSuccess" class="drop-shadow m-2 w-96">
        <Cropper
          ref="cropper"
          class="cropper"
          :src="NewAvatarURL"
          :stencil-props="{
                aspectRatio: 1,
              }"
          :canvas="{
                minHeight: 64,
                minWidth: 64,
                maxHeight: 640,
                maxWidth: 640,
              }"
          @change="crop"
        />
      </output>
      <img v-else :src="NewAvatarURL" class="mask mask-squircle overflow-hidden _avatar w-56 h-56">
      <div class="modal-action">
        <form method="dialog">
          <button class="btn m-2" @click="saveAndUploadAvatar">保存</button>
          <button class="btn m-2" @click="handelCancel">取消</button>
        </form>
      </div>
    </div>
  </dialog>
  <!--设置个人信息页面-->
  <dialog id="userInfo" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box user-info-box">
      <h3 class="font-bold text-lg">个人信息</h3>
      <div class="flex justify-stretch m-4">
        <label class="label">
          <span class="label-text">姓名</span>
        </label>
        <input type="text" placeholder="名字" class="input input-bordered" v-model="UserInformation.name"/>
        <label class="label">
          <span class="label-text">年级</span>
        </label>
        <input type="text" placeholder="年级" class="input input-bordered" v-model="UserInformation.name"/>
        <!-- TODO 密码修改 -->
      </div>
      <div class="flex justify-stretch m-4">
        <label class="label">
          <span class="label-text">方向</span>
        </label>
        <input type="text" placeholder="方向" class="input input-bordered" v-model="UserInformation.name"/>
        <label class="label">
          <span class="label-text">专业</span>
        </label>
        <input type="text" placeholder="专业" class="input input-bordered" v-model="UserInformation.name"/>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn m-2">保存并上传</button>
          <button class="btn m-2">关闭</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {getUrl} from "../utils/urlUtils";
import {GlobalStore} from "../stores/Global";
import {onMounted, ref} from "vue";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import {UserInfo} from "../api/interfaces/Schema";
import {updateAvatar} from "../api/API";
import {ElNotification} from "element-plus";

const globalStore = GlobalStore();

let moveIn = ref(false);

const NewAvatar = ref(false)
const NewAvatarURL = ref('')
const AvatarError = ref(undefined);
const croppedAvatar = ref<ArrayBuffer>()
const UploadSuccess = ref(true)
const cropper = ref()

let emptyInformation: UserInfo = {
  WeekTime: 0, id: "", isAdmin: false, major: "", name: "", token: ""
}

let UserInformation = ref<UserInfo>(emptyInformation)

function checkAvatar(file: ArrayBuffer) {
  return file.byteLength <= 2_000_000 // 2 MB
}

const saveAndUploadAvatar = async () => {
  handleMoveOut()
  //TODO uploadFile
  if(croppedAvatar.value){
    let res = await updateAvatar(croppedAvatar.value,globalStore.Setting.userInfo.id)
    if(res.success){
      globalStore.Setting.userInfo.avatar = res.data;
      ElNotification({
        title: "上传成功",
        message: "可能不能及时更新显示",
        type: "success",
      });
    }else {
      ElNotification({
        title: "上传失败!",
        message: res.msg,
        type: "error",
      });
    }
  }
  NewAvatarURL.value = '';
  NewAvatar.value = false
}
const handelCancel = () => {
  handleMoveOut()
  NewAvatarURL.value = '';
  NewAvatar.value = false
}
const selectAvatarFile = async (e: Event) => {
  const file = (e?.target as HTMLInputElement)?.files?.[0]
  if (!file) {
    return
  }

  if (!checkAvatar(await file.arrayBuffer())) {
    AvatarError.value = "图片不得超过2MB"
    return
  }
  NewAvatar.value = true;
  NewAvatarURL.value = URL.createObjectURL(file);
}

function crop({canvas}: { canvas: HTMLCanvasElement }) {
  canvas.toBlob(async (blob) => {
    croppedAvatar.value = await blob?.arrayBuffer()
  }, 'image/png', 1)
}

onMounted(() => {
  NewAvatar.value = false;
})

const handleMoveIn = () => {
  moveIn.value = true;
};
const handleMoveOut = () => {
  moveIn.value = false;
};
</script>

<style scoped>
.relative {
  width: 150px;
  height: 150px;
}

.avatar-box {
  position: absolute;
  width: 150px;
  height: 150px;
}

.colbox {
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(86, 86, 86, 0.5);
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  color: aliceblue;
}

.secondary {
  @apply bg-accent;
  width: 100%;
  height: 75px;
}

.top-white {
  @apply bg-accent;
  width: 100%;
  height: 40px;
  border-radius: 10px 10px 0 0;
}

.dropzone {
  @apply flex flex-col justify-center items-center w-full h-64 bg-base-100 rounded-lg border-2 border-base-300 border-dashed cursor-pointer;
  @apply hover:bg-base-100;
  @apply hover:shadow-lg;
  @apply transition-shadow transition-colors;
}

._avatar {
  min-width: 150px;
  max-width: 200px;
  @apply object-cover aspect-square;
}

.user-info-box {
  @apply max-w-2xl;
}

/* .button-group {
  display: flex;
  align-items: center;
} */
</style>
