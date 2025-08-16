import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Task } from '../hooks/useTasks';

interface TaskNotificationsProps {
  tasks: Task[];
}

interface Notification {
  id: string;
  type: 'overdue' | 'due-today' | 'due-soon';
  task: Task;
  message: string;
}

export const TaskNotifications: React.FC<TaskNotificationsProps> = ({ tasks }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const newNotifications: Notification[] = [];

    // Check for overdue tasks
    tasks.forEach(task => {
      if (task.status !== 'completed' && task.dueDate < todayStr) {
        newNotifications.push({
          id: `overdue-${task.id}`,
          type: 'overdue',
          task,
          message: `Task "${task.title}" is overdue`
        });
      }
    });

    // Check for tasks due today
    tasks.forEach(task => {
      if (task.status !== 'completed' && task.dueDate === todayStr) {
        newNotifications.push({
          id: `due-today-${task.id}`,
          type: 'due-today',
          task,
          message: `Task "${task.title}" is due today`
        });
      }
    });

    // Check for tasks due tomorrow
    tasks.forEach(task => {
      if (task.status !== 'completed' && task.dueDate === tomorrowStr) {
        newNotifications.push({
          id: `due-soon-${task.id}`,
          type: 'due-soon',
          task,
          message: `Task "${task.title}" is due tomorrow`
        });
      }
    });

    setNotifications(newNotifications);
  }, [tasks]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'due-today':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'due-soon':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'overdue':
        return 'border-red-200 bg-red-50';
      case 'due-today':
        return 'border-yellow-200 bg-yellow-50';
      case 'due-soon':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="p-2">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border mb-2 ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Due: {new Date(notification.task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};