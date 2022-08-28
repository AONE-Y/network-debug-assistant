<template>
  <a-form :model="form" auto-label-width>
    <a-form-item field="addr" label=" 主机地址"
                 @mouseenter="()=>{ props.form.info='服务器名祢或地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.addr" placeholder="请输入监听的IP地址...."/>
    </a-form-item>
    <a-form-item field="port" label="主机端口" @mouseenter="()=>{ props.form.info='服务器监听端口号[0-65535]。'}">
      <a-input-number v-model="form.port" placeholder="请输入监听的端口...."/>
    </a-form-item>
    <a-form-item field="keepAlive" label="保持活动"
                 @mouseenter="()=>{ props.form.info='设置Socket Keepalive选项（默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.keepAlive">
        <a-option :value=1>True</a-option>
        <a-option :value=0>False</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="threads" label="并发数量"
                 @mouseenter="()=>{ props.form.info='同时向服务器发起多个连接，连接数量由该参数指定。'}"
                 @mouseleave="clearInfo">
      <a-input-number v-model="form.threads"></a-input-number>
    </a-form-item>
    <a-form-item field="protocols" label="协议&emsp;&emsp;"
                 @mouseenter="()=>{ props.form.info='通讯使用的IP协议（只能查看）。'}" @mouseleave="clearInfo">
      <a-input v-model="form.protocols" disabled></a-input>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: {
    type: string,
    addr: string,
    wsAddr: string,
    port: number,
    localAddr: string,
    localPort: number,
    localPath: string,
    addressReuse: number,
    keepAlive: number,
    boardCast: number,
    dataModel: number,
    maskProcess: number,
    additionalHeaders0: string,
    additionalHeaders1: string,
    additionalHeaders2: string,
    threads: number,
    protocols: string,
    info: string
  }
}>();
const clearInfo = () => {
  props.form.info = ''
}


</script>

<style scoped>

</style>