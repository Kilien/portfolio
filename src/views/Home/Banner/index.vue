<script setup lang='ts'>
import noiseCanvas from './noiseCanvas.vue';
import { useAppStore } from '@/store/appStore';


const appStore = useAppStore();

</script>

<template>
  <div class="banner-wrap">
    <noise-canvas />
    <div class="w-full flex justify-center items-center">
      <div class="w-1200 h-480 flex justify-around items-center">
        <h2>Hey</h2>

        <div class="flex flex-col justify-center items-center">
          <img src="@img/holder.png" alt="holder" class="w-240 h-240 rounded-full mb-32"/>
          <span class="text-24">{{ $p('Qifan Zhuang') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-wrap {
  width: 100%;

}
</style>