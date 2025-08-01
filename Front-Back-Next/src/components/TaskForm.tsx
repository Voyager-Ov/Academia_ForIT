'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function TaskForm({ task, onSubmit, onCancel, isEditing = false }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title || '',
        description: task.description || ''
      });
    }
  }, [isEditing, task]);

  const validateForm = () => {
    const newErrors: { title?: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim()
      });
      
      // Limpiar formulario solo si no estamos editando
      if (!isEditing) {
        setFormData({ title: '', description: '' });
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="p-10 rounded-xl" style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            {isEditing ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}
          </h2>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            {isEditing ? 'Modifica los detalles de tu tarea' : 'Crea una nueva tarea para organizar tu día'}
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-base font-medium mb-3" style={{ color: 'var(--foreground)' }}>
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-6 py-4 rounded-xl transition-all duration-200 text-lg focus:ring-2 ${
                errors.title ? 'focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              style={{
                background: 'var(--input)',
                border: `1px solid ${errors.title ? 'rgb(239, 68, 68)' : 'var(--border)'}`,
                color: 'var(--foreground)'
              }}
              placeholder="¿Qué necesitas hacer?"
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-base font-medium mb-3" style={{ color: 'var(--foreground)' }}>
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-xl transition-all duration-200 resize-none text-lg focus:ring-2 focus:ring-blue-400"
              style={{
                background: 'var(--input)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)'
              }}
              placeholder="Añade más detalles... (opcional)"
              rows={5}
              maxLength={500}
            />
            <div className="text-right text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
              {formData.description.length}/500
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-lg text-white"
            style={{
              background: 'var(--primary)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full border-2 border-white/30 border-t-white w-5 h-5 mr-3"></div>
                Guardando...
              </>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Actualizar
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Crear Tarea
                  </>
                )}
              </>
            )}
          </button>
          
          {(isEditing || onCancel) && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="font-medium py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-lg"
              style={{
                background: 'var(--muted)',
                color: 'var(--muted-foreground)'
              }}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
