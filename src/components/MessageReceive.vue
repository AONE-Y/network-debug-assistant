<template>
  <a-layout-header style="background-color:#eae9e9;height: 6%">
    <a-form-item label="限制" style="height: 100%;margin-left: 1%">
      <a-select v-model="option.limit" size="mini" style="width: 13%">
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
        <a-checkbox v-model="option.hidden">不显示数据</a-checkbox>
        <a-checkbox v-model="option.receiveMessage">添加接收信息</a-checkbox>
        <a-checkbox v-model="option.autoSave">自动保存</a-checkbox>
      </a-space>
    </a-form-item>

  </a-layout-header>
  <a-layout-content style="background-color: white;">
    <a-tabs style="height: 100%;background-color: #eae9e9">
      <template #extra>
        <a-button size="mini">清除</a-button>
        <span>&emsp;</span>
        <a-button size="mini">保存</a-button>
        <span>&emsp;</span>
      </template>
      <a-tab-pane key="1" title="ASCII">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled
                    v-model="dataStr"/>
      </a-tab-pane>
      <a-tab-pane key="2" title="UTF8">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
      <a-tab-pane key="3" title="UTF16">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
      <a-tab-pane key="4" title="UTF32">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
      <a-tab-pane key="5" title="UTF16-BE">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
      <a-tab-pane key="6" title="UTF32-BE">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
      <a-tab-pane key="7" title="HEX">
        <a-textarea style="height: 87%;position: absolute;width: 100%;display: flex" auto-size disabled/>
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const option = reactive({
  limit: "2m",
  hidden: false,
  receiveMessage: false,
  autoSave: false
})
const data = reactive(["123\n", "fdafdafd"])
let dataStr = "";
data.forEach((e) => {
      dataStr+=e;
    }
)
console.log(dataStr);
</script>

<style scoped>

</style>