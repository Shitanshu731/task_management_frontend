import TaskItem from "./TaskItem";
import { TaskItemSkeleton } from "./Skeleton";
import "./TaskList.css";

const TaskList = ({ tasks, loading, error, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="task-list">
        <h2>Loading tasks...</h2>
        <div className="tasks-container">
          <TaskItemSkeleton />
          <TaskItemSkeleton />
          <TaskItemSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        No tasks found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
