import { NextRequest, NextResponse } from 'next/server';
import { taskStore } from '@/lib/taskStore';
import { UpdateTaskRequest, ApiResponse, Task } from '@/types/task';

// PUT /api/tasks/[id] - Actualizar una tarea
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateTaskRequest = await request.json();

    // Verificar que la tarea existe
    const existingTask = taskStore.getTaskById(id);
    if (!existingTask) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Tarea no encontrada'
      };
      
      return NextResponse.json(response, { status: 404 });
    }

    // Validación básica
    if (body.title !== undefined && (!body.title || body.title.trim() === '')) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'El título no puede estar vacío'
      };
      
      return NextResponse.json(response, { status: 400 });
    }

    if (body.title !== undefined && body.title.trim().length < 3) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'El título debe tener al menos 3 caracteres'
      };
      
      return NextResponse.json(response, { status: 400 });
    }

    const updatedTask = taskStore.updateTask(id, body);

    if (!updatedTask) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Error al actualizar la tarea'
      };
      
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<Task> = {
      success: true,
      data: updatedTask,
      message: 'Tarea actualizada exitosamente'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      message: 'Error al actualizar la tarea',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/tasks/[id] - Eliminar una tarea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedTask = taskStore.deleteTask(id);

    if (!deletedTask) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Tarea no encontrada'
      };
      
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Task> = {
      success: true,
      data: deletedTask,
      message: 'Tarea eliminada exitosamente'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      message: 'Error al eliminar la tarea',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };

    return NextResponse.json(response, { status: 500 });
  }
}
