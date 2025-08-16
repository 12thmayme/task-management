import React from 'react';
import { LogOut, User, CheckSquare } from 'lucide-react';
import { TaskNotifications } from './TaskNotifications';
import { Task } from '../hooks/useTasks';

interface HeaderProps {
  user: any;
  tasks: Task[];
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, tasks, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          </div>

          <div className="flex items-center space-x-4">
            <TaskNotifications tasks={tasks} />
            
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};