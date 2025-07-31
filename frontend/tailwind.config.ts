import type { Config } from "tailwindcss";

// ============================================================================
// CONFIGURACIÓN DE TAILWIND CSS
// ============================================================================
// Este archivo configura Tailwind CSS para el proyecto frontend
// Define colores personalizados, animaciones y utilidades específicas del proyecto

// Nota: Todos los fixtures están configurados para Tailwind v3 como solución interina

const config: Config = {
  // ============================================================================
  // MODO OSCURO
  // ============================================================================
  // Habilita el modo oscuro basado en clases CSS
  // Permite cambiar entre tema claro y oscuro dinámicamente
  darkMode: ["class"],
  
  // ============================================================================
  // CONTENIDO A ESCANEAR
  // ============================================================================
  // Define qué archivos debe escanear Tailwind para generar las clases CSS
  // Solo las clases utilizadas en estos archivos se incluirán en el build final
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",        // Archivos en carpeta pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}",   // Archivos en carpeta components
    "./app/**/*.{js,ts,jsx,tsx,mdx}",          // Archivos en carpeta app (App Router)
    "*.{js,ts,jsx,tsx,mdx}"                    // Archivos en la raíz
  ],
  
  // ============================================================================
  // TEMA PERSONALIZADO
  // ============================================================================
  theme: {
    extend: {
      // ============================================================================
      // COLORES PERSONALIZADOS
      // ============================================================================
      // Define colores usando variables CSS para soporte de temas
      colors: {
        // Colores base del sistema
        background: 'hsl(var(--background))',           // Color de fondo principal
        foreground: 'hsl(var(--foreground))',           // Color de texto principal
        
        // Colores para tarjetas y contenedores
        card: {
          DEFAULT: 'hsl(var(--card))',                  // Fondo de tarjeta
          foreground: 'hsl(var(--card-foreground))'     // Texto en tarjeta
        },
        
        // Colores para popovers y tooltips
        popover: {
          DEFAULT: 'hsl(var(--popover))',               // Fondo de popover
          foreground: 'hsl(var(--popover-foreground))'  // Texto en popover
        },
        
        // Colores primarios del tema
        primary: {
          DEFAULT: 'hsl(var(--primary))',               // Color primario
          foreground: 'hsl(var(--primary-foreground))'  // Texto sobre primario
        },
        
        // Colores secundarios
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',             // Color secundario
          foreground: 'hsl(var(--secondary-foreground))' // Texto sobre secundario
        },
        
        // Colores para elementos silenciados/muted
        muted: {
          DEFAULT: 'hsl(var(--muted))',                 // Fondo muted
          foreground: 'hsl(var(--muted-foreground))'    // Texto muted
        },
        
        // Colores de acento
        accent: {
          DEFAULT: 'hsl(var(--accent))',                // Color de acento
          foreground: 'hsl(var(--accent-foreground))'   // Texto sobre acento
        },
        
        // Colores para acciones destructivas
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',           // Color destructivo
          foreground: 'hsl(var(--destructive-foreground))' // Texto sobre destructivo
        },
        
        // Colores para bordes y elementos de interfaz
        border: 'hsl(var(--border))',                   // Color de borde
        input: 'hsl(var(--input))',                     // Color de input
        ring: 'hsl(var(--ring))',                       // Color de ring/focus
        
        // Colores para gráficos y visualizaciones
        chart: {
          '1': 'hsl(var(--chart-1))',                   // Color de gráfico 1
          '2': 'hsl(var(--chart-2))',                   // Color de gráfico 2
          '3': 'hsl(var(--chart-3))',                   // Color de gráfico 3
          '4': 'hsl(var(--chart-4))',                   // Color de gráfico 4
          '5': 'hsl(var(--chart-5))'                    // Color de gráfico 5
        },
        
        // Colores específicos para sidebar
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',    // Fondo del sidebar
          foreground: 'hsl(var(--sidebar-foreground))', // Texto del sidebar
          primary: 'hsl(var(--sidebar-primary))',       // Color primario del sidebar
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))', // Texto sobre primario
          accent: 'hsl(var(--sidebar-accent))',         // Color de acento del sidebar
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',   // Texto sobre acento
          border: 'hsl(var(--sidebar-border))',         // Borde del sidebar
          ring: 'hsl(var(--sidebar-ring))'              // Ring del sidebar
        }
      },
      
      // ============================================================================
      // BORDER RADIUS PERSONALIZADO
      // ============================================================================
      // Define radios de borde usando variables CSS para consistencia
      borderRadius: {
        lg: 'var(--radius)',                            // Radio grande
        md: 'calc(var(--radius) - 2px)',                // Radio mediano
        sm: 'calc(var(--radius) - 4px)'                 // Radio pequeño
      },
      
      // ============================================================================
      // ANIMACIONES PERSONALIZADAS
      // ============================================================================
      // Define keyframes para animaciones específicas
      keyframes: {
        // Animación para acordeón hacia abajo
        'accordion-down': {
          from: {
            height: '0'                                  // Altura inicial: 0
          },
          to: {
            height: 'var(--radix-accordion-content-height)' // Altura final: contenido
          }
        },
        // Animación para acordeón hacia arriba
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)' // Altura inicial: contenido
          },
          to: {
            height: '0'                                  // Altura final: 0
          }
        }
      },
      
      // ============================================================================
      // CLASES DE ANIMACIÓN
      // ============================================================================
      // Define clases CSS para aplicar las animaciones
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out', // Clase para acordeón abajo
        'accordion-up': 'accordion-up 0.2s ease-out'      // Clase para acordeón arriba
      }
    }
  },
  
  // ============================================================================
  // PLUGINS
  // ============================================================================
  // Plugins adicionales de Tailwind CSS
  plugins: [
    require("tailwindcss-animate") // Plugin para animaciones adicionales
  ],
};

export default config;
