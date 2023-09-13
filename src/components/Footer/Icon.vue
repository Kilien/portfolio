<script setup lang="ts">
import { useAppStore } from "@/store/appStore";
import { ethers } from "ethers";

const appStore = useAppStore();

const isShow = ref(false);

function launchTo(url) {
  if (url === '/') return;
  // 外链跳转
  window.open(url);
  return;
}
</script>

<template>
  <ul class="wrapper">
    <li class="icon github" @click="launchTo('https://github.com/Kilien')">
      <span class="tooltip">Github</span>
      <img src="@img/home/icon/GitHub.svg" alt="" class="w-46rem md:w-30rem" />
    </li>
    <li class="icon email" @click="launchTo('mailto:kilienazure@gmail.com')">
      <span class="tooltip">Email</span>
      <img src="@img/home/icon/Email.svg" alt="" class="w-46rem md:w-30rem" />
    </li>
    <li class="icon instagram" @click="launchTo('https://www.instagram.com/kilienazure')">
      <span class="tooltip">Instagram</span>
      <img src="@img/home/icon/instagram.svg" alt="" class="w-46rem md:w-30rem" />
    </li>
    <li class="icon youtube" @click="isShow = true">
      <span class="tooltip">Chat</span>
      <img src="@img/home/icon/chat.svg" alt="" class="w-46rem md:w-30rem" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.wrapper {
  display: inline-flex;
  list-style: none;

  .icon {
    position: relative;
    background: #ffffff;
    border-radius: 50%;
    padding: 15rem;
    margin: 10rem;
    width: 30rem;
    height: 30rem;
    font-size: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10rem 10rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    .tooltip {
      position: absolute;
      top: 0;
      font-size: 14rem;
      background: #ffffff;
      color: #ffffff;
      padding: 5rem 8rem;
      border-radius: 5rem;
      box-shadow: 0 10rem 10rem rgba(0, 0, 0, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

      // 顶部栏
      &::before {
        position: absolute;
        content: '';
        height: 8rem;
        width: 8rem;
        background: #ffffff;
        bottom: -3rem;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    &:hover {
      .tooltip {
        top: -45rem;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      >img {
        filter: invert(98%) sepia(16%) saturate(57%) hue-rotate(253deg) brightness(113%) contrast(187%);
      }
    }
  }
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0rem -1rem 0rem rgba(0, 0, 0, 0.1);
}

.wrapper .email:hover,
.wrapper .email:hover .tooltip,
.wrapper .email:hover .tooltip::before {
  background: #1877f2;
  color: #ffffff;
}

.wrapper .twitter:hover,
.wrapper .twitter:hover .tooltip,
.wrapper .twitter:hover .tooltip::before {
  background: #1da1f2;
  color: #ffffff;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #e4405f;
  color: #ffffff;
}

.wrapper .github:hover,
.wrapper .github:hover .tooltip,
.wrapper .github:hover .tooltip::before {
  background: #333333;
  color: #ffffff;
}

.wrapper .youtube:hover,
.wrapper .youtube:hover .tooltip,
.wrapper .youtube:hover .tooltip::before {
  background: #cd201f;
  color: #ffffff;
}

.pop-wrap {
  width: 480rem;
  height: 500rem;
  border-radius: 20rem;
  background-color: #efefef;

  .btn {
    width: 200rem;
    height: 72rem;
    color: #FFF;
    font-size: 24rem;
    border-radius: 6rem;
    background-color: skyblue;
  }
}
</style>
