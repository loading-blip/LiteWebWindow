<script setup>
import $ from 'jquery'
import { onMounted } from 'vue';
    var out_of_vote = 0;
    $.ajax({
        url: '/current_ip_submission_num',
        type: 'GET',
        async: false,
        success: function(response) {
            out_of_vote = response;
            console.log('Response received:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
                
        }
    });
    var source_data = [];
    $.ajax({
        url: '/list_of_voting',
        type: 'GET',
        async: false,
        success: function(response) {
            source_data = response;
            console.log('Response received:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);

        }
    });
    var data = {};
    source_data = JSON.parse(source_data);
    data = source_data;
onMounted(()=>{
    function focus(){
        $('#vote_statuse').hide();
    }
    $('#item_name').on('change',focus())
    $('#item_describe').on('change',focus())
    $('#uploader').on('change',focus())
})
</script>


<script>
export default {
    methods: {
        uploadIdea(){
            $('#vote_statuse').show();
            let uploadData = {
                'item_name':$('#item_name').val(),
                'uploader':$('#uploader').val(),
                'item_describe':$('#item_describe').val(),
            }
            $('#vote_statuse').show();
            if (Object.values(uploadData).includes('uploadData')){
                
                //未填满时提示
                $('#vote_statuse').text('三缺一');
            }
            else{
                $('#vote_statuse').hide();
            }
            $('#vote_statuse').show();
            $.ajax({
                url: '/upload_idea',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(uploadData),
                dataType: 'json',
                success: function(response) {
                    console.log('Response received:', response);
                    //当提交灵感成功的提示
                    $('#vote_statuse').text('尼的灵感所想的物料会突然就会从地里长出来的').css('color','black');
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    //当提交灵感失败的提示
                    $('#vote_statuse').text(`提交失败(${xhr.status})请稍后尝试`).css('color','red');

                }
            });
        },
        vote(id){
            let uploadData = {
                'voteItem':id
            }
            $.ajax({
                url: '/vote',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(uploadData),
                dataType: 'json',
                success: function(response) {
                    console.log('Response received:', response);
                    $(`#vote_button${id}`).attr('disabled',true);
                    let status=response['status'];
                    $('#vote_statuse').show();
                    if (status==='max_vote'){
                        //当投票达到最大限制的提示
                        $('#vote_statuse').text('您已经投过票了喵').css('color','black');
                    }
                    else{
                        //当投票成功提示
                        $('#vote_statuse').text("感谢您的投票！").css('color','black');
                    }
                    
                    // var responseData = response;
                    // createExpressWindow(responseData)
                    // $('#quertStatus').text('');
                    // $('#quertStatus').hide();
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    //当提交投票失败的提示
                    $('#vote_statuse').text(`提交失败(${xhr.status})请稍后尝试`).css('color','red');
                }
            });
        }
    }
}

</script>


<template>
    <table>
        <!-- id,物料名称,查看描述按钮，上传者,投票 -->
         <tr>
            <th>id</th>
            <th>物料名称</th>
            <th>上传者</th>
            <th>查看描述</th>
            <th>投票</th>
         </tr>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(col, colIndex) in row" :key="colIndex">
                <template v-if="colIndex === row.length - 1">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#'+'describe_'+col">
                        查看
                    </button>
                        <!-- Modal -->
                    <teleport to="body">
                        <div class="modal fade" :id="'describe_'+col" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" :aria-labelledby="'describe_'+col+'Label'" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" :id="'describe_'+col+'Label'">描述</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {{ col }}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">关闭</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </teleport>
                </template>
                <template v-else>
                    {{ col }}
                </template></td>
            <td><input class="btn btn-primary" value="vote" type="button" @click="vote(row[0])" :id="'vote_button'+row[0]"></td>
        </tr>
        <tr>
            <td colspan="5"><p>有别的想法？</p></td>
        </tr>
        <tr>
            <td colspan="5">
                <div class="input-group">
                    <span class="input-group-text">N</span>
                    <input type="text" placeholder="资源名称" class="form-control" id="item_name">
                    <input type="text" placeholder="留个名字" class="form-control" id="uploader">
                    <input type="text" placeholder="描述" class="form-control" id="item_describe">
                    <button class="btn btn-outline-secondary" type="button" @click="uploadIdea()" id="submit_upload">提交灵感菇</button>
                </div>
            </td>
        </tr>
    </table>
    <div>
        <p id="vote_statuse"></p>
    </div>
</template>


<style scoped lang="scss">
$trHeight:40px;

tr>td>p{
    width: 100%;
    text-align: center;
    line-height: $trHeight;
    margin: 0;
}
table{
    text-align: center;
    border-collapse: collapse;
    width: 80%;
    margin: 0 auto;
}
tr{
    height: $trHeight;
}
#vote_statuse{
    color: rgb(216, 6, 6);
    text-align: center;
}
#submit_upload{
    background-color: rgb(153, 224, 120);
    color: #474747;
}
</style>