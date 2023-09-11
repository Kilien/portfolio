<script setup lang="ts">
import { menuList, useTopBar } from './useTopBar';
import i18n from '@/locales/i18n';
import WalletBtn from '@cps/WalletBtn/index.vue';
import LangCollapse from './LangCollapse.vue';

const $t = i18n.global.t;

const { launchTo } = useTopBar();

const props = defineProps<{
  isShowMenu: boolean; // 是否展示菜单
}>();

const emits = defineEmits<{
  (hide: 'hide'): void; // 隐藏弹窗
}>();

const handleLaunchTo = (item) => {
  launchTo(item);
  emits('hide');
};
</script>

<template>
  <div class="menu-wrap">
    <!-- 遮罩层 -->
    <div :class="['menu-mask', { active: props.isShowMenu }]" @click="emits('hide')"></div>
    <!-- 菜单面板 -->
    <transition
      :duration="1000"
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <div class="menu-panel" v-show="props.isShowMenu">
        <WalletBtn />

        <div class="mt-100rem">
          <LangCollapse />

          <!-- 点击了其他页 -->
          <a class="menu-box" v-for="l in menuList" :key="l.id">
            <!-- 二级菜单 -->
            <el-collapse v-if="l?.children?.length">
              <el-collapse-item class="menu-tab" :name="l.id">
                <template #title>
                  <div class="flex items-center w-full h-full">
                    <img :src="l.logo" alt="" class="w-34rem mr-14rem" />
                    <div>{{ $t(l.name) }}</div>
                  </div>
                </template>

                <div
                  @click.stop="handleLaunchTo(it)"
                  class="menu-item"
                  v-for="it in l.children"
                  :key="it.id"
                >
                  <div class="menu-tab flex pl-28rem items-center">
                    <img :src="it.logo" alt="" class="w-34rem mr-14rem" />
                    <div>{{ $t(it.name) }}</div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>

            <div class="menu-item" v-else @click.stop="handleLaunchTo(l)">
              <div class="menu-tab flex items-center pl-50">
                <div class="text-white">{{ $t(l.name) }}</div>
              </div>
              <!-- <img src="@img/common/icon-arrow.png" alt="arrow" class="arrow" /> -->
            </div>
          </a>
        </div>

        <!-- 区块浏览器 -->
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';

.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.menu-panel {
  position: absolute;
  left: 0;
  top: 0;
  // padding-top: calc($mobTopBarHeight + 30rem);
  // padding-right: 22rem;
  // background-color: #008c8c;
  @include -width(100%, 750px, 750px);
  // width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 10000;
  color: #fff;
  padding-bottom: 200rem;

  .menu-box {
    &:nth-of-type(1) {
      position: relative;

      &::before {
        content: '';
        width: calc(100% - 100rem);
        height: 2rem;
        background-color: #313131;
        position: absolute;
        left: 50rem;
        top: 0;
      }
    }
  }

  .menu-item {
    @include flexPos(flex-start);
    @include mixItem();

    &:last-child::after {
      @include menuItemLine();
    }
  }
}

:deep(.wallet-wrap) {
  position: absolute;
  right: 45rem;
  top: $walletBtnMenuGap;

  .link-btn,
  .account-address {
    border: solid 1.5px #fff;
  }
}

/* 遮罩层 左上角弹出 --start */
.menu-mask {
  position: fixed;
  z-index: 98;

  &::before,
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right bottom, #000, #333, );
    border-bottom-right-radius: 200%; // 右下角圆角
    z-index: -1;
    -webkit-transition: -webkit-transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
      border-radius linear 0.8s;
    transition: -webkit-transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s, border-radius linear 0.8s;
    transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s, border-radius linear 0.8s;
    transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s,
      -webkit-transform cubic-bezier(0.77, 0, 0.175, 1) 0.6s, border-radius linear 0.8s;
    // 左上角弹出
    -webkit-transform: translateX(-100%) translateY(-100%);
    transform: translateX(-100%) translateY(-100%);
  }

  &::before {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  &::after {
    /* background: #FFFCF3; */
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }

  &.active {

    &::before,
    &::after {
      /* 左上角弹出 */
      -webkit-transform: translateX(0%) translateY(0%);
      transform: translateX(0%) translateY(0%);
      border-radius: 0;
    }

    &::before {
      -webkit-transition-delay: 0s;
      transition-delay: 0s;
    }

    &::after {
      -webkit-transition-delay: 0.1s;
      transition-delay: 0.1s;
    }
  }
}

/* 遮罩层 --end */

:deep(.el-collapse) {
  border: none !important;
  --el-collapse-border-color: transparent;
}

:deep(.el-collapse-item__wrap) {
  background-color: transparent !important;
  border: none !important;
}

:deep(.el-collapse-item__header) {
  height: 104rem !important;
  /* margin-top: 0.25rem; */
  background-color: transparent !important;
  color: #fff !important;
  font-size: 28rem;

  /* border-bottom: solid 1px #4f3fc1; */
  /* &:not(:first-of-type) { */
  /* border-top: solid 1px #4f3fc1; */
  /* } */
}
</style>
