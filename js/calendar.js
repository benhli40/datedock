document.addEventListener('DOMContentLoaded', () => {
  const daysContainer = document.getElementById('calendar');
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  weekdays.forEach(day => {
    const column = document.createElement('div');
    column.classList.add('day-column');
    column.dataset.day = day;

    column.innerHTML = `
      <h3>${day}</h3>
      <ul class="task-list" id="list-${day}"></ul>
      <input type="text" id="input-${day}" placeholder="Add a task..." />
      <button class="add-task-btn" data-day="${day}">Add</button>
    `;

    daysContainer.appendChild(column);
  });
});
