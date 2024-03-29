<script setup lang='ts'>
import ScrollOut from 'scroll-out';
import { getImage } from '@/utils/tools';

const iconList = reactive([
  {
    svg: getImage('common/JavaScript.svg'),
    link: 'https://js.irg/'
  },
  {
    svg: getImage('common/TypeScript.svg'),
    link: 'https://typescriptlang.org/'
  },
  {
    svg: getImage('common/Python.svg'),
    link: 'https://python.org'
  },
  {
    svg: getImage('common/Vue.svg'),
    link: 'https://vuejs.org'
  },
  {
    svg: getImage('common/React.svg'),
    link: 'https://react.dev'
  },
  {
    svg: getImage('common/Threejs.svg'),
    link: 'https://threejs.org/'
  },
])

onMounted(() => {
  ScrollOut({
    targets: ".top",
    onShown: function (el) {
      // remove the class
      el.classList.remove("animate__fadeOutDown");

      // force reflow
      void el.offsetWidth;

      // re-add the animated cl
      el.classList.add("animate__fadeInUp");
    },
    onHidden: function (el) {
      // remove the class
      el.classList.remove("animate__fadeInUp");

      // force reflow
      void el.offsetWidth;

      // re-add the animated cl
      el.classList.add("animate__fadeOutDown");
    }
  });

})
</script>

<template>
  <section class="about-wrap" id="About">
    <div class="content-wrap">
      <h1 class="title text-64 mb-24">{{ $t('base.4') }}</h1>
      <p class="paragraph">{{ $t('base.22') }}</p>
    </div>

    <ul class="about-tech">
      <li class="tech-item mouseTarget" v-for="(icon, key) in iconList" :key="key">
        <img :src="icon.svg" class="cursor-scale item-svg top animate__animated" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.about-wrap {
  width: 100%;
  margin: 400rem 0;
  @include flexPos(center);
  flex-direction: column;

  .content-wrap {
    @include -width(90%, 900rem, 1200rem);
    @include flexPos(center);
    flex-direction: column;
    text-align: center;
  }

  .about-tech {
    display: grid;
    margin-top: 150rem;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 100rem 150rem;

    @media screen and (max-width:$phone) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 100rem 100rem;
    }

    .tech-item {
      transition: transform 300ms cubic-bezier(0.34, 1.66, 0.64, 1);
      display: inline-block;
      cursor: none;


      &:is(:hover, :focus-visible) {
        transform: scale(1.1);
      }

      .item-svg {
        filter: grayscale(1) invert(1);
        max-width: 150px;
        opacity: 0.75;
        height: auto;
        width: 100%;

        &:hover {
          filter: grayscale(0);
        }
      }
    }
  }
}
</style>