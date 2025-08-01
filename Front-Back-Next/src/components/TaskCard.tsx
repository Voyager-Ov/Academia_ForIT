'use client';

import React from 'react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
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
    <div className={`group p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl ${
      task.completed ? 'opacity-60' : ''
    }`} style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Header with checkbox and date */}
      <div className="flex items-start justify-between mb-6">
        <button
          onClick={() => onToggleComplete(task.id, !task.completed)}
          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'text-white'
              : 'hover:opacity-70'
          }`}
          style={{
            backgroundColor: task.completed ? 'var(--primary)' : 'transparent',
            borderColor: task.completed ? 'var(--primary)' : 'var(--border)'
          }}
        >
          {task.completed && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {formatDate(task.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-xl font-semibold mb-4 transition-all duration-200 ${
        task.completed
          ? 'line-through'
          : ''
      }`} style={{ 
        color: task.completed ? 'var(--muted-foreground)' : 'var(--foreground)'
      }}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className={`text-base mb-6 line-clamp-3 leading-relaxed ${
          task.completed ? 'line-through' : ''
        }`} style={{
          color: task.completed ? 'var(--muted-foreground)' : 'var(--muted-foreground)'
        }}>
          {task.description}
        </p>
      )}

      {/* Status badge and actions */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium`} style={{
          backgroundColor: task.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
          color: task.completed ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)',
          border: `1px solid ${task.completed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
        }}>
          {task.completed ? '✓ Completada' : '⏱️ Pendiente'}
        </span>

        {/* Actions */}
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-3 rounded-lg transition-colors duration-200"
            style={{ 
              color: 'var(--muted-foreground)',
              backgroundColor: 'var(--muted)',
            }}
            title="Editar tarea"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            className="p-3 rounded-lg transition-colors duration-200 hover:bg-red-500/20 hover:text-red-300"
            style={{ 
              color: 'var(--muted-foreground)',
              backgroundColor: 'var(--muted)',
            }}
            title="Eliminar tarea"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
