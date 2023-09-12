<script setup lang="ts">
import Banner from './Banner/index.vue';
import { useAppStore, storeToRefs } from '@store/appStore';

const appStore = useAppStore();
const { welcoming } = storeToRefs(appStore);

</script>

<template>
  <Welcome v-show="welcoming" />

  <main class="home-wrap" id="header" data-scroll-container>
    <Banner />

  </main>
</template>

<style lang="scss" scoped>
.home-wrap {
  width: 100%;
}
</style>
