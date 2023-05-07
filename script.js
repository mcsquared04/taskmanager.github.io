// Get current page URL
const currentPage = window.location.pathname;

// Get unique identifier for HTML page
const pageId = currentPage.replace(/\.html$/, '');

// Load saved background color from localStorage
const bgColor = localStorage.getItem(`bgColor-${pageId}`);

// Set background color to saved color
if (bgColor) {
  document.body.style.backgroundColor = bgColor;
}

// Background color change
document.querySelectorAll('.bg-color').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const color = this.getAttribute('data-color');
    document.body.style.backgroundColor = color;
    localStorage.setItem(`bgColor-${pageId}`, color);

    // Update the background color on all pages
    const pages = ['/index.html', '/monday.html', '/tuesday.html', '/wednesday.html', '/thursday.html', '/friday.html', '/saturday.html', '/sunday.html'];
    pages.forEach(function(page) {
      if (page !== currentPage) {
        const pageId = page.replace(/\.html$/, '');
        localStorage.setItem(`bgColor-${pageId}`, color);
        // Send a message to the other pages to update their background color
        const otherWindow = window.open(page, '_blank');
        otherWindow.postMessage({ type: 'setBackgroundColor', color }, '*');
      }
    });
  });
});

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem(`tasks-${pageId}`)) || [];

// Load task counter from localStorage
let taskCounter = parseInt(localStorage.getItem(`taskCounter-${pageId}`)) || 0;

// Render tasks in task list
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  // Sort tasks by deadline
  tasks.sort((a, b) => new Date(a.time) - new Date(b.time));

  tasks.forEach(function(task, index) {
    const li = document.createElement('li');
    const now = new Date();
    const deadline = new Date(task.time);
    const timeDiff = deadline.getTime() - now.getTime();
    const secondsRemaining = Math.floor(timeDiff / 1000);
    const minutesRemaining = Math.floor(secondsRemaining / 60);
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    const daysRemaining = Math.floor(hoursRemaining / 24);

    let timerText;
    if (timeDiff <= 0) {
      timerText = 'Task overdue';
    } else {
      const remainingHours = hoursRemaining % 24;
      const remainingMinutes = minutesRemaining % 60;
      const remainingSeconds = secondsRemaining % 60;
      timerText = `(${daysRemaining} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds remaining)`;
    }

    li.innerHTML = `
      <span>${task.name}</span>
      <span class="timer" data-time="${task.time}">${timerText}</span>
      <button class="remove-task" data-index="${index}">X</button>
    `;
    taskList.appendChild(li);
  });
}

// Add new task to task list
function addTask(name, time) {
  const task = { name, time };
  tasks.push(task);
  localStorage.setItem(`tasks-${pageId}`, JSON.stringify(tasks));
  renderTasks();
}

document.addEventListener('DOMContentLoaded', function() {
  tasks = JSON.parse(localStorage.getItem(`tasks-${pageId}`)) || [];
  taskCounter = parseInt(localStorage.getItem(`taskCounter-${pageId}`)) || 0;
  renderTasks();
});

window.addEventListener('message', function(event) {
  if (event.data.type === 'setBackgroundColor') {
    document.body.style.backgroundColor = event.data.color;
  }
});

const selectedColor = localStorage.getItem(`bgColor-${pageId}`);
if (selectedColor) {
  document.body.style.backgroundColor = selectedColor;
}