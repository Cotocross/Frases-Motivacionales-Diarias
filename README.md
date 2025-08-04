# 🌟 Daily Motivation

> **Aplicación web de frases motivacionales diarias generadas por IA**

Una aplicación moderna que genera automáticamente frases motivacionales diarias utilizando inteligencia artificial (Google Gemini) y las presenta en una interfaz elegante y responsive.

**Autor:** Alejandro Javier Contreras Olate

## 🎯 **Objetivo del Proyecto**

Este proyecto nace con el propósito de crear una fuente diaria de inspiración y motivación utilizando tecnología de inteligencia artificial. El objetivo principal es:

- **🤖 Automatizar la generación** de frases motivacionales únicas y originales
- **📅 Proporcionar inspiración diaria** de manera consistente y confiable
- **🎨 Crear una experiencia visual atractiva** que invite a la reflexión
- **🌐 Democratizar el acceso** a contenido motivacional de calidad
- **🚀 Demostrar las capacidades** de las APIs de IA modernas en aplicaciones web
- **📚 Servir como ejemplo** de arquitectura moderna con Next.js, Supabase y automatización

La aplicación combina la creatividad de la IA con el diseño web moderno para crear una herramienta que inspire y motive a los usuarios cada día.

## 🚀 **Demo en vivo**

**🌐 [https://frases-motivacionales-diarias-c5c4ss5oq.vercel.app](https://frases-motivacionales-diarias-c5c4ss5oq.vercel.app)**

## ✨ **Características principales**

- 🤖 **Generación automática** de frases con IA (Google Gemini)
- 📅 **Actualización diaria** automática via GitHub Actions
- 🎨 **Diseño moderno** y responsive con Tailwind CSS
- 🔄 **Botón "Nueva Inspiración"** para frases de días anteriores
- ☁️ **Base de datos en la nube** con Supabase
- 🚀 **Despliegue automático** en Vercel
- 📱 **Totalmente responsive** para móviles y desktop

## 🛠️ **Stack tecnológico**

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Node.js, TypeScript
- **Base de datos**: Supabase (PostgreSQL)
- **IA**: Google Gemini API
- **Automatización**: GitHub Actions
- **Despliegue**: Vercel
- **Gestión de paquetes**: pnpm (monorepo)

## 📁 **Estructura del proyecto**

```
daily-motivation/
├── frontend/                 # Aplicación Next.js
│   ├── app/                 # App Router de Next.js
│   ├── lib/                 # Utilidades y configuración
│   └── ...
├── backend/                 # Scripts de automatización
│   ├── scripts/            # Scripts de generación de frases
│   ├── models/             # Modelos de datos (MCP Pattern)
│   └── ...
├── docs/                   # 📚 Documentación completa
│   ├── README.md           # Documentación principal
│   ├── GEMINI_SETUP.md     # Configuración de Google Gemini
│   ├── GITHUB_ACTIONS_SETUP.md # Configuración de GitHub Actions
│   ├── MCP_PATTERN.md      # Patrón arquitectónico MCP
│   ├── MONOREPO_SETUP.md   # Configuración del monorepo
│   └── VERCEL_DEPLOYMENT.md # Guía de despliegue en Vercel
├── .github/workflows/      # GitHub Actions
└── ...
```

## 🚀 **Inicio rápido**

### Prerrequisitos

- Node.js 18+ 
- pnpm
- Cuenta en Supabase
- Cuenta en Google AI Studio (Gemini)
- Cuenta en GitHub
- Cuenta en Vercel (opcional)

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd daily-motivation

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp frontend/.env.example frontend/.env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
pnpm dev
```

## 📚 **Documentación detallada**

Consulta la carpeta [`docs/`](./docs/) para documentación completa:

- 📖 **[README.md](./docs/README.md)** - Documentación principal del proyecto
- 🤖 **[GEMINI_SETUP.md](./docs/GEMINI_SETUP.md)** - Configuración de Google Gemini API
- ⚙️ **[GITHUB_ACTIONS_SETUP.md](./docs/GITHUB_ACTIONS_SETUP.md)** - Configuración de automatización
- 🏗️ **[MCP_PATTERN.md](./docs/MCP_PATTERN.md)** - Patrón arquitectónico implementado
- 📦 **[MONOREPO_SETUP.md](./docs/MONOREPO_SETUP.md)** - Configuración del monorepo con pnpm
- 🚀 **[VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)** - Guía completa de despliegue

## 🔧 **Scripts disponibles**

```bash
# Desarrollo
pnpm dev              # Ejecutar frontend en desarrollo
pnpm build            # Construir para producción
pnpm start            # Ejecutar en producción

# Backend
pnpm --filter backend generate-phrase    # Generar frase manualmente
pnpm --filter backend test-generation    # Probar generación de frases
pnpm --filter backend test-gemini        # Probar conexión con Gemini
```

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 **Agradecimientos**

- [Google Gemini](https://ai.google.dev/) por la API de IA
- [Supabase](https://supabase.com/) por la base de datos
- [Vercel](https://vercel.com/) por el hosting
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos

---

**⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!** 