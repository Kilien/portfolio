<script setup lang="ts"></script>

<template>
  <ul class="wrapper">
    <li class="icon facebook">
      <span class="tooltip">Facebook</span>
      <img src="@img/home/icon/icon-facebook.svg" alt="" class="w-46rem md:w-20rem" />
    </li>
    <li class="icon instagram">
      <span class="tooltip">Instagram</span>
      <img src="@img/home/icon/icon-instagram.svg" alt="" class="w-46rem md:w-20rem" />
    </li>
    <li class="icon youtube">
      <span class="tooltip">Youtube</span>
      <img src="@img/home/icon/icon-youtube.svg" alt="" class="w-46rem md:w-20rem" />
    </li>
    <li class="icon github">
      <span class="tooltip">Tiktok</span>
      <img src="@img/home/icon/icon-tiktok.svg" alt="" class="w-46rem md:w-20rem" />
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
      > img {
        filter: invert(98%) sepia(16%) saturate(57%) hue-rotate(253deg) brightness(113%)
          contrast(187%);
      }
    }
  }
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0rem -1rem 0rem rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
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
</style>
