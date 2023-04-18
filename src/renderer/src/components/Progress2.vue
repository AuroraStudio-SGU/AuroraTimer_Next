<template>
  <div class="progress-circle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle r="50"  cx="50" cy="50" fill="transparent" class="progress-background"></circle>
      <circle r="50" cx="50" cy="50" fill="transparent" class="progress-bar" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset()"></circle>
    </svg>
  </div>
</template>

<script setup>


const props = defineProps({
  size: {
    type: Number,
    default: 100
  },
  percent: {
    type: Number,
    default: 0
  },
  barSize: {
    type: Number,
    default: 10
  },
})

const dashArray = Math.PI * 2 *50

let bar_color = "#52c5d1"
let background_color = "#40717b"

const dashOffset = () => {
  let percent =  1 - (((props.percent * 100) % 100) / 100.0).toFixed(2)
  if(props.percent > 1){
    background_color = "#52c5d1";
    bar_color = "#fcde38"
  }else {
    background_color = "#40717b";
    bar_color = "#52c5d1"
  }

  return percent * dashArray;
}
</script>

<style scoped>
circle {
  stroke-width: 9px;
  transform-origin: center;
  /* stroke:rgb(66, 66, 66);
  transform-origin: center;   */
  /* transform:scale(0.9); */
}

.progress-background{
  stroke: v-bind('background_color');
  transform:scale(0.9);
}
.progress-bar{
  stroke: v-bind('bar_color');
  transform: rotate(-90deg) scale(0.9);
}
</style>
