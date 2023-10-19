// src/tipos/index.d.tsx
declare global {
    interface Window {
      gtag: (command: string, action: string, options: { analytics_storage: string }) => void;
    }
  }
  
  export {}; // Agrega esta línea para convertir el archivo en un módulo ambiental
  