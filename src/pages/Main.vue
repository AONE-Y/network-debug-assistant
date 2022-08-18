<template>
  <div class="layout">
    <a-layout style="width:100%;height: 100%;position: absolute">


      <a-layout-sider class="sider" theme="dark" style="width: 30%">
        <a-layout-content class="content1" style="background-color: white;height: 65%">
          <a-form :model="form" style="height: 70%;width: 100%" @submit="handleSubmit" auto-label-width>

            <a-card style="width: 100%;height: 100%;padding-top: 15px">
              <template #title>
                <a-form-item field="type" label="类型&emsp;&emsp;">
                  <a-select v-model="form.type" placeholder="Please select ..." allow-clear>
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
          <a-textarea :placeholder="form.info" disabled style="height: 20%;-webkit-text-fill-color:black"/>
          <a-button type="primary" size="large">连接</a-button>

        </a-layout-content>
        <a-layout-content class="content1" style="background-color: red;height: 35%"> Content</a-layout-content>
      </a-layout-sider>
      <a-layout-content>
        <a-layout-content class="content1" style="background-color: blue;height: 65%">Content</a-layout-content>
        <a-layout-content class="content1" style="background-color: yellow;height: 35%">Content</a-layout-content>
      </a-layout-content>


    </a-layout>
  </div>
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
  localPath:'/',
  addressReuse: 0,
  keepAlive: 0,
  boardCast:0,
  dataModel: 0,
  maskProcess: 0,
  additionalHeaders0: '',
  additionalHeaders1: '',
  additionalHeaders2: '',
  threads:1,
  protocols: '提供的文件句柄无效。',
  info:''
})

const handleSubmit = (data: any) => {
  console.log(data)
}

</script>
<style scoped>
/*.layout-demo :deep(.arco-layout-content) {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  color: var(--color-white);*/
/*  font-size: 16px;*/
/*  !*font-stretch: condensed;*!*/
/*  text-align: center;*/
/*}*/
.sider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 10px;
  font-stretch: condensed;
  text-align: center;

}

.content1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 10px;
  font-stretch: condensed;
  text-align: center;

}

.layout :deep(.arco-layout-sider) {

  background-color: var(--color-primary-light-3);
}

.layout :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
.layout:deep(.arco-form-item){
  margin-bottom: 5px;
}
.layout:deep(.arco-textarea[disabled]) {
  -webkit-text-fill-color: black;
}
.layout:deep(.arco-form){
  overflow-x: scroll;
}
</style>
