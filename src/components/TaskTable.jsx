import { useState } from "react";
import "./TaskTable.css";

const TaskTable = ({ tasks, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleSave = async (taskId) => {
    try {
      await onUpdate(taskId, editData);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ title: "", description: "", status: "" });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await onUpdate(taskId, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      case "in-progress":
        return "#3498db";
      case "completed":
        return "#27ae60";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div className="task-table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="table-row">
              {editingId === task.id ? (
                <>
                  <td data-label="Title">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="table-input"
                    />
                  </td>
                  <td data-label="Description">
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="table-textarea"
                      rows="2"
                    />
                  </td>
                  <td data-label="Status">
                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                      className="table-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td data-label="Created">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  <td data-label="Created By">
                    {task.created_by && (
                      <div className="user-cell">
                        <span
                          className="user-avatar-tiny"
                          style={{
                            backgroundColor: task.created_by_color || "#6366f1",
                          }}
                        >
                          {task.created_by.charAt(0).toUpperCase()}
                        </span>
                        <span className="user-name">{task.created_by}</span>
                      </div>
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button
                        onClick={() => handleSave(task.id)}
                        className="btn-table-save"
                        title="Save"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-table-cancel"
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td data-label="Title" className="cell-title">
                    {task.title}
                  </td>
                  <td data-label="Description" className="cell-description">
                    {task.description || "-"}
                  </td>
                  <td data-label="Status">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="table-status-select"
                      style={{
                        backgroundColor: getStatusColor(task.status),
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td data-label="Created" className="cell-date">
                    <div className="date-info">
                      <div>
                        {new Date(task.created_at).toLocaleDateString()}
                      </div>
                      <div className="time-info">
                        {new Date(task.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td data-label="Created By">
                    {task.created_by && (
                      <div className="user-cell">
                        <span
                          className="user-avatar-tiny"
                          style={{
                            backgroundColor: task.created_by_color || "#6366f1",
                          }}
                        >
                          {task.created_by.charAt(0).toUpperCase()}
                        </span>
                        <span className="user-name">{task.created_by}</span>
                      </div>
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="btn-table-edit"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="btn-table-delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
