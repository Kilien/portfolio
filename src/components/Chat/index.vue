<script setup lang='ts'>

const props = defineProps<{
  messageHistory: any; // 历史信息
  client?: any; // 终端
  conversation?: any; // 信息
}>();

const inpVal = ref('');

const uniqueMessages = computed(() => {
  return props.messageHistory.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
  );
})

async function handleSend() {
  if (inpVal.value) {
    await props.conversation.send(inpVal.value);
    inpVal.value = "";
  }
}

async function handleInputChange(event) {
  if (event.key === "Enter") {
    await handleSend();
  }
}

function logMessage(message) {
  console.log(message);
}
</script>

<template>
  <div class="Chat">
    <div class="messageContainer">
      <ul class="messageList">
        <li v-for="message in uniqueMessages" :key="message.id" class="messageItem"
          title="Click to log this message to the console" @click="logMessage(message)">
          <strong class="text-28">
            {{ message.senderAddress === client.address ? "You" : "Fan" }}:
          </strong>
          <span class="text-20">{{ message.content }}</span>
          <span class="date"> ({{ message.sent.toLocaleTimeString() }})</span>
        </li>
      </ul>
    </div>
    <div class="inputContainer">
      <input type="text" class="inputField" v-model="inpVal" @keypress="handleInputChange" :placeholder="$t('base.31')" />
      <button class="btn btn--primary btn--inside uppercase" @click="handleSend">{{ $t('base.32') }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messageList {
  padding: 0rem;
}

.Chat {
  background-color: #efefef;
  margin: 0;
  color: black;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  border-radius: 10rem;
  justify-content: center;
}

.messageContainer {
  flex: 1;
  overflow-y: auto;
  padding: 10rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 15rem;
  border-top: 1rem solid #ccc;
}

.inputField {
  width: 100%;
  background: #fff;
  color: #a3a3a3;
  font: inherit;
  box-shadow: 0 6rem 10rem 0 rgba(0, 0, 0, .1);
  border: 0;
  outline: 0;
  padding: 10rem 18rem;
}

.btn {
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  font-size: 24rem;
  transition: all 200ms ease-in;
  cursor: pointer;

  &--primary {
    background: #7f8ff4;
    color: #FFF;
    box-shadow: 0 0 10rem 2rem rgba(0, 0, 0, .1);
    border-radius: 6rem;
    padding: 5rem 26rem;

    &:hover {
      background: darken(#7f8ff4, 4%);
    }

    &:active {
      background: #7f8ff4;
      box-shadow: inset 0 0 10rem 2rem rgba(0, 0, 0, .2);
    }
  }

  &--inside {
    margin-left: -96rem;
  }
}

.date {
  color: grey;
  font-size: 12rem;
}
</style>