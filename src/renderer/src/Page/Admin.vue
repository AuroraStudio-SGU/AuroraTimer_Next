<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title">管理员设置</div>
      <div>
        <label class="label">
          <span>本周公告设置:</span>
        </label>
        <!--公告设置触发元素-->
        <button class="btn" onclick="notice.showModal()">设置公告内容</button>
        <button class="btn" onclick="duty.showModal()">设置值日内容</button>
        <!--公告设置页面-->
        <dialog id="notice" class="modal">
          <div class="modal-box-notice modal-box relative overflow-hidden">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="container">
              <!--TODO editor-->
              <TextEditor data-twind-ignore ref="textEditor"></TextEditor>
            </div>
            <div class="modal-action">
              <label for="notice" class="btn" @click="uploadNotice">保存</label>
            </div>
          </div>
        </dialog>
        <dialog id="duty" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in targetList" :key="item">
          <img class="carousel-item-img" :src="getUrl(item)" alt="Drink"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/scrollbar.css'
import TextEditor from "../components/TextEditor.vue";
import {ref} from "vue";
import {AdminStore} from "../stores/Admin";
import {getUrl} from "../utils/urlUtils";

const textEditor = ref(null)

const adminStore = AdminStore()
const targetList = [
  "hutao.jpg",
  "caos.jpg",
  "keli.jpg",
  "ying.jpg",
]

const uploadNotice = () => {
  console.log(textEditor.value.valueHtml)
  adminStore.noticeHTML = textEditor.value.valueHtml
}
</script>

<style scoped>
/*这里和组件内的样式冲突了，所以手动设置*/
.modal-box-notice {
  max-width: 40rem;
  height: 36rem;
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

.carousel-item-img {
  width: 100%;
  height: inherit;
}
</style>
