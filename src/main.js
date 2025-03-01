import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



const app = createApp(App)

//此变量整改中
var taskList = {
    "公告": "noticeBoard",
    "task2": "example",
};
app.config.globalProperties.$taskList = taskList;

/**
 * 添加任务栏标签
 * @param {string} taskName - 任务名称
 * @returns {void}
 */
function addTask(taskName) {    
    // taskName = taskName.replace(' ', '_');
    const taskBar = document.getElementById('taskBar').querySelector('ul');
    var task = document.createElement('li');
    task.innerHTML = `<a>${taskName}</a>`;
    task.id = taskName;
    //下次还是用jquery的toggleClass()吧
    task.classList.add('taskList',"normalLabel");
    task.addEventListener('click', () => {
        if (task.classList.contains('normalLabel')) {
            task.classList.remove('normalLabel');
            task.classList.add('pressedLabel');
            document.getElementById(taskName+'_Window').style.display = 'block';
        } else {
            task.classList.add('normalLabel');
            document.getElementById(taskName+'_Window').style.display = 'none';
        }
    });
    taskBar.appendChild(task);
}
//dom加载完后将taskList中的名称添加到taskBar中
document.addEventListener('DOMContentLoaded', (event) => {
    for(const task in taskList) {
        addTask(task);
    }
});

app.mount('#app')