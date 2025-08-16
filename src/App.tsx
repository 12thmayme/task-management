import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks, Task } from './hooks/useTasks';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskCalendar } from './components/TaskCalendar';
import { TaskAnalytics } from './components/TaskAnalytics';
import { TaskExport } from './components/TaskExport';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { user, isLoading: authLoading, login, logout } = useAuth();
  const { 
    tasks, 
    categories, 
    loading: tasksLoading, 
    createTask, 
    updateTask, 
    deleteTask, 
    getTaskStats 
  } = useTasks(user?.id || null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar' | 'analytics' | 'export'>('tasks');

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  const handleCreateTask = async (taskData: any) => {
    await createTask(taskData);
  };

  const handleUpdateTask = async (taskData: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleStatusChange = async (id: number, status: Task['status']) => {
    await updateTask(id, { status });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = editingTask ? handleUpdateTask : handleCreateTask;

  if (tasksLoading) {
    return (
      <div>
        <Header user={user} tasks={[]} onLogout={logout} />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} tasks={tasks} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's what you have on your plate today.
          </p>
        </div>

        <TaskStats stats={getTaskStats()} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { id: 'tasks', label: 'Tasks', icon: '📋' },
              { id: 'calendar', label: 'Calendar', icon: '📅' },
              { id: 'analytics', label: 'Analytics', icon: '📊' },
              { id: 'export', label: 'Export', icon: '📤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'tasks' && (
          <TaskList
            tasks={tasks}
            categories={categories}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onCreateTask={() => setIsFormOpen(true)}
          />
        )}

        {activeTab === 'calendar' && (
          <TaskCalendar
            tasks={tasks}
            categories={categories}
            onTaskClick={handleEditTask}
          />
        )}

        {activeTab === 'analytics' && (
          <TaskAnalytics
            tasks={tasks}
            categories={categories}
          />
        )}

        {activeTab === 'export' && (
          <TaskExport
            tasks={tasks}
            categories={categories}
          />
        )}

        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          categories={categories}
          task={editingTask}
        />
      </main>
    </div>
  );
}

export default App;