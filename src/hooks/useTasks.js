import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSocket } from "./useSocket";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useTasks = (statusFilter = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useSocket();

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

  // Create task with optimistic update
  const createTask = async (taskData) => {
    const tempId = Date.now();
    const optimisticTask = {
      id: tempId,
      ...taskData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Optimistic update
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      // Replace optimistic task with real one
      setTasks((prev) =>
        prev.map((task) => (task.id === tempId ? response.data.data : task))
      );
      return response.data.data;
    } catch (err) {
      // Rollback on error
      setTasks((prev) => prev.filter((task) => task.id !== tempId));
      setError(err.message);
      throw err;
    }
  };

  // Update task with optimistic update
  const updateTask = async (id, updates) => {
    const previousTasks = [...tasks];

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    );

    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
      // Update with server response
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data.data : task))
      );
      return response.data.data;
    } catch (err) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message);
      throw err;
    }
  };

  // Delete task with optimistic update
  const deleteTask = async (id) => {
    const previousTasks = [...tasks];

    // Optimistic update
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (err) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message);
      throw err;
    }
  };

  // Setup WebSocket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("task:created", (newTask) => {
      setTasks((prev) => {
        // Avoid duplicates (optimistic update might have added it)
        const exists = prev.some((task) => task.id === newTask.id);
        if (exists) {
          return prev.map((task) => (task.id === newTask.id ? newTask : task));
        }
        return [newTask, ...prev];
      });
    });

    socket.on("task:updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    socket.on("task:deleted", ({ id }) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [socket]);

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
