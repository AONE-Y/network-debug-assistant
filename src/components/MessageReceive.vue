<template>
  <a-layout-header style="background-color:#eae9e9;height: 6%">
    <a-form-item label="限制" style="height: 100%;margin-left: 1%">
      <a-select v-model="props.receiveInfo.limit" size="mini" style="width: 95px">
        <a-option value="512k">512 KB</a-option>
        <a-option value="1m">1 MB</a-option>
        <a-option value="2m">2 MB</a-option>
        <a-option value="4m">4 MB</a-option>
        <a-option value="8m">8 MB</a-option>
        <a-option value="16m">16 MB</a-option>
        <a-option value="32m">32 MB</a-option>
        <a-option value="64m">64 MB</a-option>
        <a-option value="128m">128 MB</a-option>
        <a-option value="512m">512 MB</a-option>
        <a-option value="1g">1 GB</a-option>
      </a-select>
      <a-space size="large" style="margin-left: 2%">
        <a-checkbox v-model="props.receiveInfo.hidden">不显示数据</a-checkbox>
        <a-checkbox v-model="props.receiveInfo.receiveMessage">添加接收信息</a-checkbox>
        <a-checkbox v-model="props.receiveInfo.autoSave">自动保存</a-checkbox>
      </a-space>
      <span class="saveButton" v-show="props.receiveInfo.data!=''">
      <a-button size="mini">保存为文件</a-button>
   </span>
    </a-form-item>
  </a-layout-header>
  <a-layout-content style="background-color: white;">
    <a-tabs style="height: 100%;background-color: #eae9e9" v-model:active-key="props.receiveInfo.decode">
      <template #extra>
        <a-button size="mini" @click="handleClear">清除</a-button>
        <span>&emsp;</span>
        <a-button size="mini">保存</a-button>
        <span>&emsp;</span>
      </template>
      <a-tab-pane :key=1 title="ASCII">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=2 title="UTF8">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=3 title="UTF16">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=4 title="UTF32">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=5 title="UTF16-BE">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=6 title="UTF32-BE">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
      <a-tab-pane :key=7 title="HEX">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" disabled
                    v-model="props.receiveInfo.data"/>
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const props = defineProps<{
  receiveInfo: {
    decode: number,
    limit: string,
    hidden: boolean,
    receiveMessage: boolean,
    autoSave: boolean,
    data: string
  }
}>();


const handleClear = () => {
  props.receiveInfo.data = ""
}

</script>

<style scoped>
.saveButton {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 20px;
}
</style>