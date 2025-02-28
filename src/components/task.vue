<script setup>
import {onMounted,shallowRef,defineAsyncComponent} from 'vue';
const props = defineProps({
  windowTitle: {
    type: String,
    required: true,
  },  
  windowDomain: {
    type: String,
    required: true,
  },
  
})
import closeIcon from './icons/IconCloseWindow.vue'
const func_moudle = import.meta.glob('./windowDomain/*.vue');
const taskfunc_moudle = shallowRef([]);
taskfunc_moudle.value.push({
    component: defineAsyncComponent(() => func_moudle[`./windowDomain/${props.windowDomain}.vue`]()),
      props: {}});
onMounted(() => {
    var maxZIndex = 0;
    //window
    const draggableHandles = document.querySelectorAll('.draggable-handle');
    draggableHandles.forEach(handle => {
        let currentContainer, offsetX, offsetY;

        function startDrag(e) {
            currentContainer = handle.parentElement;
            offsetX = (e.clientX || e.touches[0].clientX) - currentContainer.offsetLeft;
            offsetY = (e.clientY || e.touches[0].clientY) - currentContainer.offsetTop;
            document.body.style.userSelect = 'none'; // Prevent text selection

            function onMove(e) {
                currentContainer.style.left = `${(e.clientX || e.touches[0].clientX) - offsetX}px`;
                currentContainer.style.top = `${(e.clientY || e.touches[0].clientY) - offsetY}px`;
            }

            function stopDrag() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchmove', onMove);
                document.removeEventListener('touchend', stopDrag);
                document.body.style.userSelect = ''; // Allow text selection again
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', stopDrag);
        }

        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
    });

    const draggableContainers = document.querySelectorAll('.draggable-container');
    draggableContainers.forEach(container => {
        container.addEventListener('mousedown', () => {
            // Bring the clicked container to the front
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
        container.addEventListener('touchstart', () => {
            // Bring the touched container to the front
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
    });

    // Close window button
    const closeButtons = document.querySelectorAll('.closeWindow');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement.parentElement;
            var taskListid = container.id.split('_')[0];
            container.style.display = 'none';
            document.getElementById(taskListid).classList.remove('pressedLabel');
            document.getElementById(taskListid).classList.add('normalLabel');
        });
    });
});

</script>

<template>
    <div class="window draggable-container" :id="windowTitle+'_Window'">
        <div class="windowTitleBar draggable-handle">
            <h1 class="WindowTitle">{{ windowTitle }}</h1>
            <a class="closeWindow">
                <template v-if="closeIcon">
                    <closeIcon/>
                </template>
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
@import '../assets/css/main.css';
.window {
    display: none;
}


</style>