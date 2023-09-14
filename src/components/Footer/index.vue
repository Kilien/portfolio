<script setup lang="ts">
import Icons from './Icon.vue';
import { useAppStore } from '@/store/appStore';

const appStore = useAppStore();
</script>

<template>
  <div class="footer-wrap" id="Footer" data-scroll-section>
    <div class="content-wrap">
      <div class="content">

        <!-- 社交媒体 -->
        <Icons class="social-wrap" />
      </div>
    </div>

    <div class="copyright" data-scroll data-scroll-speed="1">
      <p class="text-32rem md:text-20rem px-40rem md:px-0 text-center leading-2">
        {{ $t('base.18') }}
      </p>
      <p class="text-24rem md:text-14rem mt-40rem leading-16rem">
        Copyright © 2023
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrap {
  width: 100%;
  padding-top: 270rem;

  .content-wrap {
    width: 100%;
    padding-bottom: 53rem;
    @include flexPos(center);

    @media (max-width: $phone) {
      flex-direction: column;
    }

    border-bottom: 1px solid #333;

    .content {
      @include -width(100%, 100%, 12rem);

      @include flexPos(center);
      flex-direction: column;

      .social-wrap {
        order: 1;
      }

      .menu-list {
        width: 375rem;
        font-size: 14rem;
        @include flexPos(space-between);
      }
    }
  }

  .copyright {
    width: 100%;
    margin-top: 26rem;
    flex-direction: column;
    @include flexPos(center);
    padding-bottom: 50rem;
  }
}
</style>
