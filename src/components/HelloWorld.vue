<template>
  <div class="layout-demo">
    <a-layout style="width:100%;height: 100%;position: absolute">


      <a-layout-sider class="sider" theme="dark" style="width: 30%">
        <a-layout-content class="content2" style="background-color: white;height: 65%">
          <a-form :model="form" @submit="handleSubmit">

            <a-card style="width: 100%">
              <template #title>
                <a-form-item field="type" label="类型">
                  <a-select v-model="form.type" placeholder="Please select ..." allow-clear>
                    <a-option value="tcp-s">TCP服务端</a-option>
                    <a-option value="tcp-c">TCP客户端</a-option>
                    <a-option value="tcp-mc">TCP多并发客户端</a-option>
                    <a-option value="udp">UDP通讯</a-option>
                    <a-option value="web-s">WebSocket服务端</a-option>
                    <a-option value="web-c">WebSokcet客户端</a-option>
                    <a-option value="web-mc">WebSokcet多并发客户端</a-option>
                  </a-select>
                </a-form-item>
              </template>
<!--              <a-form-item field="addr" label="监听地址">-->
<!--                <a-input v-model="form.addr" placeholder="请输入监听的IP地址...."/>-->
<!--              </a-form-item>-->
<!--              <a-form-item field="port" label="监听端口">-->
<!--                <a-input v-model="form.port" placeholder="请输入监听的端口...."/>-->
<!--              </a-form-item>-->
<!--              <a-form-item field="addressReuse" label="地址复用">-->
<!--                <a-select v-model="form.addressReuse">-->
<!--                  <a-option :value=1>True</a-option>-->
<!--                  <a-option :value=0>False</a-option>-->
<!--                </a-select>-->
<!--              </a-form-item>-->
<!--              <a-form-item field="keepAlive" label="保持活动">-->
<!--                <a-select v-model="form.keepAlive">-->
<!--                  <a-option :value=1>True</a-option>-->
<!--                  <a-option :value=0>False</a-option>-->
<!--                </a-select>-->
<!--              </a-form-item>-->
<!--              <TCPS :form="form"></TCPS>-->
              <a-form-item field="isRead">
                <a-checkbox v-model="form.isRead">
                  I have read the manual
                </a-checkbox>
              </a-form-item>
            </a-card>

            <a-form-item>
              <a-button html-type="submit">Submit</a-button>
            </a-form-item>
          </a-form>
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
import {KeepAlive, reactive} from "vue";
import TCPS from "./TcpS.vue";

const form = reactive({
  type: '',
  addr: "127.0.0.1",
  port: 8888,
  addressReuse: 0,
  keepAlive: 0
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
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;

}

.content1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;

}

.layout-demo :deep(.arco-layout-sider) {

  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
