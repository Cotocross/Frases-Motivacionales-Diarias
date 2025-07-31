# 📦 Configuración del Monorepo

Guía completa para entender y trabajar con la estructura de monorepo del proyecto Daily Motivation.

## 🏗️ Estructura del Monorepo

```
daily-motivation/
├── package.json              # Configuración raíz del monorepo
├── pnpm-workspace.yaml       # Definición de workspaces
├── frontend/                 # Aplicación Next.js
│   ├── package.json         # Dependencias del frontend
│   ├── app/                 # Páginas y componentes
│   ├── components/          # Componentes UI
│   └── tailwind.config.ts   # Configuración de Tailwind
├── backend/                 # Scripts de automatización
│   ├── package.json         # Dependencias del backend
│   ├── scripts/            # Scripts de generación
│   ├── models/             # Modelos de datos
│   └── supabase/           # Cliente de Supabase
└── .github/workflows/      # GitHub Actions
```

## 🎯 Beneficios del Monorepo

### **Gestión Centralizada:**
- ✅ **Un solo repositorio** para todo el proyecto
- ✅ **Dependencias compartidas** cuando sea necesario
- ✅ **Scripts centralizados** desde la raíz
- ✅ **Versionado unificado** del proyecto

### **Desarrollo Eficiente:**
- ✅ **Instalación rápida** con pnpm
- ✅ **Comandos simplificados** desde la raíz
- ✅ **Hot reload** entre frontend y backend
- ✅ **Tests integrados** en un solo lugar

## 🛠️ Configuración de pnpm

### **Archivo `package.json` (raíz):**
```json
{
  "name": "daily-motivation-root",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev": "pnpm --filter frontend dev",
    "build": "pnpm --filter frontend build",
    "start": "pnpm --filter frontend start"
  }
}
```

### **Archivo `pnpm-workspace.yaml`:**
```yaml
packages:
  - 'frontend'
  - 'backend'
```

## 🚀 Comandos del Monorepo

### **Desde la raíz del proyecto:**

```bash
# Instalar todas las dependencias
pnpm install

# Ejecutar frontend en desarrollo
pnpm dev

# Build de producción
pnpm build

# Ejecutar servidor de producción
pnpm start
```

### **Comandos específicos por workspace:**

```bash
# Frontend
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend start

# Backend
pnpm --filter backend generate-phrase
pnpm --filter backend test-gemini
```

## 📦 Gestión de Dependencias

### **Dependencias Compartidas:**
- `@supabase/supabase-js` - Usado en frontend y backend
- `typescript` - Configuración compartida
- `@types/node` - Tipos compartidos

### **Dependencias Específicas:**

#### **Frontend:**
- `next` - Framework de React
- `react` - Biblioteca de UI
- `tailwindcss` - Framework CSS
- `@radix-ui/*` - Componentes UI

#### **Backend:**
- `ts-node` - Ejecutar TypeScript
- `dotenv` - Variables de entorno
- `@types/node` - Tipos de Node.js

## 🔧 Configuración de TypeScript

### **Configuración Compartida:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  }
}
```

## 🎨 Configuración de Tailwind CSS

### **Configuración en `frontend/tailwind.config.ts`:**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... más colores
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
```

## 🔄 Flujo de Desarrollo

### **1. Instalación Inicial:**
```bash
git clone <repositorio>
cd daily-motivation
pnpm install
```

### **2. Desarrollo Frontend:**
```bash
# Desde la raíz
pnpm dev

# O específicamente
pnpm --filter frontend dev
```

### **3. Desarrollo Backend:**
```bash
# Generar frase de prueba
pnpm --filter backend generate-phrase

# Testear conexión con Gemini
pnpm --filter backend test-gemini
```

### **4. Build y Deploy:**
```bash
# Build completo
pnpm build

# Servidor de producción
pnpm start
```

## 🧪 Testing y Verificación

### **Scripts de Verificación:**
```bash
# Verificar variables de entorno
cd backend && npx ts-node scripts/test-env.ts

# Testear conexión con Gemini
cd backend && pnpm run test-gemini

# Generar frase de prueba
cd backend && pnpm run generate-phrase
```

### **Verificación de Workspaces:**
```bash
# Listar workspaces
pnpm list --depth=0

# Ver dependencias de un workspace específico
pnpm --filter frontend list
```

## 🚨 Troubleshooting

### **Problemas Comunes:**

#### **1. Error de workspace no encontrado:**
```bash
# Verificar configuración
cat pnpm-workspace.yaml
cat package.json

# Reinstalar dependencias
pnpm install --force
```

#### **2. Dependencias no encontradas:**
```bash
# Limpiar cache
pnpm store prune

# Reinstalar
pnpm install
```

#### **3. Scripts no funcionan:**
```bash
# Verificar scripts disponibles
pnpm run --help

# Ejecutar con filtro específico
pnpm --filter frontend dev
```

## 📝 Mejores Prácticas

### **1. Organización de Archivos:**
- ✅ **Separar claramente** frontend y backend
- ✅ **Compartir solo** lo necesario entre workspaces
- ✅ **Mantener** configuraciones específicas en cada workspace

### **2. Gestión de Dependencias:**
- ✅ **Usar pnpm** para instalación rápida
- ✅ **Evitar duplicación** de dependencias
- ✅ **Mantener** versiones actualizadas

### **3. Scripts y Automatización:**
- ✅ **Centralizar** scripts comunes en la raíz
- ✅ **Usar filtros** para comandos específicos
- ✅ **Documentar** todos los comandos disponibles

## 🚀 Próximas Mejoras

- [ ] **Configuración de ESLint** compartida
- [ ] **Scripts de testing** integrados
- [ ] **Configuración de Prettier** compartida
- [ ] **Docker** para desarrollo y producción
- [ ] **CI/CD** mejorado para monorepo

---

**¡El monorepo hace que el desarrollo sea más eficiente y organizado! 📦✨** 