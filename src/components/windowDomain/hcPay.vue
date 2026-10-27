<script setup>

const props = defineProps({
    data: {
        type: null,
        default: ''
    }
});
</script>
<template>
    <h2>支付宝 <a style="font-size: 20px;color: #808080;">点击图片或扫描二维码支付</a></h2>
    <a href="https://qr.alipay.com/fkx17283xfdpuhun6xfuj8a"><img src="../../assets/img/zfb_pay_QR.JPG" alt="zfb_pay_QR"></a>
    <h2>微信 <a style="font-size: 20px;color: #808080;">扫描二维码支付</a></h2>
    <img src="../../assets/img/wx_pay_QR.PNG" alt="zfb_pay_QR">

</template>

<style scoped>
h1{
    text-align: center;
}
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
img{
    width: 70%;
    margin: 0 auto;
    display: block;
}
a:link{
    color:#808080;
}
</style>