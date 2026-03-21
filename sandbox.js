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
            <li class="item-list"><a href="#" id="mathBtn">Математика</a></li>
            <li class="item-list"><a href="#" id="engBtn">Английский</a></li>
            <li class="item-list"><a href="#" id="engBtn">Английский</a></li>
            <li class="item-list"><a href="https://go.skillbox.ru/profession/profession-frontend-develop/typescript-and-developer-tools" target="_blank" id="tpsBtn">TypeScript</a></li>
        `;
    } else if (dayOfWeek === 3 || dayOfWeek === 5) {
        taskList.innerHTML = `<h3 class="subtitle">Сегодня занятия только 30 мин. в Doulingo</h3>`;
    } else {
        taskList.innerHTML = `
            <li class="item-list"><a href="#" id="mathBtn">Математика</a></li>
            <li class="item-list"><a href="#" id="engBtn">Английский</a></li>
            <li class="item-list"><a href="#" id="engBtn">Английский</a></li>
        `;
    }

    // tpsBtn.style.color = '#724261';
    // tpsBtn.style.textDecoration = 'none';
    
    document.querySelectorAll('#mathBtn').forEach((mathBtn => {
        if(mathBtn) {
            mathBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const ulPlan = document.querySelector('.plan-study');

                if (ulPlan.style.display === 'none') {
                    ulPlan.style.display = 'block'
                } else {
                    ulPlan.style.display = 'none'
                }
            });
        }

    }))

    document.querySelectorAll('#engBtn').forEach((mathBtn => {
        if(mathBtn) {
            mathBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const ulPlan = document.querySelector('.plan-studyEng');

                if (ulPlan.style.display === 'none') {
                    ulPlan.style.display = 'block'
                } else {
                    ulPlan.style.display = 'none'
                }
            });
        }
    }))

    loadMathStatus();
}



document.querySelectorAll('.item-math').forEach((itemMath => {
    if(itemMath) {
        itemMath.addEventListener('click', function (e) {
        if(itemMath.style.textDecoration === 'none') {
            itemMath.style.textDecoration = 'line-through'
        } else {
            itemMath.style.textDecoration = 'none';
        }
        saveMathStatus();
    });
    }
}));

function saveMathStatus () {
    const items = document.querySelectorAll('.item-math');

    const statusArray = Array.from(items).map(item => item.style.textDecoration === 'line-through');
    localStorage.setItem('mathTopicsStatus', JSON.stringify(statusArray));
}

function loadMathStatus() {
    const savedStatus = JSON.parse(localStorage.getItem('mathTopicsStatus'));
    if(savedStatus) {
        const items = document.querySelectorAll('.item-math');
        items.forEach((item, index) => {
            if(savedStatus[index]) {
                item.style.textDecoration = 'line-through';
            }
        });
    }
}

loadMathStatus();


document.querySelector('.date-input').addEventListener('change', updateSchedule);


document.querySelector('.addBtn').addEventListener('click', addTask);


flatpickr(".date-input", {
    altInput: true,
    altFormat: "d.m.Y",    
    dateFormat: "Y-m-d",
    locale: "ru",
    onChange: function() {
        updateSchedule();
    }
});