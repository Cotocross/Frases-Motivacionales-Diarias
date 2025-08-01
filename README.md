# 🌟 Daily Motivation - Sistema de Frases Motivacionales con IA

Una aplicación web moderna que genera y muestra frases motivacionales diarias usando **Google Gemini AI**, con automatización completa usando GitHub Actions y Supabase.

## 🌐 **Aplicación Desplegada**
**URL:** [https://frases-motivacionales-diarias-c5c4ss5oq.vercel.app](https://frases-motivacionales-diarias-c5c4ss5oq.vercel.app)

*¡Tu aplicación está online y funcionando!*

## 🚀 Características

- ✅ **Frontend Moderno**: Next.js 14 con TypeScript y Tailwind CSS
- ✅ **IA Integrada**: Google Gemini API para generación de frases únicas
- ✅ **Backend Automatizado**: Generación diaria automática con GitHub Actions
- ✅ **Base de Datos**: Supabase con PostgreSQL
- ✅ **Diseño Elegante**: Interfaz con estrellas animadas y efectos visuales
- ✅ **Navegación Temporal**: Botón "Nueva Inspiración" para ver frases anteriores
- ✅ **Automatización Completa**: Generación automática de frases diarias
- ✅ **Monorepo**: Estructura organizada con pnpm workspaces
- ✅ **Código Documentado**: Comentarios comprehensivos en todo el código
- ✅ **Despliegue en Vercel**: Aplicación desplegada y accesible online

## 📁 Estructura del Proyecto

```
daily-motivation/
├── frontend/                 # Aplicación Next.js
│   ├── app/                 # Páginas y componentes
│   │   └── page.tsx         # Página principal con estrellas animadas
│   ├── components/          # Componentes UI (Radix UI)
│   ├── lib/                 # Utilidades
│   └── tailwind.config.ts   # Configuración de Tailwind CSS
├── backend/                 # Scripts de automatización
│   ├── scripts/            # Scripts de generación con IA
│   │   ├── generateDailyPhrase.ts  # Generador principal con Gemini
│   │   └── test-gemini.ts  # Tests de conexión con Gemini
│   ├── models/             # Modelos de datos (MCP Pattern)
│   │   └── Phrase.ts       # Modelo de frases
│   └── supabase/           # Cliente de Supabase
│       └── client.ts       # Configuración del cliente
├── .github/workflows/      # GitHub Actions
│   ├── daily-phrase.yml    # Automatización diaria
│   └── test-phrase.yml     # Tests manuales
├── package.json            # Configuración del monorepo
└── pnpm-workspace.yaml     # Workspaces de pnpm
```

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos SVG

### **Backend & IA**
- **Node.js** - Runtime de JavaScript
- **Google Gemini API** - Generación de frases con IA
- **TypeScript** - Tipado estático
- **pnpm** - Gestor de paquetes

### **Infraestructura**
- **Supabase** - Base de datos PostgreSQL
- **GitHub Actions** - CI/CD y automatización
- **Vercel** - Despliegue y hosting
- **Monorepo** - Gestión de múltiples paquetes

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20+
- pnpm
- Cuenta de Supabase
- Cuenta de GitHub
- API Key de Google Gemini

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd daily-motivation
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias del monorepo
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en el directorio `frontend/`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima

# Google Gemini (opcional para desarrollo local)
GEMINI_API_KEY=tu_clave_de_gemini
```

### 4. Configurar Base de Datos

En tu panel de Supabase, ejecuta estos comandos SQL:

```sql
-- Crear tabla phrases
CREATE TABLE phrases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT,
  created_at DATE DEFAULT CURRENT_DATE
);

-- Habilitar RLS
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir operaciones
CREATE POLICY "Permitir lectura pública" ON phrases FOR SELECT USING (true);
CREATE POLICY "Permitir inserción desde servicio" ON phrases FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización desde servicio" ON phrases FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminación desde servicio" ON phrases FOR DELETE USING (true);
```

### 5. Ejecutar la Aplicación

```bash
# Desde el directorio raíz
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🤖 Configuración de IA y Automatización

### Google Gemini API

1. **Obtener API Key**:
   - Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crea una nueva API key
   - La API es gratuita con límites generosos

2. **Configurar en GitHub Actions**:
   - Ve a tu repositorio → Settings → Secrets and variables → Actions
   - Agrega `GEMINI_API_KEY` como variable

### GitHub Actions

El proyecto incluye dos workflows:

1. **`daily-phrase.yml`** - Ejecución automática diaria
2. **`test-phrase.yml`** - Tests manuales

#### Configurar Variables de GitHub Actions

Agrega estas variables en tu repositorio:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
GEMINI_API_KEY=tu_clave_de_gemini
```

### Scripts Locales

```bash
# Generar frase manualmente
cd backend && pnpm run generate-phrase

# Testear conexión con Gemini
cd backend && pnpm run test-gemini

# Verificar variables de entorno
cd backend && npx ts-node scripts/test-env.ts
```

## 📊 Uso de la Aplicación

### Página Principal

- **Título**: "FRASES DE MOTIVACIÓN DEL DIA !"
- **Frase Actual**: Muestra la frase del día generada por IA
- **Fecha**: Muestra la fecha de la frase actual
- **Autor**: Muestra el autor de la frase
- **Botón "Nueva Inspiración"**: Navega por frases anteriores

### Características Visuales

- **Estrellas Animadas**: Fondo con estrellas que brillan
- **Estrellas Fugaces**: Efectos visuales dinámicos
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Animaciones Suaves**: Transiciones elegantes entre frases

### Navegación

- El botón "Nueva Inspiración" muestra frases de días anteriores
- Comienza con la frase más reciente disponible
- Muestra frases en orden cronológico inverso
- Evita mostrar la misma frase consecutivamente

## 🔧 Desarrollo

### Estructura de Archivos Importantes

- `frontend/app/page.tsx` - Página principal con estrellas animadas
- `backend/scripts/generateDailyPhrase.ts` - Generador de frases con Gemini
- `.github/workflows/daily-phrase.yml` - Automatización diaria
- `backend/supabase/client.ts` - Cliente de Supabase
- `backend/models/Phrase.ts` - Modelo de datos (MCP Pattern)

### Comandos de Desarrollo

```bash
# Desarrollo frontend
pnpm dev

# Build de producción
pnpm build

# Generar frase de prueba
cd backend && pnpm run generate-phrase

# Testear conexión con Gemini
cd backend && pnpm run test-gemini
```

### Despliegue en Vercel

```bash
# Despliegue de producción
vercel --prod

# Despliegue de preview
vercel

# Ver logs
vercel logs

# Listar proyectos
vercel ls
```

#### Configuración de Variables en Vercel

Agrega estas variables en tu dashboard de Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 📈 Monitoreo y Logs

### GitHub Actions

- **Logs detallados** en la pestaña Actions
- **Verificación de cada paso** del proceso
- **Notificaciones de éxito/fallo**
- **Tests automáticos** de conexión

### Supabase

- **Panel de control** para ver datos
- **Logs de consultas** y operaciones
- **Métricas de rendimiento**
- **Backup automático**

### Local

- **Logs en consola** durante desarrollo
- **Scripts de verificación** disponibles
- **Tests de conexión** con APIs

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error de conexión a Supabase**:
   ```bash
   # Verificar variables de entorno
   cd backend && npx ts-node scripts/test-env.ts
   ```

2. **Error con Gemini API**:
   ```bash
   # Testear conexión con Gemini
   cd backend && pnpm run test-gemini
   ```

3. **Workflow no se ejecuta**:
   - Verificar configuración de variables en GitHub
   - Revisar logs en GitHub Actions
   - Comprobar cronograma en workflow

4. **Frase no aparece**:
   - Verificar inserción en Supabase
   - Comprobar consultas en frontend
   - Revisar logs de la aplicación

### Comandos de Diagnóstico

```bash
# Verificar variables de entorno
cd backend && npx ts-node scripts/test-env.ts

# Testear Gemini API
cd backend && pnpm run test-gemini

# Generar frase de prueba
cd backend && pnpm run generate-phrase

# Verificar conexión a Supabase
cd backend && npx ts-node scripts/test-supabase.ts
```

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Configuración de IA

- Modifica el prompt en `backend/scripts/generateDailyPhrase.ts`
- Ajusta parámetros como `temperature` y `maxOutputTokens`
- Agrega nuevas categorías de frases

### Cambiar Horario de Automatización

- Edita el cronograma en `.github/workflows/daily-phrase.yml`
- Formato: `cron: 'minuto hora día mes día_semana'`
- Ejemplo: `'0 0 * * *'` = todos los días a medianoche UTC

### Backup y Recuperación

- **Datos**: Se almacenan en Supabase con backup automático
- **Código**: Versionado en GitHub
- **Configuración**: Variables de entorno en GitHub Actions

## 🎯 Funcionalidades Implementadas

- ✅ **Generación con IA**: Google Gemini API
- ✅ **Automatización diaria**: GitHub Actions
- ✅ **Base de datos**: Supabase PostgreSQL
- ✅ **Frontend elegante**: Next.js con animaciones
- ✅ **Monorepo**: pnpm workspaces
- ✅ **Despliegue en Vercel**: Aplicación online y accesible
- ✅ **Código documentado**: Comentarios comprehensivos
- ✅ **Tests de conexión**: Verificación de APIs
- ✅ **Diseño responsivo**: Adaptable a todos los dispositivos

## 🚀 Próximas Mejoras

- [ ] **Dashboard de administración** para gestionar frases
- [ ] **Sistema de notificaciones** (email, Slack, Discord)
- [ ] **Categorización avanzada** de frases
- [ ] **Métricas de engagement** y estadísticas
- [ ] **API pública** para integraciones de terceros
- [ ] **Modo oscuro/claro** en la interfaz
- [ ] **Exportación de frases** en diferentes formatos
- [ ] **Sistema de favoritos** para usuarios

## 📞 Soporte

- **Documentación**: Revisa los archivos README y comentarios en el código
- **Issues**: Reporta problemas en GitHub Issues
- **Logs**: Revisa logs en GitHub Actions y Supabase
- **Tests**: Ejecuta los scripts de verificación incluidos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**¡Disfruta de tu dosis diaria de motivación generada por IA! 🌟🤖** 