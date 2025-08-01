import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import taskService from '../../services/taskService';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending

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
      setError('Error al cargar las tareas. Por favor, verifica que el servidor esté ejecutándose.');
      console.error('Error cargando tareas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError('Error al crear la tarea');
      throw err;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData);
      setTasks(prev => 
        prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        )
      );
      setEditingTask(null);
    } catch (err) {
      setError('Error al actualizar la tarea');
      throw err;
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTask = await taskService.updateTask(id, { completed });
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Error al actualizar el estado de la tarea');
      console.error('Error:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error('Error:', err);
    }
  };

  const handleEditTask = (task) => {
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
      <div className="task-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <header className="task-list-header">
        <h1>📋 Lista de Tareas</h1>
        <div className="stats">
          <span className="stat-item">
            📊 Total: <strong>{stats.total}</strong>
          </span>
          <span className="stat-item">
            ✅ Completadas: <strong>{stats.completed}</strong>
          </span>
          <span className="stat-item">
            ⏱ Pendientes: <strong>{stats.pending}</strong>
          </span>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={loadTasks} className="retry-btn">
            🔄 Reintentar
          </button>
        </div>
      )}

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

      <div className="filter-section">
        <h3>Filtrar tareas:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            📄 Todas ({stats.total})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            ⏱ Pendientes ({stats.pending})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            ✅ Completadas ({stats.completed})
          </button>
        </div>
      </div>

      <div className="tasks-section">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' ? (
              <>
                <h3>🎉 ¡No hay tareas!</h3>
                <p>Crea tu primera tarea usando el formulario de arriba.</p>
              </>
            ) : filter === 'pending' ? (
              <>
                <h3>🎊 ¡Excelente trabajo!</h3>
                <p>No tienes tareas pendientes.</p>
              </>
            ) : (
              <>
                <h3>📝 No hay tareas completadas</h3>
                <p>Completa algunas tareas para verlas aquí.</p>
              </>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
