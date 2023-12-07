<template>
  <div class="editor">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      class="TextArea"
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import '../assets/css/scrollbar.css'
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
import {IEditorConfig, IToolbarConfig} from "@wangeditor/editor";
import {GlobalStore} from "../stores/Global";
import {ElNotification} from "element-plus";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const globalStore = GlobalStore()

const props = defineProps({
  mode: {
    type: String,
    default: 'default',
  }
})

// 内容 HTML
const valueHtml = ref('<holder>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
})

const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig:Partial<IEditorConfig> = {
  MENU_CONF: {}
}

//上传图片配置
editorConfig.MENU_CONF['uploadImage'] = {

  server: globalStore.Setting.netWork.host + '/uploadImage',

  // form-data fieldName ，默认值 'wangeditor-uploaded-image'
  fieldName: 'file',

  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 5 * 1024 * 1024, // 5M

  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 1,

  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],

  // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。

  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,

  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒
  // 单个文件上传成功之后
  onSuccess(file: File, res: any) {  // TS 语法
    // onSuccess(file, res) {          // JS 语法
    ElNotification({
      title: "上传成功",
      type: "success"
    });
  },

  // 单个文件上传失败
  onFailed(file: File, res: any) {   // TS 语法
    // onFailed(file, res) {           // JS 语法
    ElNotification({
      title: "上传失败",
      message: res,
      type: "error"
    });
  },

  // 上传错误，或者触发 timeout 超时
  onError(file: File, err: any, res: any) {  // TS 语法
    // onError(file, err, res) {               // JS 语法
    ElNotification({
      title: "上传错误",
      message: res + err,
      type: "error"
    });
  },
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  // console.log('change:', editor.getHtml());
};
const handleDestroyed = (editor) => {
  // console.log('destroyed', editor);
};
const handleFocus = (editor) => {
  // console.log('focus', editor);
};
const handleBlur = (editor) => {
  // console.log('blur', editor);
};
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`);
};
defineExpose({
  valueHtml
})
</script>

<style scoped>
.editor {
  border: 1px solid #ccc;
  overflow: hidden;
}
.TextArea {
  height: 19rem !important;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: content-box;
}
</style>
