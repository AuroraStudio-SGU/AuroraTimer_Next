<template>
  <div class="Retract-sidebar " style="width: 100%; height: 100% ;">
    <div  style="height: 100%;width: 100%; ">
      <ul class="menu bg-base-100 p-2 rounded-box side-bar-self shadow-md">
        <li class="fugai">
          <a @click="jumpTo('Timer')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#time"></use>
            </svg>
          </a>
        </li>
        <li>
          <a @click="jumpTo('Notice')">
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
        <!-- <li>
          <a @click="jumpTo('Welcome')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#checked"></use>
            </svg>
          </a>
        </li> -->
        <li>
          <a @click="jumpTo('LeaderBoard')">
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
        <li>
          <a @click="jumpTo('Admin')">
            <svg class="slider-svg">
              <use xlink:href="../assets/svg/SliderBarIcons.svg#admin"></use>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
li {
  transform: scale(1.3);
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
