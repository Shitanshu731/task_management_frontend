# TaskFlow - Real-time Task Management Frontend

A modern, responsive task management application built with React and real-time WebSocket capabilities. TaskFlow provides an intuitive interface for creating, managing, and tracking tasks with live collaboration features.

![TaskFlow](https://img.shields.io/badge/React-19.2.0-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.3-green)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## ✨ Features

### Task Management

- **Create Tasks**: Quick task creation with title, description, and status
- **Update Tasks**: Inline editing for quick updates
- **Delete Tasks**: Remove completed or unwanted tasks
- **Status Tracking**: Three status levels - Pending, In Progress, Completed

### Real-time Collaboration

- **Live Updates**: See task changes instantly across all connected users
- **Online Users**: View who's currently active in the application
- **WebSocket Integration**: Real-time synchronization using Socket.IO

### Multiple Views

- **List View**: Card-based layout with detailed task information
- **Table View**: Compact tabular format for better overview
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile

### Smart Filtering

- Filter tasks by status (All, Pending, In Progress, Completed)
- Real-time task count badges
- Quick access sidebar with hamburger menu on mobile

### User Experience

- **Dark Mode Ready**: Modern gradient design with customizable themes
- **Skeleton Loading**: Smooth loading states
- **Empty States**: Helpful messages when no tasks exist
- **Mobile Optimized**: Touch-friendly interface with slide-out sidebar

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (default: http://localhost:5000)

### Installation

1. **Clone the repository**

   ```bash
   cd task-management-app/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── TaskForm.jsx     # Task creation form
│   │   ├── TaskList.jsx     # Task list with view switcher
│   │   ├── TaskItem.jsx     # Individual task card
│   │   ├── TaskTable.jsx    # Table view component
│   │   ├── OnlineUsers.jsx  # Active users display
│   │   └── Skeleton.jsx     # Loading state components
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useTasks.js      # Task CRUD operations
│   │   └── useSocket.js     # WebSocket connection
│   │
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Base styles
│
├── public/                  # Public assets
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Component Overview

### App.jsx

Main application component that orchestrates:

- WebSocket connections
- Task filtering and state management
- Sidebar toggle functionality
- Header and layout structure

### TaskList.jsx

Manages task display with:

- View mode switching (List/Table)
- Task count statistics
- Loading and error states
- Empty state handling

### TaskItem.jsx

Individual task card featuring:

- Inline editing
- Status dropdown
- Delete confirmation
- User attribution

### TaskTable.jsx

Table view component with:

- Sortable columns
- Inline editing
- Responsive mobile cards
- Status color coding

### OnlineUsers.jsx

Displays active users with:

- Real-time user list
- Color-coded avatars
- Online status indicators

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

The frontend connects to the backend API with the following endpoints:

- `GET /api/tasks` - Fetch all tasks
- `GET /api/tasks?status={status}` - Fetch filtered tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### WebSocket Events

**Emitted:**

- `user:identify` - User identification on connect

**Received:**

- `task:created` - New task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted
- `users:list` - Updated list of online users
- `user:connected` - New user joined
- `user:disconnected` - User left

## 🎯 Key Features Implementation

### Real-time Updates

```javascript
socket.on("task:created", () => fetchAllTasks());
socket.on("task:updated", () => fetchAllTasks());
socket.on("task:deleted", () => fetchAllTasks());
```

### Responsive Sidebar

- Desktop: Fixed sidebar with filters and online users
- Mobile: Slide-out sidebar with hamburger menu
- Overlay backdrop for mobile navigation

### View Switching

Users can toggle between List and Table views:

- **List View**: Detailed card layout with full descriptions
- **Table View**: Compact tabular format with inline editing

## 🎨 Styling

Built with modern CSS featuring:

- CSS Custom Properties (CSS Variables)
- Flexbox and Grid layouts
- Smooth animations and transitions
- Responsive breakpoints (1200px, 1024px, 768px, 640px)
- Custom scrollbar styling

### Color Scheme

```css
--primary-color: #6366f1     /* Indigo */
--success-color: #10b981     /* Green */
--warning-color: #f59e0b     /* Amber */
--danger-color: #ef4444      /* Red */
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔐 User Identification

Each user is automatically assigned:

- Unique username (stored in localStorage)
- Random color for avatar
- Persistent identity across sessions

## ⚡ Performance Optimization

- Component-level code splitting
- Skeleton loading states
- Optimized re-renders with React hooks
- Efficient WebSocket event handling
- CSS animations using GPU acceleration

## 🛠️ Technologies Used

| Technology       | Version | Purpose      |
| ---------------- | ------- | ------------ |
| React            | 19.2.0  | UI Framework |
| Vite             | 7.2.4   | Build Tool   |
| Axios            | 1.13.2  | HTTP Client  |
| Socket.IO Client | 4.8.3   | WebSocket    |
| ESLint           | 9.39.1  | Code Linting |

## 🐛 Troubleshooting

### WebSocket Connection Issues

```bash
# Check if backend is running
curl http://localhost:5000

# Verify environment variables
cat .env
```

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or specify different port
npm run dev -- --port 3000
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Future Enhancements

- [ ] Task due dates and reminders
- [ ] Task priority levels
- [ ] Drag-and-drop task reordering
- [ ] Dark mode toggle
- [ ] Task search functionality
- [ ] Export tasks to CSV/PDF
- [ ] Task categories/tags
- [ ] User authentication
- [ ] Task comments and attachments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Shitanshu731** - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.IO for real-time capabilities
- Vite for blazing fast development experience

---

**Happy Task Managing! 🎉**

For issues and feature requests, please create an issue in the repository.
