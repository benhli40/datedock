document.addEventListener('DOMContentLoaded', () => {
  loadAllTasks();

  // Add task buttons for each day
  document.querySelectorAll('.add-task-btn').forEach(button => {
    button.addEventListener('click', () => {
      const day = button.dataset.day;
      const input = document.querySelector(`#input-${day}`);
      const text = input.value.trim();

      if (text) {
        const taskEl = createTaskElement(text);
        document.querySelector(`#list-${day}`).appendChild(taskEl);
        input.value = '';
        saveAllTasks();
      }
    });
  });
});

// 🔧 Create a task <li> element
function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task';

  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      alert("✅ This task is done.");
    }
  });

  // Create task label
  const span = document.createElement('span');
  span.textContent = text;

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.className = 'delete-task';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveAllTasks();
  });

  // Append all elements
  li.append(checkbox, span, delBtn);
  makeTaskDraggable(li); // your existing drag/drop function

  return li;
}

// 💾 Save all tasks into localStorage
function saveAllTasks() {
  const allData = {};
  document.querySelectorAll('.day-column').forEach(col => {
    const day = col.dataset.day;
    const tasks = [];
    col.querySelectorAll('.task-list .task').forEach(task => {
      const text = task.firstChild.textContent.trim(); // avoid 🗑
      if (text) tasks.push(text);
    });
    allData[day] = tasks;
  });
  localStorage.setItem('datedock_tasks', JSON.stringify(allData));
}

// 📥 Load from localStorage OR days.json fallback
function loadAllTasks() {
  const saved = JSON.parse(localStorage.getItem('datedock_tasks'));

  if (saved) {
    Object.entries(saved).forEach(([day, tasks]) => {
      const list = document.querySelector(`#list-${day}`);
      if (!list) return;
      tasks.forEach(text => {
        const taskEl = createTaskElement(text);
        list.appendChild(taskEl);
      });
    });
  } else {
    // Load seeded data from days.json
    fetch('data/days.json')
      .then(res => res.json())
      .then(seed => {
        Object.entries(seed).forEach(([day, tasks]) => {
          const list = document.querySelector(`#list-${day}`);
          if (!list) return;
          tasks.forEach(text => {
            const taskEl = createTaskElement(text);
            list.appendChild(taskEl);
          });
        });
        saveAllTasks(); // store seed into localStorage
      })
      .catch(err => {
        console.error("Failed to load fallback data:", err);
      });
  }
}
