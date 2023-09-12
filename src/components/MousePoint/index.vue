<script setup lang="ts">
import { gsap } from 'gsap';
const cursor = ref<HTMLElement>(null);
const mouseX = ref(0);
const mouseY = ref(0);

const bigCondiction = ref(false);

const doMousePoint = evt => {
  const ele: HTMLElement = evt.target as any;
  // xTo(evt.clientX)
  // yTo(evt.clientY)

  const mouseX = evt.clientX;
  const mouseY = evt.clientY;
  cursor.value.style.left = (mouseX + 15) + 'px';
  cursor.value.style.top = (mouseY + 15) + 'px';

};

/**
 * 进入事件
 * @param evt
 */
const doMouseEnter = evt => {
  recFatherNode(evt);
};

/**
 * 离开事件
 * @param evt
 */
const doMouseLeave = evt => {
  const ele: HTMLElement = evt.target as any;
  if (ele?.classList?.contains?.('mouseTarget') || ele?.classList?.contains?.('char')) {
    bigCondiction.value = false;
  }
  if (cursor.value?.classList?.contains?.('big')) {
    cursor.value?.classList.remove('big');
  }
};

/**
 * 遍历5层父级，添加标记
 * @param evt
 */
const recFatherNode = evt => {
  const ele: HTMLElement = evt.target as any;
  let node = null;
  for (let i = 0, len = 5; i < len; i++) {
    let item = node ?? ele.parentElement;
    if (item?.classList?.contains('mouseTarget')) {
      cursor.value?.classList?.add('big');
      break;
    } else {
      node = item?.parentElement;
    }
  }
};

let xTo: gsap.QuickToFunc | ((arg0: number) => void)
let yTo: gsap.QuickToFunc | ((arg0: number) => void)
function animateQuickTo(str: string) {
  xTo = gsap.quickTo(document.getElementById(str), "x", { duration: 0.3, ease: "power3" })
  yTo = gsap.quickTo(document.getElementById(str), "y", { duration: 0.3, ease: "power3" })
}
onMounted(() => {
  document.body.addEventListener('mousemove', doMousePoint);
  document.body.addEventListener('mouseover', doMouseEnter);
  document.body.addEventListener('mouseout', doMouseLeave);

  gsap.to('#app', 0.010, {
    repeat: -1,

    onRepeat: function () {
      animateQuickTo('cursor')
    }

  });

  // 水滴扩散+反色
  const cursorScale = document.querySelectorAll('.cursor-scale')
  cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
      cursor.value?.classList?.remove('grow');
      cursor.value?.classList?.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
      cursor.value?.classList?.add('grow');
      if (link?.classList?.contains('small')) {
        cursor.value?.classList?.remove('grow');
        cursor.value?.classList?.add('grow-small');
      }
    });
  });
});

onBeforeUnmount(() => {
  document.body.removeEventListener('mousemove', doMousePoint);
  document.body.removeEventListener('mouseover', doMouseEnter);
  document.body.removeEventListener('mouseout', doMouseLeave);
});
</script>

<template>
  <div class="cursor" id="cursor" ref="cursor"></div>
</template>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  width: 8px;
  height: 8px;
  margin-left: -20px;
  margin-top: -20px;
  border-radius: 50%;
  background: #ffd803;
  transition: transform .3s ease-in;
  transform-origin: center center;
  pointer-events: none;
  z-index: 1000;

  &.big {
    background-color: transparent;
    border: 0.1px solid #ffd803;
    -webkit-transform: scale(10) translateX(-25%) translateY(-25%);
    transform: scale(10) translateX(-25%) translateY(-25%);
  }
}

.grow,
.grow-small {
  width: 10px;
  height: 10px;
  transform: scale(40);
  background: #fff;
  mix-blend-mode: difference;
  border: none;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  overflow: hidden;
  animation: morph 3s linear infinite;
}

@keyframes morph {

  0%,
  100% {
    border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
  }

  34% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }

  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
  }
}


.grow-small {
  transform: scale(10);
}

.mousePoint {
  color: #fff;
}
</style>
