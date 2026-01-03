import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [statusFilter, setStatusFilter] = useState(null);
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks(statusFilter);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Task Management System</h1>
        <p>Real-time updates with WebSocket</p>
      </header>

      <div className="container">
        <div className="sidebar">
          <TaskForm onSubmit={createTask} />

          <div className="filters">
            <h3>Filter by Status</h3>
            <button
              className={statusFilter === null ? "active" : ""}
              onClick={() => setStatusFilter(null)}
            >
              All Tasks
            </button>
            <button
              className={statusFilter === "pending" ? "active" : ""}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={statusFilter === "in-progress" ? "active" : ""}
              onClick={() => setStatusFilter("in-progress")}
            >
              In Progress
            </button>
            <button
              className={statusFilter === "completed" ? "active" : ""}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <main className="main-content">
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
