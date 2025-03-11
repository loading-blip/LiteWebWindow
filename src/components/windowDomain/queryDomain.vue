<script setup>
import $ from 'jquery'
import { onMounted } from 'vue';
const props = defineProps({
    data: {
        type: String,
        required: true,
    }
})
onMounted(()=>{
    $('#queryValidate').text(props.data['validate']?"":"尾号错误或未找到订单")
})
</script>

<template>
    <h2>查询结果</h2>
    <table id="result" >
        <tr v-for="item in props.data['expressNum']">
            <td>{{ item }}</td>
        </tr>
    </table>
    <div id="queryValidate"></div>
</template>

<style scoped lang="scss">
h2{
    margin: 0 auto;
    text-align: center;
}
</style>