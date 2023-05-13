<template>
  <!-- <div class="Animation">
    <div class="loader">
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
    </div>
    <div class="loader triangle">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
    <div class="loader">
      <svg viewBox="0 0 80 80">
        <rect height="64" width="64" x="8" y="8"></rect>
      </svg>
    </div>
  </div> 
  -->
  <div class="loader-wrapper">
    <div class="packman"></div>
    <div class="dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* .Animation {
  transform: scale(0.7);
}

.loader {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
}

.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
} */

/* next */
.loader-wrapper {
  position: relative;
  top: -12px;
  left: -80px;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loader-wrapper .packman::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 25px;
  background-color: #EFF107;
  border-radius: 100px 100px 0 0;
  transform: translate(-50%, -50%);
  animation: pac-top 0.5s linear infinite;
  transform-origin: center bottom;
}

.loader-wrapper .packman::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 25px;
  background-color: #EFF107;
  border-radius: 0 0 100px 100px;
  transform: translate(-50%, 50%);
  animation: pac-bot 0.5s linear infinite;
  transform-origin: center top;
}

@keyframes pac-top {
  0% {
    transform: translate(-50%, -50%) rotate(0)
  }

  50% {
    transform: translate(-50%, -50%) rotate(-30deg)
  }

  100% {
    transform: translate(-50%, -50%) rotate(0)
  }
}

@keyframes pac-bot {
  0% {
    transform: translate(-50%, 50%) rotate(0)
  }

  50% {
    transform: translate(-50%, 50%) rotate(30deg)
  }

  100% {
    transform: translate(-50%, 50%) rotate(0)
  }
}

.dots .dot {
  position: absolute;
  z-index: -1;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
}

.dots .dot:nth-child(1) {
  left: 90px;
  animation: dot-stage1 0.5s infinite;
}

.dots .dot:nth-child(2) {
  left: 60px;
  animation: dot-stage1 0.5s infinite;
}

.dots .dot:nth-child(3) {
  left: 30px;
  animation: dot-stage1 0.5s infinite;
}

.dots .dot:nth-child(4) {
  left: 10px;
  animation: dot-stage2 0.5s infinite;
}

@keyframes dot-stage1 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-24px, 0);
  }
}

@keyframes dot-stage2 {
  0% {
    transform: scale(1);
  }

  5%, 100% {
    transform: scale(0);
  }
}



</style>
