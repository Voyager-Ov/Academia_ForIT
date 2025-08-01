'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { taskService } from '@/services/taskService';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

type ViewMode = 'all' | 'pending' | 'completed' | 'new';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas al iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data: { title: string; description: string }) => {
    try {
      const newTask = await taskService.createTask(data);
      setTasks(prev => [newTask, ...prev]);
      setCurrentView('all');
    } catch (err) {
      setError('Error al crear la tarea');
      console.error(err);
    }
  };

  const handleUpdateTask = async (data: { title: string; description: string }) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, data);
      setTasks(prev => 
        prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        )
      );
      setEditingTask(null);
      setCurrentView('all');
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = await taskService.updateTask(taskId, {
        title: task.title,
        description: task.description,
        completed: completed
      });
      
      setTasks(prev =>
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error(err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentView('new');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setCurrentView('all');
  };

  // Filtrar tareas según la vista actual
  const getFilteredTasks = () => {
    switch (currentView) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* El fondo animado ya está definido en globals.css con body::before */}
      
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <Sidebar
          tasks={tasks}
          currentView={currentView}
          onViewChange={(view) => setCurrentView(view as ViewMode)}
        />

        {/* Main Content */}
        <main className="flex-1 ml-80 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <header className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                📝 Academia ForIT
              </h1>
              <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                Organiza tus tareas de manera elegante y eficiente
              </p>
            </header>

            {/* Error Message */}
            {error && (
              <div className="px-6 py-4 rounded-xl mb-8 flex items-center shadow-lg" style={{ 
                backgroundColor: 'var(--destructive)', 
                color: 'var(--foreground)',
                border: '1px solid var(--border)'
              }}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto p-1 hover:opacity-70 transition-opacity"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Content based on current view */}
            {currentView === 'new' ? (
              <TaskForm
                task={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={editingTask ? handleCancelEdit : undefined}
                isEditing={!!editingTask}
              />
            ) : (
              <>
                {/* View Header */}
                <div className="glass-card p-8 mb-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                        {currentView === 'all' && '📋 Todas las Tareas'}
                        {currentView === 'pending' && '⏳ Tareas Pendientes'}
                        {currentView === 'completed' && '✅ Tareas Completadas'}
                      </h2>
                      <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                        {filteredTasks.length === 0 
                          ? 'No hay tareas en esta vista'
                          : `${filteredTasks.length} ${filteredTasks.length === 1 ? 'tarea' : 'tareas'}`
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentView('new')}
                      className="btn-primary px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-lg"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Nueva Tarea
                    </button>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                  <div className="text-center py-24">
                    <div className="animate-spin rounded-full border-4 border-t-[var(--primary)] w-16 h-16 mx-auto mb-6" style={{ borderColor: 'var(--muted)', borderTopColor: 'var(--primary)' }}></div>
                    <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Cargando tareas...</p>
                  </div>
                ) : (
                  <>
                    {/* Empty State */}
                    {filteredTasks.length === 0 ? (
                      <div className="text-center py-24">
                        <div className="text-8xl mb-8">
                          {currentView === 'completed' ? '🎉' : '📝'}
                        </div>
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                          {currentView === 'completed' 
                            ? '¡Excelente trabajo!' 
                            : 'No hay tareas aquí'
                          }
                        </h3>
                        <p className="text-lg max-w-md mx-auto mb-8" style={{ color: 'var(--muted-foreground)' }}>
                          {currentView === 'completed' 
                            ? 'No tienes tareas completadas aún. ¡Es hora de empezar a ser productivo!'
                            : currentView === 'pending'
                            ? 'Todas tus tareas están completadas. ¡Buen trabajo!'
                            : 'Comienza creando tu primera tarea y organiza tu día de manera eficiente'
                          }
                        </p>
                        {currentView !== 'completed' && (
                          <button
                            onClick={() => setCurrentView('new')}
                            className="btn-primary px-10 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                          >
                            ➕ Crear Primera Tarea
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Tasks Grid */
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
