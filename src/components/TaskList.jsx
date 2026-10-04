function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-message">
        No tasks yet. Add your first task!
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${
            task.completed ? "completed" : ""
          }`}
        >
          <div className="task-info">
            <h3>{task.title}</h3>

            <div className="task-details">
              <span>
                Priority: {task.priority}
              </span>

              <span>
                Category: {task.category}
              </span>
            </div>
          </div>

          <div className="task-actions">
            <button
              onClick={() => onToggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() => onEditTask(task.id)}
            >
              Edit
            </button>

            <button
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;