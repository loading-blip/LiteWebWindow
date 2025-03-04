<!-- Template -->
<script setup>
import {onMounted,shallowRef,defineAsyncComponent} from 'vue';
import closeIcon from './icons/IconCloseWindow.vue'
import MinimizeIcon from './icons/IconMinimize.vue'
import '../assets/scss/main.scss';
import { RegMinimizeWindowButton,RegDraggableHandles,RegCloseWindowButton} from '../assets/js/EventRegistrationTool/window.js';

const props = defineProps({
    windowTitle: {
        type: String,
        required: true,
    },  
    windowDomain: {
        type: String,
        required: true,
    },
    windowWidth: {
        type: String,
        default: '900px',
    },
    windowHeight: {
        type: String,
        default: '600px',
    },
    allowStretch: {
        type: Boolean,
        default: true,
    },
    minimized: {
        type: Boolean,
        default: true,
    },
    allowMinimized: {
        type: Boolean,
        default: true,
    },
    allowStretch: {
        type: Boolean,
        default: true,
    },
    allowClose: {
        type: Boolean,
        default: true,
    },
    allowDrag: {
        type: Boolean,
        default: true,
    }
})

//import传入的参数对应组件
const func_moudle = import.meta.glob('./windowDomain/*.vue');
const taskfunc_moudle = shallowRef([]);
taskfunc_moudle.value.push({
    component: defineAsyncComponent(() => func_moudle[`./windowDomain/${props.windowDomain}.vue`]()),
      props: {}});

onMounted(() => {
    //本来想在外置的js处理一些组件的事件，但是发现外置执行js所有uerySelectorAll都是undefined，所以只能在onMounted里面处理
    var maxZIndex = 0;
    //组件拖拽效果(兼容触控)
    if (props.allowDrag) {
        const draggableHandles = document.getElementById(props.windowTitle+'_Window').querySelectorAll('.draggable-handle');
        RegDraggableHandles(draggableHandles);
    }

    // 窗口拖拽或点击时前置窗口
    const draggableContainers = document.querySelectorAll('.draggable-container');
    draggableContainers.forEach(container => {
        container.addEventListener('mousedown', () => {
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
        container.addEventListener('touchstart', () => {
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
    });

    // 窗口右上角最小化按钮事件
    if (props.allowMinimized) {
        const closeButtons = document.getElementById(props.windowTitle+'_Window').querySelectorAll('.MinimizeWindow');
        RegMinimizeWindowButton(closeButtons);
    }

    //窗口右上角关闭按钮事件
    if (props.allowClose) {
        const closeButtons = document.getElementById(props.windowTitle+'_Window').querySelectorAll('.closeWindow');
        RegCloseWindowButton(closeButtons);
    }

    //处理传入的参数
    const windowBody = document.getElementById(props.windowTitle+'_Window');
    if (props.allowStretch) {
        windowBody.style.overflow = 'hidden';
        windowBody.style.resize = 'both';
    }
    windowBody.style.width = props.windowWidth;
    windowBody.style.height = props.windowHeight;
    if (props.minimized) {
        windowBody.style.display = 'none';
    }
    
});

</script>

<template>
    <div class="window draggable-container" :id="windowTitle+'_Window'">
        <div class="windowTitleBar draggable-handle">
            <h1 class="WindowTitle">{{ windowTitle }}</h1>

            <a class="MinimizeWindow">
                <MinimizeIcon/>
            </a>
            <a class="closeWindow">
                <closeIcon/>
            </a>
        </div>
        <div class = "domain">
            <component v-for="(task, index) in taskfunc_moudle" :key="index+2"
            :is="task.component"
            v-bind="task.props"     
        />
        </div>
    </div>
</template>

<style scoped>
.domain{
    padding: 20px;
}
</style>