import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { addToTaskBar } from './assets/js/EventRegistrationTool/window.js'
import $ from 'jquery'

const app = createApp(App)

var taskList = {
    "公告": {"window":"windowTemplate",
            "windowDomain": "noticeBoard",
            "sizeW": "900px",
            "sizeH": "600px",
            "minimized": true,
            "allowMinimized": true,
            "allowStretch": true,
            "allowClose": true,
            "allowDrag": true},

    "task2": {"window":"windowTemplate",
                "windowDomain": "example",
                "sizeW": "400px",
                "sizeH": "200px",
                "minimized": true,
                "allowMinimized": true,
                "allowStretch": true,
                "allowClose": true,
                "allowDrag": true},
};
app.config.globalProperties.$taskList = taskList;


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
    for(const task in taskList) {
        addToTaskBar(task);
    }
});

app.mount('#app')