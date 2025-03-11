<script setup>
import { onMounted } from 'vue';
import { GenerateWindow,addToTaskBar } from '../../assets/js/EventRegistrationTool/window.js';
import $ from 'jquery'
const props = defineProps({
    data: {
        type: null,
        required: true,
    }
})
onMounted(()=>{$('#quertStatus').hide();})
</script>

<script>
 
function createExpressWindow(data){
    const windowAttr = {
    "WindowName":'查询结果',
    "TemplateName":'windowTemplate',
    "DomainName":'queryDomain',
    "WindowWidth":'400px',
    "WindowHeight":'200px',
    "allowDrag":true,
    "allowMinimize":true,
    "allowStretch":true,
    "allowClose":true,
    "minimized":false,
    "data":data
    };
    GenerateWindow(windowAttr);
    addToTaskBar(windowAttr['WindowName'],(!windowAttr["minimized"]));
}

export default {
    methods: {
        showExpressNumber(){
            //查询是否正确
            //正确返回json单号{'validate':true,expressNum:["xxxxx","xxxx"]}
            //错误返回json{'validate':false,expressNum:[]}
            let postJSON = JSON.stringify({
                "UserName":$('#UserName').val(),
                "LastPhoneNum":$('#LastPhoneNum').val()
            });
            $('#quertStatus').text('查询中...');
            $.ajax({
                url: '/express/query',
                type: 'POST',
                contentType: 'application/json',
                data: postJSON,
                dataType: 'json',
                success: function(response) {
                    console.log('Response received:', response);
                    var responseData = response;
                    createExpressWindow(responseData)
                    $('#quertStatus').text('');
                    $('#quertStatus').hide();
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    $('#quertStatus').text('网络错误');
                    $('#quertStatus').show();
                }
            });
        }
    }
}
</script>

<template>
    <!-- 输入账号与手机号后四位查询单号 -->
    <div class="input-group">
        <span class="input-group-text">名称</span>
        <input type="text" aria-label="First name" class="form-control" id="UserName">
        <span class="input-group-text">手机号后四位</span>
        <input type="text" aria-label="Last name" class="form-control" id="LastPhoneNum">
    </div>
    <button type="button" class="btn btn-primary" @click="showExpressNumber()">查询</button>
    <p id="quertStatus"></p>
</template>

<style lang="scss">

</style>