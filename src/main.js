import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)

var taskList = {
    "task1": "domain",
    "task2": "domain",
};
app.config.globalProperties.$taskList = taskList;

function addTask(taskName) {
    // taskName = taskName.replace(' ', '_');
    const taskBar = document.getElementById('taskBar').querySelector('ul');
    var task = document.createElement('li');
    task.innerHTML = taskName;
    task.id = taskName;
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

document.addEventListener('DOMContentLoaded', (event) => {
    for(const task in taskList) {
        addTask(task);
    }
});

app.mount('#app')