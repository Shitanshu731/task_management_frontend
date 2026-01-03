import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useTasks = (statusFilter = null, socket = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Axios interceptor to add socket ID to requests
  useEffect(() => {
    if (socket) {
      const interceptor = axios.interceptors.request.use((config) => {
        config.headers["x-socket-id"] = socket.id;
        return config;
      });

      return () => axios.interceptors.request.eject(interceptor);
    }
  }, [socket]);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const url = statusFilter
        ? `${API_URL}/tasks?status=${statusFilter}`
        : `${API_URL}/tasks`;

      const response = await axios.get(url);
      setTasks(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update task with optimistic update
  const updateTask = async (id, updates) => {
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    );

    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data.data : task))
      );
      return response.data.data;
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
      throw err;
    }
  };

  // Delete task with optimistic update
  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
      throw err;
    }
  };

  // Setup WebSocket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("task:created", (newTask) => {
      if (!statusFilter || newTask.status === statusFilter) {
        setTasks((prev) => {
          const exists = prev.some((task) => task.id === newTask.id);
          if (exists) return prev;
          return [newTask, ...prev];
        });
      }
    });

    socket.on("task:updated", (updatedTask) => {
      setTasks((prev) => {
        if (statusFilter && updatedTask.status !== statusFilter) {
          return prev.filter((task) => task.id !== updatedTask.id);
        }
        return prev.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    });

    socket.on("task:deleted", ({ id }) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [socket, statusFilter]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
