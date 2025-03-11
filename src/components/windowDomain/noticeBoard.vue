<script setup>
const props = defineProps({
    data: {
        type: null,
        default: ''
    }
});
</script>
<template>
    <h2>须知</h2>
    <h3>推荐使用大屏</h3>
    <p>窗口可拖动/拉伸/最小化，目前<b>项目为半成品</b></p>
    <p>点击任务栏中快递查询即可</p>
    <p>名称填写qq号</p>
    <p>后四位填写快递运单中的手机号后四位</p>
    
    <p id ="myLink" ><a href="https://github.com/loading-blip/LiteWebWindow" target="_blank">项目开源地址</a></p>
</template>

<style scoped lang="scss">
$linkColor:rgb(69, 162, 238);
h2,h3{
    text-align: center;
    display: block;
    float: none;
    width: 100%;
}
h3{
    font-size: 1.5rem;
    margin-bottom: 20px;
    margin-top: 20px;
}
template{
    padding: 10%;
}
p{
    margin: 10px;
    text-align: center;
}
a{
    transition: 0.2s;
}
a:link{
    color: $linkColor;
    text-decoration: none;
}
a:visited{
    color: $linkColor;
    text-decoration: none;
}
a:hover{
    font-size: 1.1rem;
}
#myLink{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%,0);
}
</style>