'use client';

export default function TestPage() {
  return (
    <div style={{ 
      background: 'var(--background)', 
      color: 'var(--foreground)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1>Página de Prueba</h1>
      <p>Si ves esto, el servidor funciona correctamente.</p>
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <p>Tema oscuro funcionando</p>
      </div>
    </div>
  );
}
