// tasks.js
import { saveAllTasks, loadSavedTasks } from './storage.js';
import { makeTaskDraggable } from './dragdrop.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage or fallback
  loadAllTasks();

  // Setup add-task buttons
  document.querySelectorAll('.add-task-btn').forEach(button => {
    button.addEventListener('click', () => {
      const day = button.dataset.day;
      const input = document.getElementById(`input-${day}`);
      const text = input.value.trim();

      if (text) {
        const task = createTaskElement(text);
        document.getElementById(`list-${day}`).appendChild(task);
        input.value = '';
        saveAllTasks();
      }
    });
  });
});

export function createTaskElement(text) {
  const li = document.createElement('li');
  li.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      li.style.opacity = '0.5';
    } else {
      li.style.opacity = '1';
    }
    saveAllTasks();
  });

  const span = document.createElement('span');
  span.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.className = 'delete-task';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveAllTasks();
  });

  li.append(checkbox, span, delBtn);
  makeTaskDraggable(li);
  return li;
}

function loadAllTasks() {
  const saved = loadSavedTasks();

  if (saved) {
    Object.entries(saved).forEach(([day, tasks]) => {
      const list = document.getElementById(`list-${day}`);
      tasks.forEach(text => {
        const task = createTaskElement(text);
        list.appendChild(task);
      });
    });
  } else {
    fetch('data/days.json')
      .then(res => res.json())
      .then(seed => {
        Object.entries(seed).forEach(([day, tasks]) => {
          const list = document.getElementById(`list-${day}`);
          tasks.forEach(text => {
            const task = createTaskElement(text);
            list.appendChild(task);
          });
        });
        saveAllTasks(); // seed it to localStorage
      })
      .catch(err => console.error("Could not load fallback days.json:", err));
  }
}
