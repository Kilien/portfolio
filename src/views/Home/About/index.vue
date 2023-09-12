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
    svg: getImage('common/HTML.svg'),
  },
  {
    svg: getImage('common/CSS.svg'),
  },
  {
    svg: getImage('common/Threejs.svg'),
    link: 'https://threejs.org/'
  },
  {
    svg: getImage('common/Python.svg'),
    link: 'https://python.org/'
  }
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
  <section class="about-wrap">
    <div class="content-wrap">
      <h1 class="title text-64 mb-24">{{ $p('About') }}</h1>
      <p class="paragraph">{{ $p(`Hello everyone! I'm Qifan Zhuang, a software developer from China. Although I mainly
        write JS/TS, HTML/CSS and Python, I actually use low-level languages like Rust as well. Other than programming, I
        like to watch anime and writing.`) }}</p>
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
        transform: scale(0.9);
      }

      .item-svg {
        filter: grayscale(1) invert(1);
        max-width: 150px;
        opacity: 0.75;
        height: auto;
        width: 100%;
      }
    }
  }
}
</style>