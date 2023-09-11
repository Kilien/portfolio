import { useAppStore, storeToRefs } from '@store/appStore';
import Lenis from '@studio-freight/lenis';
import { useRoute } from 'vue-router';

/**
 * 准备加载一系列动画
 */
export default () => {
  const appStore = useAppStore();
  const route = useRoute();


  const lockLoadScrollDelay = ref(false); // 锁
  /**
   * 加载滚动延迟效果
   */
  const loadScrollDelay = () => {
    if (lockLoadScrollDelay.value || appStore.curDevice === 'phone') return;
    lockLoadScrollDelay.value = true;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  };

  nextTick(() => {
    // 万一没有开场动画，则直接执行
    if (!route.meta.welcome) {
      loadScrollDelay();
    }
  });
};
