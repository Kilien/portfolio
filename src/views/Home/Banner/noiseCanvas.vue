<script setup lang='ts'>
import { pathsToSVGPaths } from 'canvas-sketch-util/penplot';
import { drawIsolines } from './useDraw'
import { bpThrottle } from '@/hooks/useDeb';
import { useAppStore } from '@/store/appStore';

const width = ref(1200);
const height = ref(630);
const strokeWidth = ref(8);
const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 1.2,
  playbackRate: 'throttle'
};

const isoLines: any = ref({})
onMounted(() => {
  width.value = window.innerWidth;
  isoLines.value = drawIsolines([0, width.value], [0, height.value]);
})

window.onresize = bpThrottle(() => {
  width.value = window.innerWidth;
  if (width.value <= 750) {
    height.value = 246
  } else {
    height.value = 630
  }
  isoLines.value = drawIsolines([0, width.value], [0, height.value]);
});

const paths = computed(() => {
  const res = pathsToSVGPaths(isoLines.value, {
    width: width.value,
    height: height.value,
    units: 'px'
  });
  return res
}) 
</script>

<template>
  <div class="bg-canvas">
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" version="1.1"
      :viewBox="`${strokeWidth} ${strokeWidth} ${width - 2 * strokeWidth} ${height - strokeWidth}`">
      <defs>
        <linearGradient id="paint0_linear" x1="1502.42" y1="-337.797" x2="-544.778" y2="13.5806"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#7A5FFF">
            <animate attributeName="stop-color" values="#7A5FFF; #01FF89; #7A5FFF" dur="4s" repeatCount="indefinite">
            </animate>
          </stop>
          <stop offset="100%" stopColor="#01FF89">
            <animate attributeName="stop-color" values="#01FF89; #7A5FFF; #01FF89" dur="4s" repeatCount="indefinite">
            </animate>
          </stop>
        </linearGradient>
      </defs>
      <g strokeLinecap="round" :strokeWidth="`${strokeWidth}px`" fill="none" stroke="url(#paint0_linear)"
        strokeOpacity="0.1">
        <path v-for="(item, index) in paths" :key="index" :d="item" />
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.bg-canvas {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  // background-color: #2a0481;

  svg {
    path {
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
      animation: dash 10s linear forwards;
    }
  }


  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>