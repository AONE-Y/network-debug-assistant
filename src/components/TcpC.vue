<template>
  <a-form :model="form" auto-label-width>
    <a-form-item field="addr" label=" 主机地址" @mouseenter="()=>{ props.form.info='服务器名祢或地址(IPV4/IPV6),部分操作系统不支特IPV6。'}" @mouseleave="clearInfo">
      <a-input v-model="form.addr" placeholder="请输入监听的IP地址...."/>
    </a-form-item>
    <a-form-item field="port" label="主机端口"  @mouseenter="()=>{ props.form.info='服务器监听端口号[0-65535]。'}">
      <a-input-number v-model="form.port" placeholder="请输入监听的端口...."/>
    </a-form-item>
    <a-form-item field="keepAlive" label="保持活动" @mouseenter="()=>{ props.form.info='设置Socket Keepalive选项（默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.keepAlive">
        <a-option :value=1>True</a-option>
        <a-option :value=0>False</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="protocols" label="协议&emsp;&emsp;" @mouseenter="()=>{ props.form.info='通讯使用的IP协议（只能查看）。'}" @mouseleave="clearInfo">
      <a-input v-model="form.protocols" disabled></a-input>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: {
    type: 'tcp-c',
    addr: "127.0.0.1",
    port: 8888,
    keepAlive: 0,
    protocols:'提供的文件句柄无效。',
    info:string
  }
}>();
const clearInfo=()=>{
  props.form.info=''
}


</script>

<style scoped>

</style>