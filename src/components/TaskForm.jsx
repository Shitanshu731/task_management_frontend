import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ title: "", description: "", status: "pending" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="title" className="form-label">
            <span className="label-icon">📝</span>
            Task Title
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Enter a descriptive task title"
            maxLength={100}
          />
          <span className="input-hint">
            {formData.title.length}/100 characters
          </span>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description" className="form-label">
            <span className="label-icon">📄</span>
            Description
            <span className="optional">(Optional)</span>
          </label>
          <textarea
            id="description"
            className="form-textarea"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add more details about this task..."
            rows="4"
            maxLength={500}
          />
          <span className="input-hint">
            {formData.description.length}/500 characters
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            <span className="label-icon">🚦</span>
            Status
          </label>
          <div className="select-wrapper">
            <select
              id="status"
              className="form-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          <span className="btn-icon">➕</span>
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
