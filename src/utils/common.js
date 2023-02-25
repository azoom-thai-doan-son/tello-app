export function getRandomId() {
  return Math.floor(Math.random() * 1000000)
}

export function getItemFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setItemToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getTasksByBoardId(boardId) {
  const allTasks = getItemFromStorage('tasks') ?? [];
  const tasks = allTasks.filter(
    (task) => task.boardId === boardId
  );
  return tasks
}
