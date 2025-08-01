import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-status">
          <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? '✓ Completada' : '⏱ Pendiente'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`btn-toggle ${task.completed ? 'btn-uncomplete' : 'btn-complete'}`}
          onClick={() => onToggleComplete(task.id, !task.completed)}
          title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.completed ? '↶' : '✓'}
        </button>
        
        <button
          className="btn-edit"
          onClick={() => onEdit(task)}
          title="Editar tarea"
        >
          ✏️
        </button>
        
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
