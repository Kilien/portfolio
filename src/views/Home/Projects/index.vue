<script setup lang='ts'>
import { gsap } from 'gsap';
import { getImage, preloadImages } from '@/utils/tools';

const projectList = reactive([
  { id: 1, name: 'base.25', style: '--r: 1;--c: 4;--s: 3;', time: '2023', image: getImage('home/project/profile.png'), link: '/' },
  { id: 2, name: 'base.28', style: '--r: 2;--c: 1;--s:3;', time: '2023', image: getImage('home/project/panda.png'), link: 'https://withered-sound-1516.on.fleek.co' },
  { id: 3, name: 'base.27', style: '--r: 3;--c: 4;--s: 4;', time: '2023', image: getImage('home/project/mwhy.png'), link: 'https://lively-mouse-4851.on.fleek.co' },
  { id: 4, name: 'base.26', style: '--r: 4;--c: 2;--s: 2;', time: '2023', image: getImage('home/project/flare.png'), link: 'https://flat-cake-9560.on.fleek.co' },
  { id: 5, name: 'base.29', style: '--r: 5;--c: 4;--s: 3;', time: '2022', image: getImage('home/project/yuri.png'), link: 'https://shrill-hat-6581.on.fleek.co' },
])

function launchTo(url) {
  if (url === '/') return;
  // 外链跳转
  window.open(url);
  return;
}

onMounted(() => {
  const gridItems = document.querySelectorAll('.grid__item');

  const scroll = () => {
    const viewportHeight = window.innerHeight;
    const endValue = viewportHeight / 2;

    // Loop through each grid item to add animations
    gridItems.forEach((item:any, index) => {
      // Get the previous element sibling for the current item
      const previousElementSibling = item.previousElementSibling;
      // Determine if the current item is on the left side based on its position relative to the previous item
      const isLeftSide = previousElementSibling && (item?.offsetLeft + item?.offsetWidth <= previousElementSibling?.offsetLeft + 1);
      // Determine the origin for transformations (either 100 or 0 depending on position)
      const originX = isLeftSide ? 100 : 0;

      const preview = gsap.timeline({
        defaults: {
          ease: 'none'
        },
        scrollTrigger: {
          trigger: item,
          start: () => 'top bottom-=15%',
          end: () => '+=50%',
          toggleActions: 'play reverse play reverse',
          scrub: true
        }
      })

      preview.fromTo(item.querySelector('.grid__item-img'), {
          yPercent: -100,
          xPercent: isLeftSide ? 100 : -100
        }, {
          yPercent: 0,
          xPercent: 0,
        })
        .fromTo(item.querySelector('.grid__item-img-inner'), {
          yPercent: 100,
          xPercent: isLeftSide ? -100 : 100,
          filter: 'brightness(200%) contrast(300%)'
        }, {
          yPercent: 0,
          xPercent: 0,
          filter: 'brightness(100%) contrast(100%)'
        }, 0)
        .fromTo(item.querySelector('.grid__item-caption'), {
          yPercent: 200,
          xPercent: 50,
          opacity: 0
        }, {
          //ease: 'power1',
          yPercent: 0,
          xPercent: 0,
          opacity: 1
        }, 0);

    });
  }
  preloadImages('.grid__item-img-inner').then(() => {
    scroll();
  });
})
</script>

<template>
  <section class="project-wrap" id="Project">
    <h1 class="title text-64 mb-24">{{ $t('base.20') }}</h1>

    <div class="grid">
      <figure class="grid__item" v-for="item in projectList" :key="item.id" :style="item.style">
        <div class="grid__item-img">
          <div class="grid__item-img-inner" @click="launchTo(item.link)"
            :style="{ backgroundImage: `url(${item.image})` }"></div>
        </div>
        <figcaption class="grid__item-caption">
          <h3>{{ $t(item.name) }}</h3> <span class="ml-20 text-18">{{ item.time }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.project-wrap {
  width: 100%;
  @include flexPos(center);
  flex-direction: column;

  .grid {
    width: 100%;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: auto;
    display: grid;
    position: relative;
    margin: 10vh auto 15vh;

    .grid__item {
      grid-column: var(--c) / span var(--s);
      grid-row: var(--r);
      position: relative;
      margin: 0;

      &-img {
        position: relative;
        overflow: hidden;
        display: grid;
        place-items: center;
        width: 100%;
        height: auto;
        aspect-ratio: 1.5;

        &-inner {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: cover;
          position: relative;
        }

      }

      &-caption {
        position: absolute;
        padding: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        h3 {
          font-weight: bold;
          font-size: inherit;
          margin: 0;
          color: #7f7f8f;
        }

        span {
          font-weight: bold;
          color: #b9b3af;
        }
      }
    }







  }
}
</style>