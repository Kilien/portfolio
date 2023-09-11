<template>
  <!-- 顶部栏 -->
  <TopBar />

  <!-- <MousePoint v-if="appStore.curDevice !== 'phone'" /> -->

  <!-- 各路由 -->
  <div id="mainContainer">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta?.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta?.keepAlive" />
    </router-view>
  </div>

  <Footer />
</template>

<script>
import TopBar from '@cps/TopBar/index.vue';
import Footer from '@cps/Footer/index.vue';
import { useAppStore } from './store/appStore';
import MousePoint from '@cps/MousePoint/index.vue';

export default {
  components: {
    TopBar,
  },
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
};
</script>

<style lang="scss">
#mainContainer {
  padding-top: $mobTopBarHeight;
  z-index: 2;
  position: relative;
}
</style>
