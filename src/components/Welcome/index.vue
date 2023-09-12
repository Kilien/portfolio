<script setup>
import { gsap } from 'gsap';
import { useAppStore } from '@store/appStore';
const appStore = useAppStore();
const firstWord = ref('Hello');
const loader = ref(null);
const loaderWord1Chars = ref(null);

onMounted(() => {
  // document.body.style.overflow = 'hidden';
  const readTime = 0.45;
  const loaderChildren = Array.from(loader.value?.children);

  const tl = gsap.timeline({
    delay: 0.6,
    paused: false,
    defaults: { duration: 0.65, ease: 'power1.out' }
  });

  tl.set(loaderChildren.value, {
    opacity: 0,
    filter: 'blur(10px)'
  });

  for (let i = 0; i < loaderChildren.length; i++) {
    const loaderChild = loaderChildren[i];

    if (i === 0) {
      tl.set(loaderChild, { opacity: 1, filter: 'blur(0px)' });
      tl.fromTo(
        loaderWord1Chars.value,
        { color: '#000' },
        { color: '#fff', ease: 'power3.out', stagger: 0.05 }
      );
    } else {
      tl.to(
        loaderChild,
        { opacity: 1, filter: 'blur(0px)' },
        '-=0.125'
      );
    }

    tl.to(
      loaderChild,
      { opacity: 0, filter: 'blur(5px)' },
      `+=${readTime}`
    );
  }

  tl.to(loader.value, {
    opacity: 0,
    onStart: () => {
      // this.$enableScrollY();
    },
    onEnd: () => {
      appStore.setWelcoming(false);
    }
  });

  tl.set(loader.value, { display: 'none' });
});
</script>

<template>
  <div ref="loader" class="loader">
    <p class="loader__word">
      <span v-for="(char, key) in firstWord" :key="key" ref="loaderWord1Chars" class="loader__word__char">{{ char
      }}</span>
    </p>
    <p class="loader__word">and Welcome.</p>
    <p class="loader__word loader__word--logo serif">Fan</p>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  background-color: #030303;
  pointer-events: all;
  color: #dfdfdf;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 5;
  left: 0;
  top: 0;

  &__word {
    transform: translate(-50%, -50%);
    font-size: 52rem;
    position: absolute;
    line-height: 1.125;
    overflow: hidden;
    opacity: 0;
    left: 50%;
    margin: 0;
    top: 50%;

    &__char {
      display: inline-block;
    }

    &--logo {
      font-size: 64rem;
    }
  }
}
</style>
