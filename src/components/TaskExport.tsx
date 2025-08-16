import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { Task, Category } from '../hooks/useTasks';

interface TaskExportProps {
  tasks: Task[];
  categories: Category[];
}

export const TaskExport: React.FC<TaskExportProps> = ({ tasks, categories }) => {
  const exportToCSV = () => {
    const headers = ['Title', 'Description', 'Category', 'Priority', 'Status', 'Due Date', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [
        `"${task.title}"`,
        `"${task.description}"`,
        task.category,
        task.priority,
        task.status,
        task.dueDate,
        new Date(task.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      tasks: tasks.map(task => ({
        ...task,
        categoryLabel: categories.find(cat => cat.name === task.category)?.label
      })),
      categories
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const overdueCount = tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== 'completed'
    ).length;

    const report = `
TASK MANAGEMENT REPORT
Generated on: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Tasks: ${tasks.length}
- Completed: ${completedTasks.length}
- In Progress: ${inProgressTasks.length}
- Pending: ${pendingTasks.length}
- Overdue: ${overdueCount}

CATEGORY BREAKDOWN:
${categories.map(category => {
  const categoryTasks = tasks.filter(task => task.category === category.name);
  const completed = categoryTasks.filter(task => task.status === 'completed').length;
  return `- ${category.label}: ${completed}/${categoryTasks.length} completed`;
}).join('\n')}

PRIORITY BREAKDOWN:
- High Priority: ${tasks.filter(task => task.priority === 'high').length}
- Medium Priority: ${tasks.filter(task => task.priority === 'medium').length}
- Low Priority: ${tasks.filter(task => task.priority === 'low').length}

RECENT COMPLETED TASKS:
${completedTasks.slice(-5).map(task => `- ${task.title} (${new Date(task.updatedAt).toLocaleDateString()})`).join('\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Download className="w-5 h-5" />
        <span>Export & Reports</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Export CSV</span>
        </button>

        <button
          onClick={exportToJSON}
          className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Backup JSON</span>
        </button>

        <button
          onClick={generateReport}
          className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Generate Report</span>
        </button>
      </div>
    </div>
  );
};