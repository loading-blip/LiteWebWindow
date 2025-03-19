<script setup>
const props = defineProps({
    data: {
        type: null,
        default: ''
    }
});
</script>
<template>
    <h2>灵感菇🍄</h2>
    <h3>您的投票或采集的灵感菇将可能决定下期的物料&nbsp&nbsp</h3>
    <p>有新的想法？<b>点击任务栏中的voting</b>,查看最近的新动态吧！</p>
    <p><a>Tips:每人只有3张票</a></p>
    <p>网页有小彩蛋哦 q(≧▽≦q)</p>
    <p><i>目前本项目并未完善，还是测试版本</i></p>
    <p id ="myLink" ><a href="https://github.com/loading-blip/LiteWebWindow" target="_blank">开源项目地址 GitHub</a></p>
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
p>a{
    color: red;
}
</style>