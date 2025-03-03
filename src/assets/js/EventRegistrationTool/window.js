/**
 * 注册窗口最小化按钮事件
 * @param {Object} MinimizeButtons - 最小化按钮
 */
export function RegMinimizeWindowButton(MinimizeButtons){
    MinimizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement.parentElement;
            var taskListid = container.id.split('_')[0];
            container.style.display = 'none';
            document.getElementById(taskListid).classList.remove('pressedLabel');
            document.getElementById(taskListid).classList.add('normalLabel');
        });
    });
}
/**
 * 注册窗口关闭按钮事件
 * @param {Object} closeButtons - 最小化按钮
 */
export function RegCloseWindowButton(closeButtons){
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement.parentElement;
            var taskListid = container.id.split('_')[0];
            container.remove();
            document.getElementById(taskListid).remove();
        });
    });
}
/**
 * 注册窗口拖拽事件
 * @param {Object} draggableHandles - 拖拽手柄
 */
export function RegDraggableHandles(draggableHandles){
    draggableHandles.forEach(handle => {
        let currentContainer, offsetX, offsetY;

        function startDrag(e) {
            currentContainer = handle.parentElement;
            offsetX = (e.clientX || e.touches[0].clientX) - currentContainer.offsetLeft;
            offsetY = (e.clientY || e.touches[0].clientY) - currentContainer.offsetTop;
            document.body.style.userSelect = 'none'; // Prevent text selection

            function onMove(e) {
                currentContainer.style.left = `${(e.clientX || e.touches[0].clientX) - offsetX}px`;
                currentContainer.style.top = `${(e.clientY || e.touches[0].clientY) - offsetY}px`;
            }

            function stopDrag() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchmove', onMove);
                document.removeEventListener('touchend', stopDrag);
                document.body.style.userSelect = '';
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', stopDrag);
        }

        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
    });
}

/**
 * 添加任务栏标签
 * @param {string} taskName - 任务名称
 * @returns {void}
 */
export function addToTaskBar(taskName) {    
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

