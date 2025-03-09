<script>
import { GenerateWindow,addToTaskBar } from '../../assets/js/EventRegistrationTool/window.js';


export default {
    methods: {
        Generate(){
            const genStateOutput = document.getElementById('genStateOutput');
            const windowAttr = {
            "WindowName":document.getElementById('WindowName').value,
            "TemplateName":document.getElementById('TemplateName').value,
            "DomainName":document.getElementById('DomainName').value,
            "WindowWidth":document.getElementById('WindowWidth').value,
            "WindowHeight":document.getElementById('WindowHeight').value,
            "allowDrag":document.getElementById('allowDrag').checked,
            "allowMinimize":document.getElementById('allowMinimize').checked,
            "allowStretch":document.getElementById('allowStretch').checked,
            "allowClose":document.getElementById('allowClose').checked,
            "minimized":document.getElementById('minimized').checked
            };
            const allWindow = document.getElementsByClassName('window');
            
            let windowNameList = [];
            for(let i=0;i<allWindow.length;i++){
                console.log(allWindow[i]);
                windowNameList.push(allWindow[i].id.split('_')[0]);
            }
            const isWindowExist = windowNameList.some(element => element === windowAttr['WindowName']);
            if (isWindowExist){
                genStateOutput.innerHTML='<p style="color:red">窗口已存在</p>';
                return;
            }
            genStateOutput.innerHTML='';
            GenerateWindow(windowAttr);
            addToTaskBar(windowAttr['WindowName'],(!windowAttr["minimized"]));
        }
        
    }
}
</script>


<template>
    <div id="windowGenerater">
        <div class="settingLabel"><h2>Normal</h2></div>
            <div>
                <div class="input-group mb-4">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="GenerateButton" id="WindowName">
                    <input type="text" class="form-control" placeholder="Template" aria-label="Template" aria-describedby="GenerateButton" id="TemplateName">
                    <input type="text" class="form-control" placeholder="Domain" aria-label="Domain" aria-describedby="GenerateButton" id="DomainName">
                    <button class="btn btn-outline-secondary" type="button" id="GenerateButton" @click="Generate()">Generate!</button>
                </div>
            </div>
        <div class="settingLabel"><h2>Advance</h2></div>
        <div>
            <div class="input-group">
                <span class="input-group-text">Window</span>
                <input type="text" placeholder="Width" aria-label="Width" class="form-control" id="WindowWidth">
                <input type="text" placeholder="Height" aria-label="Height" class="form-control" id="WindowHeight">
            </div>
            <div>
                <h3>Allow:</h3>
                <div class="SelectArea">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="allowDrag" checked>
                        <label class="form-check-label" for="flexCheckDefault">
                            Drag
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="allowMinimize" checked>
                        <label class="form-check-label" for="flexCheckDefault">
                            Minimize
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="allowStretch" checked>
                        <label class="form-check-label" for="flexCheckDefault">
                            Stretch
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="allowClose" checked>
                        <label class="form-check-label" for="flexCheckDefault">
                            Closed
                        </label>
                    </div>
                </div>
                <div style="clear: both;"></div>
                <div class="form-check" id="mini">
                    <input class="form-check-input" type="checkbox" value="" id="minimized">
                    <label class="form-check-label" for="flexCheckDefault">
                        Minimized
                    </label>
                </div>
            </div>
        </div>
        <div id="genStateOutput"></div>
    </div>
</template>


<style scoped lang="scss">
.settingLabel{
    padding: 5px;
    border-bottom: 1px dotted darkgray;
    margin-bottom: 20px;
    h2::before{
        content: ' ';
        width: 15px;
        height: 80%;
        border-left: 5px solid #2ca0f8;
        margin-right: 10px;
        border-radius: 2px;
    }
    h2{
        $h2height:40px;
        height: $h2height;
        line-height: $h2height;
        font-size: 1.5rem;
    }
}
h3{
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    width: 25%;
    float: left;
}
.input-group{
    margin-bottom: 20px;
}
.SelectArea{
    float: left;
    display: flex;
    flex-direction: row;
    width: 50%;
}
.form-check{
    margin-left: 20px;
}
#mini{
    width: 100px;
    margin: 0 auto;
    margin-top: 100px;
}
.input-group-text,.form-control,.btn{
    background-color: darkgray;
    border-radius: 0;
    border: 0;
    color: white;
    box-shadow: 5px 5px 0 gray;
    text-align: center;
}
.form-control::-webkit-input-placeholder{
    color: white;
    text-align: center;

}
.input-group-text,.form-control{
    border-right: 4px solid rgb(223, 223, 223);
}
.form-control:last-child{
    border: 0;
}

input[type="checkbox"]{
    border-radius: 0;
    border: 0;
    background-color: darkgray;
}
input[type="checkbox"]:focus{
    box-shadow: none;
}
input[type="checkbox"]:checked{
    background-color: gray;
}
.form-control:active{
    box-shadow: 5px 0px 0 gray;
}
.form-control:focus{
    z-index: 0;
}
#GenerateButton{
    background-color: rgb(42, 190, 79);
}
.input-group-text{
    background-color: rgb(150, 149, 149);
}
#genStateOutput{
    margin: 0 auto;
}
</style>