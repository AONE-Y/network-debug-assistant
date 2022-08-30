<template>
  <a-form :model="form" style="height: 70%;width: 100%" auto-label-width>
    <a-card style="width: 100%;height: 100%;padding-top: 15px;">
      <template #title>
        <a-form-item field="type" label="类型&emsp;&emsp;">
          <a-select v-model="form.type" placeholder="Please select ...">
            <a-option value="tcp-s">TCP服务端</a-option>
            <a-option value="tcp-c">TCP客户端</a-option>
            <a-option value="tcp-mc">TCP多并发客户端</a-option>
            <a-option value="udp-base">UDP基础通讯</a-option>
            <a-option value="udp-board">UDP广播通讯</a-option>
            <a-option value="web-s">WebSocket服务端</a-option>
            <a-option value="web-c">WebSokcet客户端</a-option>
            <a-option value="web-mc">WebSokcet多并发客户端</a-option>
          </a-select>
        </a-form-item>
      </template>
      <tcp-s :form="form" v-if="form.type==='tcp-s'"></tcp-s>
      <tcp-c :form="form" v-if="form.type==='tcp-c'"></tcp-c>
      <tcp-mc :form="form" v-if="form.type==='tcp-mc'"></tcp-mc>
      <udp-base :form="form" v-if="form.type==='udp-base'"></udp-base>
      <udp-board :form="form" v-if="form.type==='udp-board'"></udp-board>
      <web-s :form="form" v-if="form.type==='web-s'"></web-s>
      <web-c :form="form" v-if="form.type==='web-c'"></web-c>
      <web-mc :form="form" v-if="form.type==='web-mc'"></web-mc>
    </a-card>
  </a-form>
  <a-textarea :placeholder="form.info" disabled style="height: 20%;-webkit-text-fill-color:black" auto-size/>
  <a-button type="primary" size="large" :status="button.isConnected?'danger':'normal'" long @click="handleConnection">
    {{ button.isConnected ? '断开' : '连接' }}
  </a-button>

</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive} from "vue";
import {invoke} from '@tauri-apps/api'
import TcpS from "../components/TcpS.vue";
import TcpC from "../components/TcpC.vue";
import TcpMc from "../components/TcpMC.vue";
import UdpBase from "../components/UdpBase.vue";
import UdpBoard from "../components/UdpBoard.vue";
import WebS from "../components/WebS.vue";
import WebC from "../components/WebC.vue";
import WebMc from "../components/WebMc.vue";
import {emit, listen} from "@tauri-apps/api/event";
import {asciiToByte, byteToAscii, utf8ToByte} from "../utils/stringByte";
import {decode, encode} from "iconv-lite";
import {arrToHex} from "../utils/Utils";


const props = defineProps<{
  receiveInfo: {
    decode: number,
    limit: string,
    hidden: boolean,
    receiveMessage: boolean,
    autoSave: boolean,
    data: Array<string>
  }
}>();
const handleTest = () => {
  emit("msg-rust", {fromAddr: "127.0.0.1:9999", data: "dfafdgagdadfa"})
  emit("msg-rust", {fromAddr: "127.0.0.1:9999", data: "dfafdgagdadfa1"})
  emit("msg-rust", {fromAddr: "127.0.0.1:9999", data: "dfafdgagdadfa2"})
}
const form = reactive({
  type: 'tcp-s',
  addr: "127.0.0.1",
  wsAddr: "ws://127.0.0.1:9999",
  port: 8888,
  localAddr: "127.0.0.1",
  localPort: 9999,
  localPath: '/',
  addressReuse: 0,
  keepAlive: 0,
  boardCast: 0,
  dataModel: 0,
  maskProcess: 0,
  additionalHeaders0: '',
  additionalHeaders1: '',
  additionalHeaders2: '',
  threads: 1,
  protocols: '提供的文件句柄无效。',
  info: ''
})
const button = reactive({
  isConnected: false
})

const proxy = getCurrentInstance()?.proxy

const unlisten = async () => {
  await listen<string>("msg-rust", (event) => {
    let payload = event.payload;
    console.log(payload);

    let decodeOption = props.receiveInfo.decode;
    let arr = encode(payload.data, 'utf8')
    let date = new Date()
    let titleText = "[ " + payload.fromAddr + " ]" + "      " + date.toLocaleString() + ":" + date.getMilliseconds();
    let childText=""
    if (decodeOption == 1) {
      childText = decode(arr, 'ascii')
    } else if (decodeOption === 2) {
      childText = decode(arr, 'utf8')
    } else if (decodeOption === 3) {
      childText = decode(arr, 'utf16')
    } else if (decodeOption === 4) {
      childText = decode(arr, 'utf32')
    } else if (decodeOption === 5) {
      childText = decode(arr, 'utf16-be')
    } else if (decodeOption === 6) {
      childText = decode(arr, 'utf32be')
    } else if (decodeOption == 7) {
      childText = arrToHex(arr)
    }
    if (props.receiveInfo.receiveMessage) {
      props.receiveInfo.data.push(titleText+'\n'+childText)
    } else {
      props.receiveInfo.data.push(childText)
    }
    if (!props.receiveInfo.hidden){
      let nodes = document.getElementsByClassName("msg");
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes.item(i);
        let childNode = document.createElement("span");
        if (props.receiveInfo.receiveMessage) {
          let title = document.createElement("span");
          title.style.color = 'blue';
          title.style.fontSize = '15px'
          title.innerText = titleText;
          node?.appendChild(title)
        }
        childNode.innerText=childText;
        node?.appendChild(childNode);
      }
    }
  });
}
unlisten()
const handleConnection = () => {

  switch (form.type) {
    case "tcp-s":
      if (button.isConnected) {
        invoke('tcpServerOff', {
          info: {
            localAddr: form.localAddr,
            localPort: form.localPort,
            addressReuse: form.addressReuse == 1,
            keepAlive: form.keepAlive == 1
          }
        }).then((response: any) => {
          if (response) {
            button.isConnected = false;
            proxy?.$message.error("success");
          } else {
            proxy?.$message.error("error");
          }
        });
      } else {
        invoke('tcpServerOn', {
          info: {
            localAddr: form.localAddr,
            localPort: form.localPort,
            addressReuse: form.addressReuse == 1,
            keepAlive: form.keepAlive == 1
          }
        }).then((response: any) => {
          let res = String(response);
          if (res.length == 0) {
            button.isConnected = true;
          } else {
            proxy?.$message.error(res);
          }
        })
      }
    default:
      break;
  }
}

</script>

<style scoped>

</style>