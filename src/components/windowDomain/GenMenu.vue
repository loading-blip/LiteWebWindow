<script setup>
    import { GenerateWindow,addToTaskBar} from '../../assets/js/EventRegistrationTool/window.js'
    import inputFilter from '../function/selectFilter.vue'

    const props = defineProps({
        data: {
            type: null,
            default: ''
        }
    });
    //遍历有哪些模板
    const Window = import.meta.glob('../*');
    var windowTemplate = [];
    var windowDomain =[];
    for (const path in Window) {
        windowTemplate.push(path.substring(path.lastIndexOf('/')+1).slice(0,-4));
    }
    const Domain = import.meta.glob('./*');
    for (const path in Domain) {
        windowDomain.push(path.substring(path.lastIndexOf('/')+1).slice(0,-4));
    }
    console.log(windowTemplate);
    windowTemplate.splice(windowTemplate.indexOf('StartMenu'),1)
</script>
<script>

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
            "minimized":document.getElementById('minimized').checked,
            "data":null
            };
            const allWindow = document.getElementsByClassName('window');
            
            let windowNameList = [];
            for(let i=0;i<allWindow.length;i++){
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
                    <inputFilter
                        :options="windowTemplate"
                        :placeholder="'Template'"
                        :id="'TemplateName'"
                    />
                    <inputFilter
                        :options="windowDomain"
                        :placeholder="'Domain'"
                        :id="'DomainName'"
                    />
                    <!-- <input type="text" class="form-control" placeholder="Template" aria-label="Template" aria-describedby="GenerateButton" id="TemplateName">
                    <input type="text" class="form-control" placeholder="Domain" aria-label="Domain" aria-describedby="GenerateButton" id="DomainName"> -->
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

</style>