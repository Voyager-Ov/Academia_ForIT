'use client';

import React from 'react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 p-4 hover:shadow-lg transition-all duration-200 ${
      task.completed 
        ? 'border-green-500 bg-gray-50 opacity-75' 
        : 'border-blue-500'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${
              task.completed 
                ? 'text-gray-600 line-through' 
                : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <span className="text-xs text-gray-500 lg:ml-4 flex-shrink-0">
              {formatDate(task.createdAt)}
            </span>
          </div>
          
          {task.description && (
            <p className={`mb-3 text-sm leading-relaxed ${
              task.completed ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.completed ? '✓ Completada' : '⏱ Pendiente'}
            </span>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => onToggleComplete(task.id, !task.completed)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              task.completed
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {task.completed ? '↶' : '✓'}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200"
            title="Editar tarea"
          >
            ✏️
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200"
            title="Eliminar tarea"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
