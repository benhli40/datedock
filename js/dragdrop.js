// dragdrop.js
import { saveAllTasks } from './storage.js';

export function makeTaskDraggable(taskEl) {
  taskEl.setAttribute('draggable', true);
  taskEl.id ||= `task-${Date.now() + Math.floor(Math.random() * 1000)}`;

  taskEl.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', taskEl.id);
    taskEl.classList.add('dragging');
  });

  taskEl.addEventListener('dragend', () => {
    taskEl.classList.remove('dragging');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup each day's column as a drop zone
  document.querySelectorAll('.day-column').forEach(column => {
    column.addEventListener('dragover', e => e.preventDefault());

    column.addEventListener('drop', e => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('text/plain');
      const task = document.getElementById(taskId);
      if (task && column.querySelector('.task-list')) {
        column.querySelector('.task-list').appendChild(task);
        saveAllTasks();
      }
    });
  });
});

