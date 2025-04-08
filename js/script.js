// script.js – DateDock Main Orchestrator

document.addEventListener('DOMContentLoaded', () => {
  notifyTodaysTasks();
  highlightToday();
  setupThemeToggle();
  setupClearButton();
});

// 📣 Show alert with today’s tasks
function notifyTodaysTasks() {
  const dayIndex = new Date().getDay(); // 0 = Sunday
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = weekdays[dayIndex];

  const list = document.getElementById(`list-${today}`);
  if (!list) return;

  const tasks = Array.from(list.querySelectorAll('li span')).map(el => el.textContent.trim());
  
  if (tasks.length) {
    alert(`🗓️ Today is ${today}!\nYou have ${tasks.length} task(s):\n\n• ${tasks.join('\n• ')}`);
  } else {
    alert(`🗓️ Today is ${today}.\nYou have no tasks scheduled. Nice!`);
  }
}

// ✨ Highlight today’s column
function highlightToday() {
  const todayIndex = new Date().getDay();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = weekdays[todayIndex];

  const todayCol = document.querySelector(`.day-column[data-day="${todayName}"]`);
  if (todayCol) {
    todayCol.classList.add('today');
  }
}

// 🌗 Theme toggle logic
function setupThemeToggle() {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  // Apply saved theme
  const savedTheme = localStorage.getItem('datedock-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('datedock-theme', newTheme);
  });
}

// 🧼 Clear all tasks
function setupClearButton() {
  const clearBtn = document.getElementById('clear-tasks');
  if (!clearBtn) return;

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks for the week?')) {
      localStorage.removeItem('datedock-tasks');
      location.reload();
    }
  });
}