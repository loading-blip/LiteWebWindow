<script setup>
import {defineAsyncComponent,getCurrentInstance, shallowRef} from 'vue';
import startIcon from './components/icons/IconMicrosoft.vue'
import StartMenu from './components/StartMenu.vue'
import './assets/scss/taskbar.scss'


var taskList = getCurrentInstance().appContext.config.globalProperties.$taskList;

const components = import.meta.glob('./components/*.vue');
// 异步注入组件
const taskComponents = shallowRef([]);
//This paragraph is about to be rewritten


Object.entries(taskList).forEach(([taskName, attr]) => {
  const componentPath = `./components/${attr['window']}.vue`;
  if (components[componentPath]) {
    taskComponents.value.push({
      component: defineAsyncComponent(() => components[componentPath]()),
      props: {
        windowTitle: taskName,
        windowDomain: attr['windowDomain'],
        windowWidth: attr['sizeW'],
        windowHeight: attr['sizeH'],
        allowStretch: attr['allowStretch'],
        allowMinimized: attr['allowMinimized'],
        allowClose: attr['allowClose'],
        allowDrag: attr['allowDrag'],
        minimized: attr['minimized'],
        data:attr['data']
      }
    });
  }
  else{
    console.error('no such component');
  }
});
//end paragraph
</script>


<template>
      <!-- 渲染动态组件并传递props -->
      <component v-for="(task, index) in taskComponents" :key="index"
        :is="task.component"
        :window-title="task.props.windowTitle"
        :window-domain="task.props.windowDomain"
        :window-width="task.props.windowWidth"
        :window-height="task.props.windowHeight"
        :allow-stretch="task.props.allowStretch"
        :allow-minimized="task.props.allowMinimized"
        :allow-close="task.props.allowClose"
        :allow-drag="task.props.allowDrag"
        :minimized="task.props.minimized"
        :data="task.props.data"
      />
      <div id="newWindowArea"></div>
      <StartMenu/>
  <div id="taskBar">
      <ul>
          <li id="StartIcon"><startIcon/></li>
      </ul>
  </div>
</template>


<style>


</style>
