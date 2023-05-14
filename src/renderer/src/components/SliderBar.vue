<template>
  <div class="Retract-sidebar">
    <div class="fixed left-8" style="transform: scale(1.3); top:51px;margin-top: 10vh;">
      <ul class="menu bg-base-100 p-2 rounded-box side-bar-self">
        <li>
          <a @click="jumpTo('Timer')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#time"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Main')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#home"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Rank')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#calculator"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Setting')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#setting"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Other')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#signal"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Welcome')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#checked"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('NewUI')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#info"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Themes')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#out"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import {router} from "../utils/router";

const jumpTo = (local) => {
  router.push({
    name: local,
  });
};
</script>

<style scoped>

.slider-svg {
  @apply h-5 w-5;
}

.side-bar-self {
  height: 63vh;
}


</style>
