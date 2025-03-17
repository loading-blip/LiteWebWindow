<script setup>
import $ from 'jquery'
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
</script>


<script>
export default {
    methods: {
        uploadIdea(){
            let uploadData = {
                'item_name':$('#item_name').val(),
                'uploader':$('#uploader').val(),
                'item_describe':$('#item_describe').val(),
            }
            if (Object.values(uploadData).includes('uploadData')){
                $('#vote_statuse').show();
                $('#vote_statuse').text('请好好的填满它');
            }
            else{
                $('#vote_statuse').hide();
            }
            $.ajax({
                url: '/upload_idea',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(uploadData),
                dataType: 'json',
                success: function(response) {
                    console.log('Response received:', response);
                    // var responseData = response;
                    // createExpressWindow(responseData)
                    // $('#quertStatus').text('');
                    // $('#quertStatus').hide();
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    // $('#quertStatus').text('网络错误');
                    // $('#quertStatus').show();
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
                    if (status==='max_vote'){
                        $('#vote_statuse').show();
                        $('#vote_statuse').text('已达到投票最大限制');
                    }
                    else{
                        $('#vote_statuse').hide();
                    }
                    
                    // var responseData = response;
                    // createExpressWindow(responseData)
                    // $('#quertStatus').text('');
                    // $('#quertStatus').hide();
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    // $('#quertStatus').text('网络错误');
                    // $('#quertStatus').show();
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        查看
                    </button>
                        <!-- Modal -->
                    <teleport to="body">
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">描述</h1>
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
            <td><input class="btn" value="vote" type="button" @click="vote(row[0])" :id="'vote_button'+row[0]"></td>
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
                    <button class="btn btn-outline-secondary" type="button" @click="uploadIdea()">提交灵感菇</button>
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
</style>