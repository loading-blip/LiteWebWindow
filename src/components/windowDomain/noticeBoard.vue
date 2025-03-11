<script setup>
const props = defineProps({
    data: {
        type: null,
        default: ''
    }
});
</script>
<template>
    <h2>NoticeBoard</h2>
    <h3>A sample Window</h3>
    <p>You can Close/Minimize/TopUp/Control window now!</p>
    
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
</style>