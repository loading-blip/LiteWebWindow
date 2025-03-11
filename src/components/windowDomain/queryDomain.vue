<script setup>

const props = defineProps({
    data: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <h2>查询结果</h2>
    <table id="result" >
        <tr v-for="item in data">
            <td v-for="col in item" >{{ col }}</td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
h2{
    margin: 0 auto;
    text-align: center;
}
</style>