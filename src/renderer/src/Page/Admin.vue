<template>
  <div class="menu">
    <div class="white-box">
      <div class="Title">管理员设置</div>
      <div>
        <label class="label">
          <span>本周公告设置:</span>
        </label>
        <!--对话框触发元素-->
        <label for="notice" class="btn">设置公告内容</label>
        <input type="checkbox" id="notice" class="modal-toggle" />
        <!--对话框内容-->
        <div class="modal">
          <div class="modal-box relative overflow-hidden">
            <label for="notice" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="container">
              <!--TODO editor-->
              <TextEditor data-twind-ignore ref="textEditor"></TextEditor>
            </div>
            <div class="modal-action">
              <label for="notice" class="btn" @click="uploadNotice">保存</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/scrollbar.css'
import TextEditor from "../components/TextEditor.vue";
import {ref} from "vue";

const textEditor = ref(null)
const uploadNotice = () => {
  console.log(textEditor.value.valueHtml)
}
</script>

<style scoped>
/*这里和组件内的样式冲突了，所以手动设置*/

.modal-box {
  max-width: 40rem;
  height: 36rem;
}
.container {
  width: fit-content;
  @apply m-4;
  height: 28rem;
  min-height: 16rem;
  position: relative;
  top:1rem;
  overflow-y: auto;
}
</style>
