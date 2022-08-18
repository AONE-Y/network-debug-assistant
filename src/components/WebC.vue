<template>
  <a-form :model="form" auto-label-width>
    <a-form-item field="wsAddr" label="主机地址"
                 @mouseenter="()=>{ props.form.info='服务器的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.wsAddr" placeholder="请输入主机的地址...."/>
    </a-form-item>
    <a-form-item field="dataModel" label="数据模式"
                 @mouseenter="()=>{ props.form.info='设置Socket ReuseAddress选项(默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.dataModel">
        <a-option :value=1>True</a-option>
        <a-option :value=0>False</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="maskProcess" label="掩码处理"
                 @mouseenter="()=>{ props.form.info='设置Socket Keepalive选项（默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.maskProcess">
        <a-option :value=1>二进制</a-option>
        <a-option :value=0>文本</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="additionalHeaders0" label="附加头[0]"
                 @mouseenter="()=>{ props.form.info='服务器的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.additionalHeaders0" placeholder="请输入主机的IP地址...."/>
    </a-form-item>
    <a-form-item field="additionalHeaders1" label="附加头[1]"
                 @mouseenter="()=>{ props.form.info='服务器的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.additionalHeaders1" placeholder="请输入主机的IP地址...."/>
    </a-form-item>
    <a-form-item field="additionalHeaders2" label="附加头[2]"
                 @mouseenter="()=>{ props.form.info='服务器的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.additionalHeaders2" placeholder="请输入主机的IP地址...."/>
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
    type: 'tcp-s',
    addr: "127.0.0.1",
    wsAddr: "ws://127.0.0.1:9999",
    port: 8888,
    localPath: '/',
    dataModel: 0,
    maskProcess: 0,
    addressReuse: 0,
    keepAlive: 0,
    additionalHeaders0: '',
    additionalHeaders1: '',
    additionalHeaders2: '',
    protocols: '提供的文件句柄无效。',
    info: string
  }
}>();

const clearInfo = () => {
  props.form.info = ''
}


</script>

<style scoped>

</style>