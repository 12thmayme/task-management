import React from 'react';
import { BarChart3, TrendingUp, Target, Clock } from 'lucide-react';
import { Task, Category } from '../hooks/useTasks';

interface TaskAnalyticsProps {
  tasks: Task[];
  categories: Category[];
}

export const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ tasks, categories }) => {
  const getProductivityData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const completedTasks = tasks.filter(task => 
        task.status === 'completed' && 
        task.updatedAt.split('T')[0] === date
      ).length;
      
      return {
        date,
        completed: completedTasks,
        label: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
      };
    });
  };

  const getCategoryStats = () => {
    return categories.map(category => {
      const categoryTasks = tasks.filter(task => task.category === category.name);
      const completed = categoryTasks.filter(task => task.status === 'completed').length;
      const total = categoryTasks.length;
      const percentage = total > 0 ? (completed / total) * 100 : 0;

      return {
        ...category,
        total,
        completed,
        percentage
      };
    });
  };

  const getOverdueCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.dueDate < today && task.status !== 'completed'
    ).length;
  };

  const getAverageCompletionTime = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    if (completedTasks.length === 0) return 0;

    const totalDays = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt);
      const completed = new Date(task.updatedAt);
      const days = Math.ceil((completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    return Math.round(totalDays / completedTasks.length);
  };

  const productivityData = getProductivityData();
  const categoryStats = getCategoryStats();
  const overdueCount = getOverdueCount();
  const avgCompletionTime = getAverageCompletionTime();
  const maxCompleted = Math.max(...productivityData.map(d => d.completed), 1);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
              <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
              <p className="text-2xl font-bold text-blue-600">{avgCompletionTime} days</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-green-600">
                {productivityData.reduce((sum, day) => sum + day.completed, 0)} completed
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>7-Day Productivity</span>
        </h3>
        
        <div className="flex items-end justify-between h-40 space-x-2">
          {productivityData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative flex-1 flex items-end">
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                  style={{ 
                    height: `${(day.completed / maxCompleted) * 100}%`,
                    minHeight: day.completed > 0 ? '8px' : '0px'
                  }}
                  title={`${day.completed} tasks completed`}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 font-medium">
                {day.label}
              </div>
              <div className="text-xs text-gray-500">
                {day.completed}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
        
        <div className="space-y-4">
          {categoryStats.map(category => (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-900">{category.label}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {category.completed}/{category.total} ({Math.round(category.percentage)}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: category.color,
                    width: `${category.percentage}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};