'use client';

import React from 'react';
import { Task } from '@/types/task';

interface SidebarProps {
  tasks: Task[];
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ tasks, currentView, onViewChange }: SidebarProps) {
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  const progressPercentage = taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0;

  const navItems = [
    {
      id: 'all',
      label: 'Todas las Tareas',
      icon: '📋',
      count: taskStats.total
    },
    {
      id: 'pending',
      label: 'Pendientes',
      icon: '⏱️',
      count: taskStats.pending
    },
    {
      id: 'completed',
      label: 'Completadas',
      icon: '✅',
      count: taskStats.completed
    },
    {
      id: 'new',
      label: 'Nueva Tarea',
      icon: '➕',
      count: null
    }
  ];

  return (
    <aside className="w-80 h-screen fixed left-0 top-0 z-20 p-6 border-r" style={{ 
      backgroundColor: 'var(--card)',
      borderColor: 'var(--border)'
    }}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">📋</span>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Task Manager
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Gestión elegante de tareas
          </p>
        </div>

        {/* Stats Card */}
        <div className="sidebar-stats-card mb-8 p-6 rounded-xl backdrop-blur-sm" style={{ 
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <h3 className="text-sm font-medium text-white/90 mb-4">Resumen</h3>
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <div className="text-xl font-bold">{taskStats.total}</div>
              <div className="text-xs opacity-80">Total</div>
            </div>
            <div>
              <div className="text-xl font-bold">{taskStats.pending}</div>
              <div className="text-xs opacity-80">Pendientes</div>
            </div>
            <div>
              <div className="text-xl font-bold">{taskStats.completed}</div>
              <div className="text-xs opacity-80">Completadas</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/90 mb-2">
              <span>Progreso</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`sidebar-nav-item w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group ${
                currentView === item.id ? 'active' : ''
              }`}
              style={{
                backgroundColor: currentView === item.id ? 'var(--primary)' : 'var(--secondary)',
                color: currentView === item.id ? 'white' : 'var(--foreground)',
                border: `1px solid ${currentView === item.id ? 'var(--primary)' : 'var(--border)'}`
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.count !== null && (
                <span 
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: currentView === item.id ? 'rgba(255,255,255,0.2)' : 'var(--accent)',
                    color: currentView === item.id ? 'white' : 'var(--muted-foreground)'
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="text-center">
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Academia ForIT 2025
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
