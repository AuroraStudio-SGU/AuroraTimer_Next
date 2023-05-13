<template>
  <div class="menu">
    <div class="white-box overflow-auto">
      <div class="title">新UI测试playground</div>
      <div class="normalStytle grid grid-cols-2 gap-2">
        <h1 class="text-3xl font-bold underline text-red-600">
          Hello tailwind css
        </h1>
        <button class="btn glass w-64 rounded-full">Button</button>
        <div class="dropdown">
          <label tabindex="0" class="btn m-1">主题切换</label>
          <ul tabindex="0" class="h-fit dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" ref="ThemeBox">
            <li
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
            </li>
          </ul>
        </div>
      </div>
      <div class="themeTest">
        <div class="rounded-box bg-base-100 border-base-content/5 text-base-content not-prose grid gap-3 border p-6">
          <!-- button -->
          <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
            <button class="btn">Default</button>
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-accent">Accent</button>
            <button class="btn btn-info">Info</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-error">Error</button>
          </div>
          <!-- badge -->
          <div class="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4">
            <span class="badge">Default</span>
            <span class="badge badge-primary">Primary</span>
            <span class="badge badge-secondary">Secondary</span>
            <span class="badge badge-accent">Accent</span>
            <span class="badge badge-info">Info</span>
            <span class="badge badge-success">Success</span>
            <span class="badge badge-warning">Warning</span>
            <span class="badge badge-error">Error</span>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-3 md:flex-row">
              <div class="md:w-1/2">
                <!-- tabs -->
                <div class="tabs">
                  <button class="tab tab-lifted">Tab</button>
                  <button class="tab tab-lifted tab-active">Tab</button>
                  <button class="tab tab-lifted">Tab</button>
                </div>
                <!-- link -->
                <div class="flex flex-col">
                  <span class="link">I'm a simple link</span>
                  <span class="link link-primary">I'm a simple link</span>
                  <span class="link link-secondary">I'm a simple link</span>
                  <span class="link link-accent">I'm a simple link</span>
                </div>
              </div>
              <div class="flex flex-col gap-3 md:w-1/2">
                <progress value="20" max="100" class="progress">Default</progress>
                <progress value="25" max="100" class="progress progress-primary">Primary</progress>
                <progress value="30" max="100" class="progress progress-secondary">Secondary</progress>
                <progress value="40" max="100" class="progress progress-accent">Accent</progress>
                <progress value="45" max="100" class="progress progress-info">Info</progress>
                <progress value="55" max="100" class="progress progress-success">Success</progress>
                <progress value="70" max="100" class="progress progress-warning">Warning</progress>
                <progress value="90" max="100" class="progress progress-error">Error</progress>
              </div>
            </div>

            <div class="flex flex-col gap-3 md:flex-row">
              <!-- stat -->
              <div class="stats bg-base-300 border-base-300 border md:w-1/2">
                <div class="stat">
                  <div class="stat-title">Total Page Views</div>
                  <div class="stat-value">89,400</div>
                  <div class="stat-desc">21% more than last month</div>
                </div>
              </div>

              <!-- radial progress -->
              <div class="flex flex-wrap items-center justify-center gap-3 md:w-1/2">
                <div class="radial-progress" style="--value:60;--size:3.5rem">60%</div>
                <div class="radial-progress" style="--value:75;--size:3.5rem">75%</div>
                <div class="radial-progress" style="--value:90;--size:3.5rem">90%</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-3 md:flex-row">
              <div class="md:w-1/2">
                <!-- toggle -->
                <div>
                  <input type="checkbox" class="toggle" checked />
                  <input type="checkbox" class="toggle toggle-primary" checked />
                  <input type="checkbox" class="toggle toggle-secondary" checked />
                  <input type="checkbox" class="toggle toggle-accent" checked />
                </div>
                <!-- checkbox -->
                <div>
                  <input type="checkbox" class="checkbox" checked />
                  <input type="checkbox" class="checkbox checkbox-primary" checked />
                  <input type="checkbox" class="checkbox checkbox-secondary" checked />
                  <input type="checkbox" class="checkbox checkbox-accent" checked />
                </div>
                <!-- radio -->
                <div>
                  <input type="radio" name="radio-1" class="radio" checked />
                  <input type="radio" name="radio-1" class="radio radio-primary" />
                  <input type="radio" name="radio-1" class="radio radio-secondary" />
                  <input type="radio" name="radio-1" class="radio radio-accent" />
                </div>
              </div>
              <!-- range -->
              <div class="md:w-1/2">
                <input type="range" min="0" max="100" value="90" class="range range-xs" />
                <input type="range" min="0" max="100" value="70" class="range range-xs range-primary" />
                <input type="range" min="0" max="100" value="50" class="range range-xs range-secondary" />
                <input type="range" min="0" max="100" value="40" class="range range-xs range-accent" />
              </div>
            </div>
            <!-- input -->
            <div class="flex flex-col gap-3 md:flex-row">
              <div class="flex flex-col gap-3 md:w-1/2">
                <input type="text" placeholder="Default" class="input input-bordered w-full" />
                <input type="text" placeholder="Primary" class="input input-primary input-bordered w-full" />
                <input type="text" placeholder="Secondary" class="input input-secondary input-bordered w-full" />
                <input type="text" placeholder="Accent" class="input input-accent input-bordered w-full" />
              </div>
              <div class="flex flex-col gap-3 md:w-1/2">
                <input type="text" placeholder="Info" class="input input-info input-bordered w-full" />
                <input type="text" placeholder="Success" class="input input-success input-bordered w-full" />
                <input type="text" placeholder="Warning" class="input input-warning input-bordered w-full" />
                <input type="text" placeholder="Error" class="input input-error input-bordered w-full" />
              </div>
            </div>
            <!-- navbar -->
            <div class="navbar bg-neutral text-neutral-content rounded-box">
              <div class="flex-none">
                <button class="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
              </div>
              <div class="flex-1">
                <button class="btn btn-ghost text-xl normal-case">daisyUI</button>
              </div>
            </div>
            <div class="flex gap-3">
              <!-- headings -->
              <div class="flex flex-grow flex-col gap-3">
                <div class="text-4xl font-bold">Text Size 1</div>
                <div class="text-3xl font-bold">Text Size 2</div>
                <div class="text-2xl font-bold">Text Size 3</div>
                <div class="text-xl font-bold">Text Size 4</div>
                <div class="text-lg font-bold">Text Size 5</div>
                <div class="text-sm font-bold">Text Size 6</div>
                <div class="text-xs font-bold">Text Size 7</div>
              </div>
              <!-- step -->
              <ul class="steps steps-vertical">
                <li class="step step-primary">Step 1</li>
                <li class="step step-primary">Step 2</li>
                <li class="step">Step 3</li>
                <li class="step">Step 4</li>
              </ul>
            </div>
          </div>

          <!-- alert -->
          <div class="flex flex-col gap-3">
            <div class="alert">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>12 unread messages. Tap to see.</span>
              </div>
            </div>
            <div class="alert alert-info">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 flex-shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>New software update available.</span>
              </div>
            </div>
            <div class="alert alert-success">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Your purchase has been confirmed!</span>
              </div>
            </div>
            <div class="alert alert-warning">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Warning: Invalid email address!</span>
              </div>
            </div>
            <div class="alert alert-error">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error! Task failed successfully.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {GlobalStore} from "../stores/Global";

const globalStore = GlobalStore()

let changeLock = true
const ThemeBox = ref(null)
let lastChoice = -1

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

</style>
