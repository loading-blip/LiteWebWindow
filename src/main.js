import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { addToTaskBar } from './assets/js/EventRegistrationTool/window.js'
import $ from 'jquery'



var taskList = {
    "公告": {"window":"windowTemplate",
            "windowDomain": "noticeBoard",
            "sizeW": "500px",
            "sizeH": "500px",
            "minimized": false,
            "allowMinimized": true,
            "allowStretchX": true,
            "allowStretchY": true,
            "allowClose": true,
            "allowDrag": true,
            "data":''},

    "task2": {"window":"windowTemplate",
                "windowDomain": "example",
                "sizeW": "400px",
                "sizeH": "200px",
                "minimized": true,
                "allowMinimized": true,
                "allowStretchX": true,
                "allowStretchY": true,
                "allowClose": true,
                "allowDrag": true,
                "data":''},
};



//dom加载完后将taskList中的名称添加到taskBar中
document.addEventListener('DOMContentLoaded', (event) => {
    //开始菜单事件注册
    $('#StartIcon').addClass("normalLabel");
    $('#StartIcon').on('click', () => {
        if ($('#StartMenu').css('display') === 'none' || $('#StartMenu').css('display') === '') {
            $('#StartMenu').show();
        } else {
            $('#StartMenu').hide();
        }
        $('#StartIcon').toggleClass('normalLabel pressedLabel');
    });
    //初始窗口注册
    for(let task in taskList) {
        addToTaskBar(task,!taskList[task]['minimized']);
    }
});

const app = createApp(App)
app.config.globalProperties.$taskList = taskList;
app.mount('#app')