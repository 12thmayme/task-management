# Task Management System

A modern, responsive task management application built with React, TypeScript, and JSON Server.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login system with demo accounts
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Task Categories**: Organize tasks by work, personal, health, and education
- **Priority Levels**: High, medium, and low priority classification
- **Status Tracking**: Pending, in-progress, and completed states
- **Due Date Management**: Set and track task deadlines

### Advanced Features
- **Task Calendar**: Visual calendar view with task distribution
- **Analytics Dashboard**: Productivity charts and category performance
- **Search & Filter**: Advanced filtering by status, priority, and category
- **Export Functionality**: CSV, JSON backup, and text reports
- **Real-time Notifications**: Alerts for overdue and upcoming tasks
- **Progress Tracking**: Visual progress bars and completion statistics

### UI/UX Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern Interface**: Clean, card-based design with smooth animations
- **Grid/List Views**: Toggle between different task display modes
- **Hover Effects**: Interactive elements with visual feedback
- **Loading States**: Smooth loading indicators and error handling

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: JSON Server (REST API simulation)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 📦 Installation & Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development servers**:
   ```bash
   npm run dev
   ```
   This starts both the React app (port 5173) and JSON Server (port 3001)

3. **Access the application**:
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## 🔐 Demo Accounts

- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user1`, password: `user123`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── LoginForm.tsx    # Authentication form
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskForm.tsx     # Task creation/editing form
│   ├── TaskList.tsx     # Task grid/list view
│   ├── TaskStats.tsx    # Statistics dashboard
│   ├── TaskCalendar.tsx # Calendar view
│   ├── TaskAnalytics.tsx # Analytics charts
│   ├── TaskExport.tsx   # Export functionality
│   ├── TaskNotifications.tsx # Notification system
│   └── LoadingSpinner.tsx # Loading indicator
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   └── useTasks.ts      # Task management logic
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Development Timeline (14 Days)

### Week 1 (Days 1-7): Core Development
- ✅ **Days 1-2**: Project setup, JSON Server, Authentication
- ✅ **Days 3-4**: Basic CRUD operations (Read + Create)
- ✅ **Days 5-6**: Update + Delete + Form validation
- ✅ **Day 7**: Debugging and testing

### Week 2 (Days 8-14): Enhancement & Deployment
- ✅ **Days 8-10**: UI/UX styling + responsive design
- ✅ **Days 11-12**: Advanced features (Calendar, Analytics, Export, Notifications)
- 🔄 **Day 13**: Deployment + environment setup
- 📝 **Day 14**: Polish + documentation + submission

## 🚀 Deployment

### Vercel Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel: Connect your GitHub repository
3. Configure environment variables if needed

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

**Note**: For production deployment, you'll need to replace JSON Server with a real backend API (Express.js, Node.js, or cloud services like Supabase).

## 📊 API Endpoints

JSON Server provides the following endpoints:

- `GET /users` - Get all users
- `GET /tasks` - Get all tasks
- `GET /tasks?userId=1` - Get tasks by user
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /categories` - Get all categories

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography
- **Headings**: 120% line height, bold weights
- **Body**: 150% line height, regular weight
- **Small text**: 140% line height

### Spacing
- **Base unit**: 8px
- **Component padding**: 16px, 24px
- **Section margins**: 32px, 48px

## 🔧 Customization

### Adding New Categories
Edit `db.json` to add new categories:
```json
{
  "id": 5,
  "name": "shopping",
  "label": "Shopping",
  "color": "#EC4899"
}
```

### Modifying Task Fields
Update the `Task` interface in `src/hooks/useTasks.ts` and corresponding forms.

## 🐛 Troubleshooting

- **Port conflicts**: Change ports in `package.json` scripts
- **CORS issues**: JSON Server includes CORS headers by default
- **Data persistence**: JSON Server saves changes to `db.json`

## 📝 License

This project is open source and available under the MIT License.