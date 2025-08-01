import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "📋 Lista de Tareas - Academia ForIT",
  description: "Aplicación de gestión de tareas desarrollada con Next.js para el challenge de ingreso a la Academia ForIT 2025",
  keywords: ["tareas", "todo", "next.js", "react", "typescript", "academia", "forit"],
  authors: [{ name: "Academia ForIT Challenge" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
