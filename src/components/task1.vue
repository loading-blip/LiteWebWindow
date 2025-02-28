<script setup>
import {onMounted,getCurrentInstance} from 'vue';
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
import domain from './windowDomain/domain.vue'

onMounted(() => {
  console.log( document.querySelectorAll('.draggable-handle'));
  let prop = getCurrentInstance().appContext.config.globalProperties;
  prop.$draggable_handle.push(...document.querySelectorAll('.draggable-handle'));
  prop.$closeWindow.push(...document.querySelectorAll('.closeWindow'));
  prop.$draggable_container.push(...document.querySelectorAll('.draggable-container'));
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
            <domain />
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/main.css';
.window {
    display: none;
}


</style>