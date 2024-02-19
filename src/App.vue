<template>
  <!-- 顶部栏 -->
  <TopBar v-if="!isWelcoming" />

  <MousePoint v-if="appStore.curDevice !== 'phone'" />

  <Welcome v-if="appStore.welcoming" />

  <!-- 各路由 -->
  <div id="mainContainer" :class="[{ welcoming: isWelcoming }]">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta?.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta?.keepAlive" />
    </router-view>
  </div>

  <Footer v-if="!isWelcoming" />
</template>

<script>
import TopBar from '@cps/TopBar/index.vue';
import Footer from '@cps/Footer/index.vue';
import { useRoute } from 'vue-router';
import { useAppStore } from './store/appStore';
import useLoadAnimate from './hooks/useLoadAnimate';
import MousePoint from '@cps/MousePoint/index.vue';

export default {
  components: {
    TopBar,
    Footer
  },
  setup() {
    useLoadAnimate();
    const appStore = useAppStore();
    const route = useRoute();
    
    const isWelcoming = computed(() => route.name === 'home' && appStore.welcoming);
    return {
      appStore,
      isWelcoming,
    };
  },
};
</script>

<style lang="scss">
#mainContainer {
  /* PC端 */
  padding-top: $pcTopBarHeight;

  /* 移动端 */
  @media (max-width: $phone) {
    padding-top: $mobTopBarHeight;
  }

  &.welcoming {
    padding-top: 0 !important;
  }

  z-index: 2;
  position: relative;
}
</style>
