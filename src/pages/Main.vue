<template>
  <div class="layout">
    <a-layout style="width:100%;height: 100%;position: absolute">
      <a-layout-sider class="sider" theme="dark" style="width: 30%">
        <a-layout-content class="content1" style="background-color: white;height: 60%">
          <selection-panel></selection-panel>
        </a-layout-content>
        <a-layout-content class="content1" style="background-color: red;height: 40%">
          content
        </a-layout-content>
      </a-layout-sider>
      <a-layout-content>
        <a-layout-content class="content1" style="height: 65%">
         <message-receive></message-receive>
        </a-layout-content>
        <a-layout-content class="content1" style="background-color: yellow;height: 35%">Content</a-layout-content>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import SelectionPanel from "../components/SelectionPanel.vue";
import MessageReceive from "../components/MessageReceive.vue";
import { reactive} from "vue";


const handleSubmit = (data: any) => {
  console.log(data)
}

</script>
<style scoped>

.sider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-black);
  font-size: 10px;
  font-stretch: condensed;
  text-align: center;

}

.content1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-black);
  font-stretch: condensed;
  text-align: center;

}

.layout :deep(.arco-layout-sider) {

  background-color: var(--color-primary-light-3);
}

.layout :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}

.layout:deep(.arco-form-item) {
  margin-bottom: 5px;
}

.layout:deep(.arco-textarea[disabled]) {
  -webkit-text-fill-color: black;
}

.layout:deep(.arco-form) {
  overflow-x: scroll;
}
</style>
