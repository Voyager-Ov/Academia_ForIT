const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Array en memoria para almacenar las tareas
let tasks = [
  {
    id: '1',
    title: 'Tarea de ejemplo',
    description: 'Esta es una tarea de prueba',
    completed: false,
    createdAt: new Date()
  }
];

// Helper para generar IDs únicos
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  try {
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
});

// POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description } = req.body;

    // Validación básica
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El título es requerido'
      });
    }

    const newTask = {
      id: generateId(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Tarea creada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    // Validación básica
    if (title !== undefined && (!title || title.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'El título no puede estar vacío'
      });
    }

    // Actualizar solo los campos proporcionados
    if (title !== undefined) tasks[taskIndex].title = title.trim();
    if (description !== undefined) tasks[taskIndex].description = description.trim();
    if (completed !== undefined) tasks[taskIndex].completed = Boolean(completed);

    res.json({
      success: true,
      data: tasks[taskIndex],
      message: 'Tarea actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
});

// DELETE /api/tasks/:id - Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
      success: true,
      data: deletedTask,
      message: 'Tarea eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📋 API de tareas disponible en http://localhost:${PORT}/api/tasks`);
});

module.exports = app;
