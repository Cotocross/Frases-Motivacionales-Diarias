# 🚀 Configuración de GitHub Actions para Automatización

Este documento explica cómo configurar GitHub Actions para generar frases motivacionales automáticamente usando **Google Gemini API**.

## 📋 Ventajas de GitHub Actions

✅ **Confiable**: Se ejecuta en servidores de GitHub, no depende de tu PC  
✅ **Gratuito**: 2000 minutos/mes para repositorios públicos  
✅ **Automático**: Se ejecuta según el cronograma configurado  
✅ **Monitoreo**: Logs detallados y notificaciones  
✅ **Manual**: Puedes ejecutar manualmente cuando quieras  

## 🔧 Configuración Paso a Paso

### Paso 1: Configurar Variables en GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Secrets and variables** → **Actions**
4. Haz clic en **Variables** (pestaña)
5. Haz clic en **New repository variable**
6. Agrega estas variables:

#### Variable 1: `SUPABASE_URL`
- **Name**: `SUPABASE_URL`
- **Value**: Tu URL de Supabase (sin comillas)
- Ejemplo: `https://tu-proyecto.supabase.co`

#### Variable 2: `SUPABASE_ANON_KEY`
- **Name**: `SUPABASE_ANON_KEY`
- **Value**: Tu clave anónima de Supabase (sin comillas)
- Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### Variable 3: `SUPABASE_SERVICE_ROLE_KEY`
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Tu clave de servicio de Supabase (sin comillas)
- Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### Variable 4: `GEMINI_API_KEY`
- **Name**: `GEMINI_API_KEY`
- **Value**: Tu API key de Google Gemini (sin comillas)
- Ejemplo: `AIzaSyC...`

### Paso 2: Verificar Workflows

Los archivos de workflow ya están creados en `.github/workflows/`:

- `daily-phrase.yml` - Ejecución automática diaria
- `test-phrase.yml` - Testing manual

### Paso 3: Probar la Configuración

1. Ve a la pestaña **Actions** en tu repositorio
2. Selecciona **Test Generación de Frase**
3. Haz clic en **Run workflow**
4. Selecciona la rama (main/master)
5. Haz clic en **Run workflow**

### Paso 4: Verificar Resultado

1. Espera a que termine la ejecución (2-3 minutos)
2. Haz clic en el job completado
3. Revisa los logs para ver si funcionó
4. Verifica en Supabase que se haya insertado una frase

## ⏰ Configuración del Horario

El workflow se ejecuta automáticamente todos los días a las **00:00 UTC** (8:00 PM hora de Chile).

### Cambiar el horario:

Edita el archivo `.github/workflows/daily-phrase.yml`:

```yaml
on:
  schedule:
    # Formato: minuto hora día mes día_semana
    - cron: '0 0 * * *'  # 00:00 UTC diario
```

### Ejemplos de horarios:

```yaml
# 6:00 AM hora de Chile (10:00 UTC)
- cron: '0 10 * * *'

# 9:00 PM hora de Chile (1:00 UTC del día siguiente)
- cron: '0 1 * * *'

# Cada 12 horas
- cron: '0 */12 * * *'
```

## 📊 Monitoreo y Logs

### Ver logs de ejecución:
1. Ve a **Actions** en tu repositorio
2. Haz clic en el workflow que quieres revisar
3. Haz clic en el job específico
4. Revisa los logs de cada paso

### Logs importantes:
- ✅ **Checkout código**: Descarga el código
- ✅ **Instalar dependencias**: Instala pnpm y dependencias
- ✅ **Configurar variables**: Crea el archivo .env.local
- ✅ **Generar frase**: Ejecuta el script principal
- ✅ **Notificar resultado**: Confirma la finalización

### Verificar en Supabase:
1. Ve a tu panel de Supabase
2. Navega a la tabla `phrases`
3. Verifica que las fechas coincidan con la programación

## 🚨 Troubleshooting

### Error: "Variables not found"
- Verifica que las variables estén configuradas correctamente
- Asegúrate de que los nombres sean exactos: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, y `GEMINI_API_KEY`
- **Importante**: Usa la pestaña **Variables** (no Secrets) en GitHub Actions

### Error: "pnpm not found"
- El workflow ya incluye la instalación de pnpm
- Si persiste, verifica la versión de Node.js

### Error: "Connection failed"
- Verifica que las credenciales de Supabase sean correctas
- Asegúrate de que el proyecto de Supabase esté activo
- Verifica que la API key de Google Gemini sea válida
- Comprueba que tengas saldo disponible en Google AI Studio

### Workflow no se ejecuta automáticamente
- GitHub Actions tiene un retraso de hasta 5 minutos
- Verifica que el cronograma esté configurado correctamente
- Revisa que el repositorio esté público o tengas GitHub Pro

## 🔄 Ejecución Manual

### Ejecutar workflow manualmente:
1. Ve a **Actions** en tu repositorio
2. Selecciona el workflow que quieres ejecutar
3. Haz clic en **Run workflow**
4. Selecciona la rama
5. Haz clic en **Run workflow**

### Workflows disponibles:
- **Test Generación de Frase**: Para testing y verificación
- **Generar Frase Motivacional Diaria**: Para ejecución automática

## 📈 Estadísticas y Métricas

### Ver estadísticas:
1. Ve a **Actions** en tu repositorio
2. Haz clic en el workflow específico
3. Revisa las estadísticas de ejecución

### Métricas disponibles:
- Tiempo de ejecución promedio
- Tasa de éxito/fallo
- Frecuencia de ejecución
- Uso de minutos de GitHub Actions

## 🔒 Seguridad

### Variables seguras:
- Las variables están encriptadas
- Solo son visibles durante la ejecución
- No se almacenan en logs
- Se pueden rotar fácilmente
- **Nota**: Las variables son visibles en los logs, por eso usamos Variables en lugar de Secrets

### Permisos:
- Los workflows solo tienen acceso a tu código
- No pueden acceder a otros repositorios
- Se ejecutan en un entorno aislado

## 🎯 Próximos Pasos

Una vez que GitHub Actions esté funcionando:

1. **Configurar notificaciones** (email, Slack, Discord)
2. **Agregar más workflows** (backup, limpieza)
3. **Optimizar prompts** de Google Gemini para mejores frases
4. **Crear dashboard** de monitoreo
5. **Implementar rollback** automático
6. **Agregar categorización** de frases por tema

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en GitHub Actions
2. Verifica la configuración de variables
3. Prueba el workflow manualmente
4. Consulta la documentación de GitHub Actions
5. Verifica la conectividad con Google Gemini API

---

**¡Tu sistema de frases motivacionales automáticas con GitHub Actions y Google Gemini está listo! 🚀🤖** 