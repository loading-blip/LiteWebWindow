<script setup>
const props = defineProps({
    data: {
        type: null,
        default: ''
    }
});
</script>
<template>
    <h2>UwU</h2>
    <p>点击右上角<b>最小化</b>或<b>叉叉</b>，或<b>拖动窗口</b></p>
    <p>即可看到下面的<b>支付界面</b></p>
    <p>>ᴗoಣ</p>
    <p id ="myLink" ><a href="https://github.com/loading-blip/LiteWebWindow" target="_blank">GitHub</a></p>
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