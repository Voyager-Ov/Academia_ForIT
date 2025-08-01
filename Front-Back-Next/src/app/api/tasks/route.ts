import { NextRequest, NextResponse } from 'next/server';
import { taskStore } from '@/lib/taskStore';
import { CreateTaskRequest, ApiResponse, Task } from '@/types/task';

// GET /api/tasks - Obtener todas las tareas
export async function GET() {
  try {
    const tasks = taskStore.getAllTasks();
    
    const response: ApiResponse<Task[]> = {
      success: true,
      data: tasks
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      message: 'Error al obtener las tareas',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/tasks - Crear una nueva tarea
export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskRequest = await request.json();
    const { title, description = '' } = body;

    // Validación básica
    if (!title || title.trim() === '') {
      const response: ApiResponse<null> = {
        success: false,
        message: 'El título es requerido'
      };
      
      return NextResponse.json(response, { status: 400 });
    }

    if (title.trim().length < 3) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'El título debe tener al menos 3 caracteres'
      };
      
      return NextResponse.json(response, { status: 400 });
    }

    const newTask = taskStore.createTask(title, description);

    const response: ApiResponse<Task> = {
      success: true,
      data: newTask,
      message: 'Tarea creada exitosamente'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      message: 'Error al crear la tarea',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };

    return NextResponse.json(response, { status: 500 });
  }
}
