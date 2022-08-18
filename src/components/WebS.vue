<template>
  <a-form :model="form" auto-label-width>
    <a-form-item field="localAddr" label="监听地址"
                 @mouseenter="()=>{ props.form.info='监听的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.localAddr" placeholder="请输入监听的IP地址...."/>
    </a-form-item>
    <a-form-item field="localPort" label="监听端口" @mouseenter="()=>{ props.form.info='监听的端口号[0-65535]。'}">
      <a-input-number v-model="form.localPort" placeholder="请输入监听的端口...."/>
    </a-form-item>
    <a-form-item field="localPath" label="监听路径"
                 @mouseenter="()=>{ props.form.info='监听的网卡地址(IPV4/IPV6),部分操作系统不支特IPV6。'}"
                 @mouseleave="clearInfo">
      <a-input v-model="form.localPath" placeholder="请输入监听的路径...."/>
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
    localAddr: "127.0.0.1",
    localPort: 8888,
    localPath:'/',
    dataModel:0,
    maskProcess:0,
    addressReuse: 0,
    keepAlive: 0,
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