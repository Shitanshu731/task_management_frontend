import "./Skeleton.css";

export const Skeleton = ({ className = "", style = {} }) => (
  <div className={`skeleton ${className}`} style={style} />
);

export const TaskItemSkeleton = () => (
  <div className="task-item-skeleton">
    <div className="task-item-skeleton-header">
      <Skeleton style={{ width: "60%", height: "1.5rem" }} />
      <Skeleton className="skeleton-badge" />
    </div>
    <div className="task-item-skeleton-body">
      <Skeleton className="skeleton-text" style={{ width: "100%" }} />
      <Skeleton className="skeleton-text" style={{ width: "80%" }} />
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <Skeleton className="skeleton-text small" style={{ width: "150px" }} />
    </div>
    <div className="task-item-skeleton-footer">
      <Skeleton style={{ flex: 1, height: "2.5rem" }} />
      <Skeleton className="skeleton-button" />
      <Skeleton className="skeleton-button" />
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="stat-card-skeleton">
    <Skeleton className="stat-value-skeleton" />
    <Skeleton className="stat-label-skeleton" />
  </div>
);

export const FormSkeleton = () => (
  <div className="form-skeleton">
    <div className="form-field-skeleton">
      <Skeleton style={{ width: "100px", height: "1rem" }} />
      <Skeleton className="form-input-skeleton" />
    </div>
    <div className="form-field-skeleton">
      <Skeleton style={{ width: "120px", height: "1rem" }} />
      <Skeleton className="form-textarea-skeleton" />
    </div>
    <div className="form-field-skeleton">
      <Skeleton style={{ width: "80px", height: "1rem" }} />
      <Skeleton className="form-input-skeleton" />
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "1rem",
      }}
    >
      <Skeleton
        style={{
          width: "150px",
          height: "2.75rem",
          borderRadius: "var(--radius-md)",
        }}
      />
    </div>
  </div>
);

export default Skeleton;
