'use client';

import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Task } from '@/types/task';
import { taskService } from '@/services/taskService';

type FilterType = 'all' | 'completed' | 'pending';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
      console.error('Error cargando tareas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea');
      throw err;
    }
  };

  const handleUpdateTask = async (taskData: { title: string; description: string }) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData);
      setTasks(prev => 
        prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        )
      );
      setEditingTask(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      throw err;
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await taskService.toggleTaskComplete(id, completed);
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de la tarea');
      console.error('Error:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea');
      console.error('Error:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">📋 Lista de Tareas</h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            📊 Total: <strong>{stats.total}</strong>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            ✅ Completadas: <strong>{stats.completed}</strong>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            ⏱ Pendientes: <strong>{stats.pending}</strong>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
          <span>⚠️ {error}</span>
          <button 
            onClick={loadTasks}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            🔄 Reintentar
          </button>
        </div>
      )}

      {/* Task Form */}
      {editingTask ? (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      ) : (
        <TaskForm onSubmit={handleCreateTask} />
      )}

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar tareas:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📄 Todas ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⏱ Pendientes ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✅ Completadas ({stats.completed})
          </button>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
            {filter === 'all' ? (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">🎉 ¡No hay tareas!</h3>
                <p className="text-gray-600">Crea tu primera tarea usando el formulario de arriba.</p>
              </>
            ) : filter === 'pending' ? (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">🎊 ¡Excelente trabajo!</h3>
                <p className="text-gray-600">No tienes tareas pendientes.</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">📝 No hay tareas completadas</h3>
                <p className="text-gray-600">Completa algunas tareas para verlas aquí.</p>
              </>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
