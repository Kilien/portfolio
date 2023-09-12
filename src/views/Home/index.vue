<script setup lang="ts">
import Banner from './Banner/index.vue';
import About from './About/index.vue';
import Projects from './Projects/index.vue';
import textifyJs from 'textify.js';
import { useAppStore, storeToRefs } from '@store/appStore';

const appStore = useAppStore();
const { welcoming } = storeToRefs(appStore);
const { TextifyTitle, Textify } = textifyJs;

onMounted(() => {
  new TextifyTitle({
    selector: ".title",
    duration: 400,
    stagger: 40,
    fade: true,
    top: false,
    reveal: true,
    once: false,
    rotation: 0,
    scale: 1,
    easing: "linear",
    fadeEasing: "backOut",
    fadeDuration: 1000,
    threshold: 1,
    transformOrigin: "center center"
  });

  new Textify({
    selector: ".paragraph",
    duration: 2000,
    stagger: 100,
    fade: true,
    top: false,
    once: false,
    rotation: 0,
    scale: 0.75,
    easing: "easeOut",
    fadeEasing: "back"
  });
})
</script>

<template>
  <Welcome v-show="welcoming" />

  <main class="home-wrap" id="header" data-scroll-container>
    <Banner />

    <About />

    <Projects />
  </main>
</template>

<style lang="scss" scoped>
.home-wrap {
  width: 100%;
}
</style>
