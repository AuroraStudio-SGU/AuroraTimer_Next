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
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

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

const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}

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
  console.log('change:', editor.getHtml());
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
