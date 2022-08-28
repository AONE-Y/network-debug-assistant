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
    <a-form-item field="addressReuse" label="地址复用"
                 @mouseenter="()=>{ props.form.info='设置Socket ReuseAddress选项(默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.addressReuse">
        <a-option :value=1>True</a-option>
        <a-option :value=0>False</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="keepAlive" label="保持活动"
                 @mouseenter="()=>{ props.form.info='设置Socket Keepalive选项（默认关闭)。'}" @mouseleave="clearInfo">
      <a-select v-model="form.keepAlive">
        <a-option :value=1>True</a-option>
        <a-option :value=0>False</a-option>
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