<script setup>
import {defineAsyncComponent,getCurrentInstance, shallowRef} from 'vue';

var taskList = getCurrentInstance().appContext.config.globalProperties.$taskList;

import startIcon from './components/icons/IconMicrosofr.vue'

const components = import.meta.glob('./components/*.vue');
// 处理任务列表生成组件数组
const taskComponents = shallowRef([]);

Object.entries(taskList).forEach(([taskName, domain]) => {
  const componentPath = `./components/task.vue`;
  
  if (components[componentPath]) {
    taskComponents.value.push({
      component: defineAsyncComponent(() => components[componentPath]()),
      props: {
        windowTitle: taskName,
        windowDomain: domain
      }
    });
  }
});
console.log(taskComponents.value);
</script>


<template>
      <!-- 渲染动态组件并传递props -->
      <component v-for="(task, index) in taskComponents" :key="index"
        :is="task.component"
        :window-title="task.props.windowTitle"
        :window-domain="task.props.windowDomain"
      />
  <div id="taskBar">
      <ul>
          <li><startIcon/></li>
      </ul>
  </div>
</template>


<style>
@import './assets/css/taskbar.css';
@import './assets/css/main.css';
</style>
