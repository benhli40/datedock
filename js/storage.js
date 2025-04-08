// storage.js – handles localStorage for DateDock

const STORAGE_KEY = 'datedock-tasks';

export function saveAllTasks() {
  const taskData = {};
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  days.forEach(day => {
    const list = document.getElementById(`list-${day}`);
    const tasks = Array.from(list.querySelectorAll('.task span')).map(el => el.textContent.trim());
    taskData[day] = tasks;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskData));
}

export function loadSavedTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}