import "./OnlineUsers.css";

const OnlineUsers = ({ users, currentUser }) => {
  if (!users || users.length === 0) return null;

  return (
    <div className="online-users-section">
      <h3 className="section-title">
        <span className="title-icon">👥</span>
        Online Users
        <span className="user-count">{users.length}</span>
      </h3>
      <div className="users-list">
        {users.map((user) => (
          <div
            key={user.socketId}
            className={`user-item ${
              user.socketId === currentUser?.socketId ? "current-user" : ""
            }`}
          >
            <div
              className="user-avatar"
              style={{ backgroundColor: user.color }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">
                {user.username}
                {user.socketId === currentUser?.socketId && " (You)"}
              </span>
              <span className="user-status">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
