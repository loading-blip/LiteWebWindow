<!-- Template -->
<script setup>
import {onMounted,shallowRef,defineAsyncComponent} from 'vue';
import closeIcon from './icons/IconCloseWindow.vue'
import MinimizeIcon from './icons/IconMinimize.vue'
import '../assets/scss/main.scss';
import '../assets/scss/scrollBar.scss';
import { RegMinimizeWindowButton,RegDraggableHandles,RegCloseWindowButton,RegWindowResize} from '../assets/js/EventRegistrationTool/window.js';

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
    allowStretchX: {
        type: Boolean,
        default: true,
    },
    allowStretchY: {
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
    },
    data: {
        type: null,
        default: '',
        required: false
    }
})

//import传入的参数对应组件
const func_moudle = import.meta.glob('./windowDomain/*.vue');
const taskfunc_moudle = shallowRef([]);
taskfunc_moudle.value.push({
    component: defineAsyncComponent(() => func_moudle[`./windowDomain/${props.windowDomain}.vue`]()),props:{data:props.data}});

onMounted(() => {
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
    else{
        //修改关闭按钮样式
        document.getElementById(props.windowTitle+'_Window').querySelectorAll('.closeWindow')[0].classList.replace('closeWindow','disableCloseWindow')
    }
    //窗口大小调整事件
    const windowBody = document.getElementById(props.windowTitle+'_Window');
    windowBody.style.overflow = 'hidden';
    if (props.allowStretchX) {
        const topResize = document.querySelector('.left-resize-x');
        const bottomResize = document.querySelector('.right-resize-x');
        RegWindowResize([topResize, bottomResize],[]);
        windowBody.style.resize = 'vertical';
    }
    if (props.allowStretchY) {
        const leftResize = document.querySelector('.top-resize-y');
        const rightResize = document.querySelector('.bottom-resize-y');
        RegWindowResize([],[leftResize,rightResize]);
        windowBody.style.resize = 'horizontal';
    }
    if (props.allowStretchX && props.allowStretchY){
        windowBody.style.resize = 'both';
    }
    //处理传入的参数
    
    windowBody.style.width = props.windowWidth;
    windowBody.style.height = props.windowHeight;
    if (props.minimized) {
        windowBody.style.display = 'none';
    }
    
});

</script>

<template>
    <div class="window draggable-container" :id="windowTitle+'_Window'">
        <div class="top-resize-y"></div>
        <div class="bottom-resize-y"></div>
        <div class="left-resize-x"></div>
        <div class="right-resize-x"></div>
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
            :data="task.props.data"
        />
        </div>
        
    </div>
</template>

<style scoped>

</style>