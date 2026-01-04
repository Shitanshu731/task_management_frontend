import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskTable from "./TaskTable";
import { TaskItemSkeleton } from "./Skeleton";
import "./TaskList.css";

const TaskList = ({ tasks, loading, error, onUpdate, onDelete }) => {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'table'

  // Calculate task counts by status
  const getTaskCounts = () => {
    const pending = tasks.filter((t) => t.status === "pending").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    return { pending, inProgress, completed };
  };

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

  const counts = getTaskCounts();

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks ({tasks.length})</h2>
        <div className="header-right">
          <div className="task-counts">
            <div className="count-item count-pending">
              <span className="count-icon">⏳</span>
              <span className="count-value">{counts.pending}</span>
            </div>
            <div className="count-item count-progress">
              <span className="count-icon">🔄</span>
              <span className="count-value">{counts.inProgress}</span>
            </div>
            <div className="count-item count-completed">
              <span className="count-icon">✅</span>
              <span className="count-value">{counts.completed}</span>
            </div>
          </div>
          <div className="view-selector">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="view-select"
            >
              <option value="list">📋 List View</option>
              <option value="table">📊 Table View</option>
            </select>
          </div>
        </div>
      </div>

      {viewMode === "list" ? (
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
      ) : (
        <TaskTable tasks={tasks} onUpdate={onUpdate} onDelete={onDelete} />
      )}
    </div>
  );
};

export default TaskList;
