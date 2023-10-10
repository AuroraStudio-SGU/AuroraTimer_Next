<template>
  <div class="menu">
    <div class="white-box overflow-auto">
      <div ref="ThemeBox" class="ThemeSelector-container"
           style="user-select: none">
        <div
          v-for="(theme,index) in globalStore.ThemeList"
          :key="theme"
          class="Theme-container" data-act-class="outline"
        >
          <div
            :data-theme="theme" class="Theme-container-box"
            @click="handleChange(index)">
            <div class="Theme-container-box-insight">
              <div class="Theme-base-color-200"/>
              <div class="Theme-base-color-300"/>
              <div class="Theme-base-color-100">
                <div class="font-bold">
                  {{ theme }}
                </div>
                <div class="flex flex-wrap gap-1">
                  <div class="bg-primary Theme-item">
                    <div class="text-primary-content Theme-item-text">A</div>
                  </div>
                  <div class="bg-secondary Theme-item">
                    <div class="text-secondary-content Theme-item-text">A</div>
                  </div>
                  <div class="bg-accent Theme-item">
                    <div class="text-accent-content Theme-item-text">A</div>
                  </div>
                  <div class="bg-neutral Theme-item">
                    <div class="text-neutral-content Theme-item-text">A</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/common.css'
import {GlobalStore} from "../stores/Global";
import {onMounted, ref} from "vue";

const globalStore = GlobalStore()

const ThemeBox = ref(null)
let lastChoice = -1
let changeLock = true

const handleChange = (index) => {
  if (changeLock) {
    changeLock = false
    ThemeBox.value.children[index].classList.add("outline")
    globalStore.changeTheme(globalStore.ThemeList[index])
    window.electronAPI.SaveSetting(JSON.stringify(globalStore.Setting))
    if (index !== lastChoice && lastChoice !== -1)
      ThemeBox.value.children[lastChoice].classList.remove("outline")
    lastChoice = index
    changeLock = true
  }
}
onMounted(() => {
  handleChange(globalStore.ThemeList.indexOf(globalStore.getCurrentTheme))
})
</script>

<style scoped>
.ThemeSelector-container {
  @apply rounded-box grid grid-cols-2 gap-4;
  @apply sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5;
}
.Theme-container {
  @apply border-base-content/20 hover:border-base-content/40;
  @apply outline-base-content overflow-hidden;
  @apply rounded-lg border outline-offset-2;
}
.Theme-container-box {
  @apply bg-base-100 w-full;
  @apply text-base-content  cursor-pointer font-sans;
}
.Theme-container-box-insight {
  @apply grid grid-cols-5 grid-rows-3;
}
.Theme-base-color-300 {
  @apply bg-base-300 col-start-1 row-start-3;
}
.Theme-base-color-200 {
 @apply bg-base-200 col-start-1 row-span-2 row-start-1;
}
.Theme-base-color-100 {
 @apply bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2;
}
.Theme-item {
 @apply flex aspect-square w-5 items-center justify-center rounded lg:w-6;
}
.Theme-item-text {
 @apply text-sm font-bold;
}
</style>
