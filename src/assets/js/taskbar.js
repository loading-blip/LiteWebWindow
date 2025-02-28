var maxZIndex = 0;
document.addEventListener('loadComplete', (event) => {
    //window
    console.log(document.body);
    const draggableHandles = document.querySelectorAll('.draggable-handle');
    console.log(draggableHandles);
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
                document.body.style.userSelect = ''; // Allow text selection again
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', stopDrag);
        }

        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
    });

    const draggableContainers = document.querySelectorAll('.draggable-container');
    draggableContainers.forEach(container => {
        container.addEventListener('mousedown', () => {
            // Bring the clicked container to the front
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
        container.addEventListener('touchstart', () => {
            // Bring the touched container to the front
            maxZIndex = Math.max(...Array.from(draggableContainers).map(c => parseInt(window.getComputedStyle(c).zIndex) || 1));
            container.style.zIndex = maxZIndex + 1;
        });
    });

    // Close window button
    const closeButtons = document.querySelectorAll('.closeWindow');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement.parentElement;
            var taskListid = container.id.split('_')[0];
            container.style.display = 'none';
            document.getElementById(taskListid).classList.remove('pressedLabel');
            document.getElementById(taskListid).classList.add('normalLabel');
        });
    });
});