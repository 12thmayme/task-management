import React from 'react';
import { Calendar, Edit3, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Task, Category } from '../hooks/useTasks';

interface TaskCardProps {
  task: Task;
  categories: Category[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  categories,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const category = categories.find(cat => cat.name === task.category);
  
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = () => {
    switch (task.status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor()} hover:shadow-md transition-all duration-200 p-6 group`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {task.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category && (
              <span
                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.label}
              </span>
            )}
            
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadgeColor()}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
            </span>
            
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
          </div>

          <div className={`flex items-center space-x-2 text-sm ${
            isOverdue ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Calendar className="w-4 h-4" />
            <span>
              Due: {new Date(task.dueDate).toLocaleDateString()}
              {isOverdue && <span className="font-semibold"> (Overdue)</span>}
              {!isOverdue && daysUntilDue >= 0 && (
                <span className="text-gray-500">
                  {daysUntilDue === 0 ? ' (Today)' : ` (${daysUntilDue} days left)`}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.status !== 'completed' && (
        <div className="flex space-x-2">
          {task.status === 'pending' && (
            <button
              onClick={() => onStatusChange(task.id, 'in-progress')}
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
            >
              Start Progress
            </button>
          )}
          {task.status === 'in-progress' && (
            <button
              onClick={() => onStatusChange(task.id, 'completed')}
              className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
            >
              Mark Complete
            </button>
          )}
          {task.status !== 'pending' && (
            <button
              onClick={() => onStatusChange(task.id, 'pending')}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset to Pending
            </button>
          )}
        </div>
      )}
    </div>
  );
};