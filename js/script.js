// script.js – DateDock Main Orchestrator

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DateDock initialized.");

  // Optional: Highlight today's column
  highlightToday();

  // Optional: Add event listener for Clear All Tasks button
  const clearBtn = document.getElementById('clear-tasks');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Clear all tasks for the week?")) {
        localStorage.removeItem('datedock_tasks');
        location.reload(); // reload to trigger re-seed or clear view
      }
    });
  }

  // Optional: Theme toggle
  const themeToggle = document.getElementById('toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }
});

// 🔍 Highlight today's column based on day name
function highlightToday() {
  const todayIndex = new Date().getDay(); // 0 = Sunday
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = weekdays[todayIndex];

  const todayCol = document.querySelector(`.day-column[data-day="${todayName}"]`);
  if (todayCol) {
    todayCol.classList.add('today');
  }
}

