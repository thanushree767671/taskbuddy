function ProgressTracker({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="progress-container">
      <h2>Progress</h2>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>
        {completedTasks} of {totalTasks} tasks completed
      </p>

      <strong>{progress}% Complete</strong>
    </div>
  );
}

export default ProgressTracker;