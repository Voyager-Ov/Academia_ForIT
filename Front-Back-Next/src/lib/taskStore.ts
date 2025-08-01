import { Task } from '@/types/task';

class TaskStore {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Tarea de ejemplo',
      description: 'Esta es una tarea de prueba creada con Next.js',
      completed: false,
      createdAt: new Date()
    }
  ];

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  getAllTasks(): Task[] {
    return [...this.tasks].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  createTask(title: string, description: string = ''): Task {
    const newTask: Task = {
      id: this.generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    if (updates.title !== undefined) {
      this.tasks[taskIndex].title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      this.tasks[taskIndex].description = updates.description.trim();
    }
    if (updates.completed !== undefined) {
      this.tasks[taskIndex].completed = updates.completed;
    }

    return this.tasks[taskIndex];
  }

  deleteTask(id: string): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  getTaskStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    return { total, completed, pending };
  }
}

// Instancia singleton del almacén
export const taskStore = new TaskStore();
