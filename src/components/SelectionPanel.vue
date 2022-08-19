<template>
  <a-form :model="form" style="height: 70%;width: 100%" @submit="handleSubmit" auto-label-width>
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
  <a-button type="primary" size="large">连接</a-button>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import TcpS from "../components/TcpS.vue";
import TcpC from "../components/TcpC.vue";
import TcpMc from "../components/TcpMC.vue";
import UdpBase from "../components/UdpBase.vue";
import UdpBoard from "../components/UdpBoard.vue";
import WebS from "../components/WebS.vue";
import WebC from "../components/WebC.vue";
import WebMc from "../components/WebMc.vue";

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
const handleSubmit=()=>{}

</script>

<style scoped>

</style>