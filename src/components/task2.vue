<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
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
const dynamicComponent = ref(null);

onMounted(async () => {
  try {
    // 动态加载组件
    const module = await import(`./windowDomain/${props.windowDomain}.vue`);
    dynamicComponent.value = defineAsyncComponent(() => Promise.resolve(module.default));
  } catch (error) {
    console.error('Failed to load component:', error);
  }
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
            123
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/main.css';
.window {
    display: none;
}
</style>