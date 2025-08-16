import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Task, Category } from '../hooks/useTasks';

interface TaskCalendarProps {
  tasks: Task[];
  categories: Category[];
  onTaskClick: (task: Task) => void;
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({
  tasks,
  categories,
  onTaskClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayTasks = getTasksForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();

    days.push(
      <div
        key={day}
        className={`h-24 border border-gray-200 p-2 hover:bg-gray-50 transition-colors ${
          isToday ? 'bg-blue-50 border-blue-300' : ''
        }`}
      >
        <div className={`text-sm font-medium mb-1 ${
          isToday ? 'text-blue-600' : 'text-gray-900'
        }`}>
          {day}
        </div>
        <div className="space-y-1">
          {dayTasks.slice(0, 2).map(task => {
            const category = categories.find(cat => cat.name === task.category);
            return (
              <div
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                style={{ backgroundColor: category?.color || '#6B7280', color: 'white' }}
                title={task.title}
              >
                {task.title}
              </div>
            );
          })}
          {dayTasks.length > 2 && (
            <div className="text-xs text-gray-500">
              +{dayTasks.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5" />
          <span>Task Calendar</span>
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
            {monthYear}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};