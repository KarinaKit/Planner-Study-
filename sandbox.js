const element = document.querySelector('.prioritySelect');
const choices = new Choices(element);


function addTask() {
    const taskText = document.querySelector('.task-input');
    const taskPriority = document.querySelector('#prioritySelect');

    if(taskText.value.trim() === '') {
        alert('Напишите задачу');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText.value,
        prioritet: taskPriority.value,
        isDone: false
    }

    const allTask = JSON.parse(localStorage.getItem('myTasks')) || [];
    
    allTask.push(task);

    localStorage.setItem('myTasks', JSON.stringify(allTask));

    taskText.value = ''

    renderTask();
}

function renderTask() {
    const allTask = JSON.parse(localStorage.getItem('myTasks')) || [];

    const tableTbody = document.querySelector('#taskTableBody');

    tableTbody.innerHTML = ""

    allTask.forEach((task) => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${task.text}</td>
        <td>${task.prioritet}</td>
        <td>${task.isDone ? 'Готово' : 'В процесе'}</td>
        <td><button class="deleteBtn" onclick="deleteTask(${task.id})">🗑️</button></td>
        `;

        tableTbody.appendChild(row);
    });
}


function deleteTask(id) {
    let allTask = JSON.parse(localStorage.getItem('myTasks')) || [];

    allTask = allTask.filter(task => task.id !== id);

    localStorage.setItem('myTasks', JSON.stringify(allTask));

    renderTask();
}

renderTask();

function updateSchedule() {
    const dateInput = document.querySelector('.date-input');
    const taskList = document.querySelector('.task-item');
    
    if (!dateInput.value) return;

    const date = new Date(dateInput.value);
    const dayOfWeek = date.getDay();

    taskList.innerHTML = "";

    // 0 - Воскресенье, 6 - Суббота
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        taskList.innerHTML = `
            <li class="item-list">Математика</li>
            <li class="item-list">Английский</li>
            <li class="item-list">Английский</li>
            <li class="item-list">TypeScript</li>
        `;
    } else if (dayOfWeek === 3 || dayOfWeek === 5) {
        taskList.innerHTML = `<h3 class="subtitle">Сегодня занятий нет</h3>`;
    } else {
        taskList.innerHTML = `
            <li class="item-list">Математика</li>
            <li class="item-list">Английский</li>
            <li class="item-list">Английский</li>
        `;
    }
}

document.querySelector('.date-input').addEventListener('change', updateSchedule);


document.querySelector('.addBtn').addEventListener('click', addTask);

flatpickr(".date-input", {
    dateFormat: "d.m.Y",
    
    onChange: function(selectedDates, dateStr) {
        console.log("Выбрана дата:", dateStr);
        updateSchedule();
    }
});

flatpickr(".date-input", {
    altInput: true,
    altFormat: "d.m.Y",    
    dateFormat: "Y-m-d",
    "locale": "ru",
    onChange: function() {
        updateSchedule();
    }
});
