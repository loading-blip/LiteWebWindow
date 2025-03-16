<script setup>
    import { GenerateWindow,addToTaskBar,allWindowNameList} from '../../assets/js/EventRegistrationTool/window.js'
    import inputFilter from '../function/selectFilter.vue'
    import $ from 'jquery'

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
    //剔除startmenu
    console.log(windowTemplate.indexOf('StartMenu'))
    console.log(windowTemplate.splice(windowTemplate.indexOf('StartMenu')))
    windowTemplate.splice(windowTemplate.indexOf('StartMenu'),windowTemplate.indexOf('StartMenu'));
</script>
<script>

export default {
    methods: {
        Generate(){
            const windowAttr = {
            "WindowName":$('#WindowName').val(),
            "TemplateName":$('#TemplateName').val(),
            "DomainName":$('#DomainName').val(),
            "WindowWidth":$('#WindowWidth').val(),
            "WindowHeight":$('#WindowHeight').val(),
            "allowDrag":$('#allowDrag').is (":checked"),
            "allowMinimize":$('#allowMinimize').is (":checked"),
            "allowStretch":$('#allowStretch').is (":checked"),
            "allowClose":$('#allowClose').is (":checked"),
            "minimized":$('#minimized').is (":checked"),
            "data":null
            };
            const isWindowExist = allWindowNameList().some(element => element === windowAttr['WindowName']);
            if (isWindowExist){
                $('#genStateOutput').html('<p style="color:red">窗口已存在</p>');
                return;
            }
            $('#genStateOutput').html('');
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