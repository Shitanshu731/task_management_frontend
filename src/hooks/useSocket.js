import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const useSocket = () => {
  const socketRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to WebSocket server");

      // Generate username from localStorage or create new
      let username = localStorage.getItem("taskflow_username");
      if (!username) {
        username = `User-${Math.random().toString(36).substring(2, 8)}`;
        localStorage.setItem("taskflow_username", username);
      }

      const colors = [
        "#6366f1",
        "#ec4899",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#14b8a6",
        "#f97316",
      ];
      const color =
        localStorage.getItem("taskflow_color") ||
        colors[Math.floor(Math.random() * colors.length)];
      localStorage.setItem("taskflow_color", color);

      const userData = { username, color };
      setCurrentUser({ ...userData, socketId: socketRef.current.id });

      // Identify user to server
      socketRef.current.emit("user:identify", userData);
    });

    socketRef.current.on("users:list", (users) => {
      setConnectedUsers(users);
    });

    socketRef.current.on("user:connected", (user) => {
      console.log(`👤 ${user.username} joined`);
    });

    socketRef.current.on("user:disconnected", (user) => {
      console.log(`👋 ${user.username} left`);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket server");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    currentUser,
    connectedUsers,
  };
};
