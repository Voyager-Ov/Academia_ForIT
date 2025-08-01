import { Task, CreateTaskRequest, UpdateTaskRequest, ApiResponse } from '@/types/task';

const API_BASE_URL = '/api';

class TaskService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data: ApiResponse<T> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error en la operación');
    }
    
    return data.data as T;
  }

  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      cache: 'no-store' // Siempre obtener datos frescos
    });
    
    return this.handleResponse<Task[]>(response);
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    return this.handleResponse<Task>(response);
  }

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    return this.handleResponse<Task>(response);
  }

  async deleteTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    
    return this.handleResponse<Task>(response);
  }

  async toggleTaskComplete(id: string, completed: boolean): Promise<Task> {
    return this.updateTask(id, { completed });
  }
}

export const taskService = new TaskService();
