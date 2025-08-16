import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks, Task } from './hooks/useTasks';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
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
        <Header user={user} onLogout={logout} />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      
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

        <TaskList
          tasks={tasks}
          categories={categories}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onCreateTask={() => setIsFormOpen(true)}
        />

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