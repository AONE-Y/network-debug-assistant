<template>
  <a-layout style="height: 100%">
    <a-layout-header style="background-color:#eae9e9;height: 15%">
      <a-form-item label="通道  " style="height: 100%;margin-left: 1%;">
        <a-select v-model="connections.current" size="mini">
          <a-option v-for="(item,index) in connections.arr">{{ item }}</a-option>
        </a-select>
        <span>&emsp;</span>
      </a-form-item>
    </a-layout-header>
    <a-layout-content style="background-color: #eae9e9;height: 85%;">
      <a-tabs style="height: 95%;width:96%;background-color: #eae9e9;margin-left: 2%" size="mini"
              :header-padding=false v-model="sendInfo.encode">
        <template #extra>
          <a-button size="mini" @click="handleClear">清除</a-button>
          <span>&emsp;</span>
        </template>
        <a-tab-pane key="1" title="ASCII">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="2" title="UTF8">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="3" title="UTF16">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="4" title="UTF32">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="5" title="UTF16-BE">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="6" title="UTF32-BE">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
        <a-tab-pane key="7" title="HEX">
          <a-textarea style="height: 72%;position: absolute;width: 100%;display: flex" auto-size  v-model="sendInfo.data"/>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
  <a-layout-sider style="width: 90px;background-color: #eae9e9" theme="dark">
    <a-layout-header style="height: 10%">
      <a-button size="mini" style="margin-top: 6%">关闭通道</a-button>
    </a-layout-header>
    <a-layout-content style="height: 90%;display: flex;justify-content: center;align-content: center">
      <span style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top: 6%;margin-bottom: 6%">
          <a-button size="mini">发送文件</a-button>
        <a-button size="mini">历史记录</a-button>
        <a-tooltip content="定时发送(ms)" :content-style="{fontSize:'9px',fontStyle:'italic'}">
          <a-input-number :style="{width:'72px',height:'24px',fontSize: '1px'}" v-model="sendInfo.timer" :min=0 hide-button></a-input-number>
        </a-tooltip>
        <a-button size="mini" type="primary" style="height: 60px;">&emsp;发送&emsp;</a-button>
      </span>
    </a-layout-content>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";

const connections = reactive({
  current: "",
  arr: ["1", "2", "3"]
});
const sendInfo=reactive({
  encode:1,
  data:"",
  timer:0
})
const handleClear=()=>{sendInfo.data=""}
</script>

<style scoped>

</style>