import { useState, useEffect } from "react";
import axios from "axios";
import { useTasks } from "./hooks/useTasks";
import { useSocket } from "./hooks/useSocket";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [statusFilter, setStatusFilter] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks(statusFilter);
  const socket = useSocket();

  // Fetch all tasks for stats
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setAllTasks(response.data.data);
    } catch (err) {
      console.error("Error fetching all tasks:", err);
    }
  };

  // Initial fetch and WebSocket updates for stats
  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("task:created", () => fetchAllTasks());
    socket.on("task:updated", () => fetchAllTasks());
    socket.on("task:deleted", () => fetchAllTasks());

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [socket]);

  const getTaskStats = () => {
    const total = allTasks.length;
    const pending = allTasks.filter((t) => t.status === "pending").length;
    const inProgress = allTasks.filter(
      (t) => t.status === "in-progress"
    ).length;
    const completed = allTasks.filter((t) => t.status === "completed").length;
    return { total, pending, inProgress, completed };
  };

  const stats = getTaskStats();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">✓</span>
              <span className="logo-text">TaskFlow</span>
            </div>
            <p className="header-subtitle">Real-time task management</p>
          </div>
          <button
            className="btn-create-task"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="btn-icon">+</span>
            New Task
          </button>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card stat-progress">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="container">
        <aside className="sidebar">
          <div className="filters-section">
            <h3 className="section-title">
              <span className="title-icon">🎯</span>
              Filters
            </h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${
                  statusFilter === null ? "active" : ""
                }`}
                onClick={() => setStatusFilter(null)}
              >
                <span className="filter-icon">📋</span>
                <span>All Tasks</span>
                <span className="badge">{stats.total}</span>
              </button>
              <button
                className={`filter-btn ${
                  statusFilter === "pending" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("pending")}
              >
                <span className="filter-icon">⏳</span>
                <span>Pending</span>
                <span className="badge badge-pending">{stats.pending}</span>
              </button>
              <button
                className={`filter-btn ${
                  statusFilter === "in-progress" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("in-progress")}
              >
                <span className="filter-icon">🔄</span>
                <span>In Progress</span>
                <span className="badge badge-progress">{stats.inProgress}</span>
              </button>
              <button
                className={`filter-btn ${
                  statusFilter === "completed" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("completed")}
              >
                <span className="filter-icon">✅</span>
                <span>Completed</span>
                <span className="badge badge-completed">{stats.completed}</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {showForm && (
            <div className="form-container">
              <div className="form-header">
                <h3>Create New Task</h3>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>
              </div>
              <TaskForm
                onSubmit={(data) => {
                  createTask(data);
                  setShowForm(false);
                }}
              />
            </div>
          )}

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
