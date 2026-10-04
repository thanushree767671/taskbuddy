import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressTracker from "./components/ProgressTracker";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskbuddy-tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "taskbuddy-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const editTask = (id) => {
    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) return;

    const newTitle = prompt(
      "Edit task:",
      task.title
    );

    if (newTitle === null) return;

    if (!newTitle.trim()) return;

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle.trim(),
            }
          : task
      )
    );
  };

  const clearAllTasks = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmed) {
      setTasks([]);
    }
  };

  return (
    <div className="app">

      <header className="app-header">
        <h1>TaskBuddy</h1>

        <p>
          Organize your tasks and stay productive.
        </p>
      </header>

      <main className="container">

        <TaskForm
          onAddTask={addTask}
        />

        <ProgressTracker
          tasks={tasks}
        />

        <div className="task-header">

          <h2>My Tasks</h2>

          {tasks.length > 0 && (
            <button
              className="clear-button"
              onClick={clearAllTasks}
            >
              Clear All
            </button>
          )}

        </div>

        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />

      </main>

    </div>
  );
}

export default App;