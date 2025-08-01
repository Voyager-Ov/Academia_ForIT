const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class TaskService {
  async getAllTasks() {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la tarea');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateTask(id, taskData) {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la tarea');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la tarea');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default new TaskService();
