<script setup lang="ts">
import { Client } from "@xmtp/xmtp-js";
import { bpEmpty } from 'bp-math';
import { useAppStore } from "@/store/appStore";
import { ethers } from "ethers";
import { loadKeys, storeKeys } from "@/utils/xmtpHelpers";

const appStore = useAppStore();
const sendAddr = '0x3bC893BDdBBF5817a61B396A1508988f0112f126'
const isShow = ref(false);
const convRef = ref(null);
const msgList = ref([]);
const clientRef = ref(null);
const isConnected = computed(() => {
  return !bpEmpty(appStore.defaultAccount);
})

const isOnNetwork = ref(false);

function launchTo(url) {
  if (url === '/') return;
  // 外链跳转
  window.open(url);
  return;
}

async function initXmtp() {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  const signer = toRaw(appStore.ethersObj.signerValue);
  let keys = loadKeys(sendAddr);
  if (!keys) {
    keys = await Client.getKeys(signer, {
      env: "production",
      skipContactPublishing: true,
      persistConversations: false,
    });
    storeKeys(sendAddr, keys);
  }

  const xmtp = await Client.create(signer, { env: "production", privateKeyOverride: keys });
  console.log('xmtp...', xmtp);

  newConversation(xmtp, sendAddr);

  isOnNetwork.value = !!xmtp.address;
  clientRef.value = xmtp;
}

// Function to start a new conversation
async function newConversation(xmtp_client, addressTo) {
  if (await xmtp_client?.canMessage(sendAddr)) {
    // Create a new conversation with the given address
    const conversation = await xmtp_client.conversations.newConversation(
      addressTo,
    );
    convRef.value = conversation;

    await streamMessages();

    const messages = await conversation.messages();
    msgList.value = messages;
  } else {
    console.log("Can't message because is not on the network.");
  }
}

// Function to stream messages from conversation
async function streamMessages() {
  const newStream = await convRef.value.streamMessages();

  for await (const msg of newStream) {
    const exists = msgList.value.find((m) => m.id === msg.id);
    if (!exists) {
      msgList.value.push(msg);
    }
  }
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

    <van-popup v-model:show="isShow">
      <div class="pop-wrap">
        <div v-if="!isConnected" class="thirdWeb">
          <button @click="appStore.linkWallet" class="btn">{{ $t('base.1') }}</button>
        </div>
        <!-- Section to connect to XMTP, shown if connected to wallet but not to XMTP -->
        <div v-if="isConnected && !isOnNetwork" class="xmtp">
          <button @click="initXmtp" class="btn">{{$p('Enable XMTP identity')}}</button>
        </div>
        <template v-if="isConnected && isOnNetwork && msgList">
          <Chat :client="clientRef" :conversation="convRef" :messageHistory="msgList" />
        </template>
      </div>
    </van-popup>
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
  width: 500rem;
  height: 600rem;
  @include flexPos(center);
  flex-direction: column;
  border-radius: 20rem;
  background-color: #efefef;

  .btn {
    width: 100%;
    color: #FFF;
    font-size: 24rem;
    border-radius: 10rem;
    padding: 20rem 30rem;
    background: linear-gradient(315deg, #1E50F1 0%, #4CE2F6 100%);
    box-shadow: inset 0px 2px 20px 0px #a7eaff;

    &:disabled {
      color: #878999;
      background: #3e415a;
      box-shadow: none;
    }

    &:active {
      background: linear-gradient(315deg, #2951d4 0%, #0940f3 100%);
    }
  }
}
</style>
