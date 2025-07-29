# 🌟 Daily Motivation - Sistema de Frases Motivacionales

Una aplicación web moderna que genera y muestra frases motivacionales diarias, con automatización completa usando GitHub Actions y Supabase.

## 🚀 Características

- ✅ **Frontend Moderno**: Next.js 14 con TypeScript y Tailwind CSS
- ✅ **Backend Automatizado**: Generación diaria de frases con GitHub Actions
- ✅ **Base de Datos**: Supabase con PostgreSQL
- ✅ **Diseño Responsivo**: Interfaz elegante y moderna
- ✅ **Navegación Temporal**: Botón "Nueva Inspiración" para ver frases anteriores
- ✅ **Automatización**: Generación automática de frases diarias
- ✅ **Monitoreo**: Logs detallados y verificación de estado

## 📁 Estructura del Proyecto

```
daily-motivation/
├── frontend/                 # Aplicación Next.js
│   ├── app/                 # Páginas y componentes
│   ├── components/          # Componentes UI
│   ├── lib/                 # Utilidades
│   └── middleware.ts        # Middleware de Supabase
├── backend/                 # Scripts de automatización
│   ├── scripts/            # Scripts de generación
│   ├── models/             # Modelos de datos
│   ├── controllers/        # Controladores
│   └── supabase/           # Cliente de Supabase
├── .github/workflows/      # GitHub Actions
└── docs/                   # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, TypeScript, pnpm
- **Base de Datos**: Supabase (PostgreSQL)
- **Automatización**: GitHub Actions
- **Gestión de Paquetes**: pnpm (monorepo)

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- pnpm
- Cuenta de Supabase
- Cuenta de GitHub

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd daily-motivation
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias del monorepo
pnpm install

# O instalar por separado
cd frontend && pnpm install
cd ../backend && pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en el directorio `frontend/`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
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

# O desde frontend
cd frontend && pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🤖 Configuración de Automatización

### GitHub Actions

1. **Configurar Secrets**:
   - Ve a tu repositorio → Settings → Secrets and variables → Actions
   - Agrega `SUPABASE_URL` y `SUPABASE_ANON_KEY`

2. **Probar Workflow**:
   - Ve a Actions → Test Generación de Frase → Run workflow

3. **Verificar Automatización**:
   - El workflow se ejecuta diariamente a las 00:00 UTC
   - Revisa los logs en la pestaña Actions

### Scripts Locales

```bash
# Generar frase manualmente
cd backend && pnpm run generate-phrase

# Ejecutar scheduler local
cd backend && pnpm run scheduler

# Verificar conexión
cd backend && npx ts-node scripts/test-env.ts
```

## 📊 Uso de la Aplicación

### Página Principal

- **Título**: "FRASES DE MOTIVACIÓN DEL DIA !"
- **Frase Actual**: Muestra la frase del día con su autor
- **Fecha**: Muestra la fecha de la frase actual
- **Botón "Nueva Inspiración"**: Navega por frases anteriores

### Navegación

- El botón "Nueva Inspiración" cicla hacia atrás en el tiempo
- Comienza con la frase más reciente
- Muestra frases en orden cronológico inverso

## 🔧 Desarrollo

### Estructura de Archivos Importantes

- `frontend/app/page.tsx` - Página principal
- `backend/scripts/generateDailyPhrase.ts` - Generador de frases
- `.github/workflows/daily-phrase.yml` - Automatización diaria
- `backend/supabase/client.ts` - Cliente de Supabase

### Comandos de Desarrollo

```bash
# Desarrollo frontend
pnpm dev

# Build de producción
pnpm build

# Ejecutar tests
pnpm test

# Generar frase de prueba
cd backend && pnpm run generate-phrase
```

## 📈 Monitoreo y Logs

### GitHub Actions

- Logs detallados en la pestaña Actions
- Verificación de cada paso del proceso
- Notificaciones de éxito/fallo

### Supabase

- Panel de control para ver datos
- Logs de consultas y operaciones
- Métricas de rendimiento

### Local

- Logs en consola durante desarrollo
- Scripts de verificación disponibles

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error de conexión a Supabase**:
   - Verificar variables de entorno
   - Comprobar credenciales
   - Verificar políticas RLS

2. **Workflow no se ejecuta**:
   - Verificar configuración de secrets
   - Revisar logs en GitHub Actions
   - Comprobar cronograma

3. **Frase no aparece**:
   - Verificar inserción en Supabase
   - Comprobar consultas en frontend
   - Revisar logs de la aplicación

### Comandos de Diagnóstico

```bash
# Verificar variables de entorno
cd backend && npx ts-node scripts/test-env.ts

# Verificar políticas RLS
cd backend && npx ts-node scripts/check-policies.ts

# Generar frase de prueba
cd backend && pnpm run generate-phrase
```

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Frases

- Modifica el array en `backend/scripts/generateDailyPhrase.ts`
- Agrega nuevas categorías y autores
- El sistema usará automáticamente las nuevas frases

### Cambiar Horario

- Edita el cronograma en `.github/workflows/daily-phrase.yml`
- Formato: `cron: 'minuto hora día mes día_semana'`

### Backup

- Los datos se almacenan en Supabase
- Backup automático incluido en el plan gratuito
- Exportación manual disponible en el panel

## 🎯 Próximas Mejoras

- [ ] Integración con OpenAI/Claude para frases únicas
- [ ] Sistema de notificaciones (email, Slack)
- [ ] Dashboard de administración
- [ ] Categorización avanzada
- [ ] Métricas de engagement
- [ ] API pública para terceros

## 📞 Soporte

- **Documentación**: Revisa los archivos README y docs/
- **Issues**: Reporta problemas en GitHub Issues
- **Logs**: Revisa logs en GitHub Actions y Supabase

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**¡Disfruta de tu dosis diaria de motivación! 🌟** 