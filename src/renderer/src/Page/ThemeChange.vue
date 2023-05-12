<template>
  <div class="menu">
    <div class="white-box h-5/6 overflow-auto">
      <div ref="ThemeBox" class=" rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
           style="user-select: none">
        <div
          v-for="(theme,index) in globalStore.ThemeList"
          :key="theme"
          class="border-base-content/20 hover:border-base-content/40 outline-base-content overflow-hidden rounded-lg border  outline-offset-2" data-act-class="outline"
        >
          <div
            :data-theme="theme" class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
            @click="handleChange(index)">
            <div class="grid grid-cols-5 grid-rows-3">
              <div class="bg-base-200 col-start-1 row-span-2 row-start-1"/>
              <div class="bg-base-300 col-start-1 row-start-3"/>
              <div class="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                <div class="font-bold">
                  {{ theme }}
                </div>
                <div class="flex flex-wrap gap-1">
                  <div class="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div class="text-primary-content text-sm font-bold">A</div>
                  </div>
                  <div class="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div class="text-secondary-content text-sm font-bold">A</div>
                  </div>
                  <div class="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div class="text-accent-content text-sm font-bold">A</div>
                  </div>
                  <div class="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                    <div class="text-neutral-content text-sm font-bold">A</div>
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
    if (index !== lastChoice && lastChoice !== -1)
      ThemeBox.value.children[lastChoice].classList.remove("outline")
    lastChoice = index
    changeLock = true
  }
}
onMounted(() => {
  handleChange(globalStore.ThemeList.indexOf(globalStore.currentTheme))
})
</script>

<style scoped>
.ThemeSelector-container {
  @apply border-base-content/20 hover:border-base-content/40 outline-base-content overflow-hidden rounded-lg border outline outline-offset-2;
}
</style>
