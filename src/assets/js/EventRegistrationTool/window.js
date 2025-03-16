import { createApp,defineAsyncComponent} from "vue";
import $ from 'jquery'

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
 * @param {boolean} defaultActiveState - 默认状态
 * @returns {void}
 */
export function addToTaskBar(taskName,defaultActiveState=false) {
    var task = $('<li>',{
        id:taskName,
        class:`${'taskList'} ${defaultActiveState?"pressedLabel":"normalLabel"}`
    }).on('click', () => {
        if (task.hasClass('normalLabel')) {
            $(`#${taskName}_Window`).show();
        } else {
            $(`#${taskName}_Window`).hide();
        }
        task.toggleClass('normalLabel pressedLabel');
    });
    task.append($('<a>').text(taskName));
    $('#taskBar>ul').append(task);
}

/**
 * 创建window组件
 * @param {string} attr - 窗口属性
 * @returns {void}
 */
export function GenerateWindow(attr){
    const components = import.meta.glob('../../../components/*.vue');
    const componentPath = `../../../components/${attr['TemplateName']}.vue`;
    if (components[componentPath]) {
        const app = createApp(defineAsyncComponent(() => components[componentPath]()),{
                    windowTitle: attr['WindowName'],  
                    windowDomain: attr['DomainName'],
                    windowWidth: attr['WindowWidth'],
                    windowHeight: attr['WindowHeight'],
                    allowStretch: attr['allowStretch'],
                    minimized: attr['minimized'],
                    allowMinimized: attr['allowMinimize'],
                    allowClose: attr['allowClose'],
                    allowDrag: attr['allowDrag'],
                    data:attr['data']
                    });
        
        const instance = app.mount(document.createElement('div'));
        $('#newWindowArea').append(instance.$el);
        // let translateAttr = {}
        // translateAttr[attr['WindowName']] = {"window":attr["TemplateName"],
        //                                             "windowDomain": attr['DomainName'],
        //                                             "sizeW": attr['WindowWidth'],
        //                                             "sizeH": attr['WindowHeight'],
        //                                             "minimized": attr['minimized'],
        //                                             "allowMinimized": attr['allowMinimize'],
        //                                             "allowStretch": attr['allowStretch'],
        //                                             "allowClose": attr['allowClose'],
        //                                             "allowDrag": attr['allowDrag']
        // }
    }
    else{
        console.error(`no such component:${componentPath}`);
    }
}