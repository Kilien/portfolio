<script setup lang='ts'>
import noiseCanvas from './noiseCanvas.vue';
import { gsap } from 'gsap';
import waveCanvas from './waveCanvas.vue';
import { useAppStore } from '@/store/appStore';


const appStore = useAppStore();
const header = ref(null);
const headerContainer = ref(null);
const headerContainerSubtitle = ref(null);
const subTitleText = ref($t('base.30'));

onMounted(() => {
  gsap.fromTo(
    headerContainer.value,
    { y: -3 },
    {
      y: 20,
      scrollTrigger: {
        scrub: true,
        trigger: header.value,
        start: 'top-=50px top',
        end: 'bottom top'
      }
    }
  );
  // gsap.fromTo(
  //   '.scroll-down',
  //   { opacity: 1 },
  //   {
  //     opacity: 0,
  //     scrollTrigger: {
  //       scrub: 0.75,
  //       trigger: header.value,
  //       start: 'top+=25% top',
  //       end: 'bottom-=25% top'
  //     }
  //   }
  // );
  const tl = gsap.timeline({
    paused: true,
    delay: 0.25,
  });
  tl.from('.line__content', {
    yPercent: 105,
    ease: 'power1.out',
    duration: 1,
    stagger: 0.25
  });
  tl.from(
    headerContainerSubtitle.value,
    { opacity: 0, stagger: { amount: 0.5, from: 'center' } },
    '-=0.75'
  );

  // tl.from('.scroll-down', { opacity: 0 }, '<+0.25');

  watch(() => [appStore.welcoming], () => {
    tl.play();
  })
})

</script>

<template>
  <div class="banner-wrap" ref="header">
    <!-- <noise-canvas /> -->
    <wave-canvas />
    <div ref="headerContainer" class="header__container">
      <h1 class="header__container__title">
        <span class="line" aria-hidden="true">
          <span class="line__content text-64">{{ $t('base.23') }}</span>
        </span>
        <span class="line" aria-hidden="true">
          <span class="line__content ml-50 mt-25 text-64">{{ $t('base.24') }}</span>
        </span>
      </h1>

      <div class="header__container__subtitle">
        <p class="sr-only">{{ subTitleText }}</p>
        <!-- eslint-disable -->
        <span v-for="(char, key) in subTitleText" :key="key" ref="headerContainerSubtitle" aria-hidden="true"
          v-html="char" />
        <!-- eslint-enable -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-wrap {
  --100vh: calc(100 * var(--vh, 1vh));

  background-color: #030303;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  max-width: 100vw;
  display: flex;
  width: 100%;
  z-index: 0;

  .header__container {
    mix-blend-mode: difference;
    cursor: default;
    color: white;

    &__title {
      margin-bottom: 1rem;

      &>*:last-of-type {
        margin-top: min(-0.5rem, calc(1vw * -1));
      }
    }

    &__subtitle {
      font-size: 32rem;
      text-align: center;
    }
  }
}

.line {
  overflow: hidden;
  display: block;

  &__content {
    display: inline-block;
  }
}
</style>