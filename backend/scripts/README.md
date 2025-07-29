# Sistema de Generación Automática de Frases Motivacionales

Este sistema genera automáticamente una nueva frase motivacional cada día y la inserta en la base de datos de Supabase.

## 🚀 Características

- ✅ Generación automática de frases diarias
- ✅ Verificación de duplicados
- ✅ Scheduler automático
- ✅ Logs detallados
- ✅ Fácil integración con IA (OpenAI, Claude, etc.)

## 📁 Estructura

```
backend/scripts/
├── generateDailyPhrase.ts    # Generador principal de frases
├── scheduler.ts              # Scheduler automático
├── tsconfig.json            # Configuración TypeScript
└── README.md                # Esta documentación
```

## 🛠️ Instalación

1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar variables de entorno en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 🎯 Uso

### Generación Manual
```bash
# Generar frase para mañana
npm run generate-phrase

# Ejecutar scheduler (ejecuta cada día a las 00:00)
npm run scheduler

# Testing - generar frase inmediatamente
npm run test-generation
```

### Integración con IA

Para integrar con OpenAI, Claude u otros servicios de IA, modifica la función `generateMotivationalPhrase()` en `generateDailyPhrase.ts`:

```typescript
async function generateMotivationalPhrase(): Promise<{ content: string; author: string; category: string }> {
  // Ejemplo con OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Eres un experto en frases motivacionales. Genera una frase inspiradora y motivacional."
      },
      {
        role: "user", 
        content: "Genera una frase motivacional con su autor y categoría en formato JSON"
      }
    ]
  });
  
  // Procesar respuesta y retornar
  return JSON.parse(response.choices[0].message.content);
}
```

## ⏰ Automatización

### Opción 1: Cron Job (Recomendado)
```bash
# Agregar al crontab para ejecutar cada día a las 00:00
0 0 * * * cd /path/to/project/backend && npm run generate-phrase
```

### Opción 2: Scheduler Node.js
```bash
# Ejecutar el scheduler que se mantiene corriendo
npm run scheduler
```

### Opción 3: Servicios en la nube
- **Vercel Cron Jobs**: Para proyectos desplegados en Vercel
- **GitHub Actions**: Para automatización con GitHub
- **Supabase Edge Functions**: Para ejecutar directamente en Supabase

## 📊 Monitoreo

El sistema genera logs detallados:
- ✅ Frase generada exitosamente
- ⚠️ Frase ya existe para esa fecha
- ❌ Errores de conexión o inserción

## 🔧 Configuración Avanzada

### Personalizar Frases
Edita el array `motivationalPhrases` en `generateDailyPhrase.ts` para agregar tus propias frases.

### Cambiar Horario
Modifica la función `start()` en `scheduler.ts` para cambiar el horario de ejecución.

### Categorías
Agrega nuevas categorías en el array de frases para mejor organización.

## 🚨 Troubleshooting

### Error de conexión a Supabase
- Verificar variables de entorno
- Comprobar credenciales de Supabase
- Verificar conectividad de red

### Frase duplicada
- El sistema verifica automáticamente duplicados
- Si aparece este error, es normal y esperado

### Error de zona horaria
- El sistema usa la zona horaria local del servidor
- Ajustar según tu ubicación si es necesario

## 📈 Próximas Mejoras

- [ ] Integración con OpenAI/Claude
- [ ] Análisis de sentimientos
- [ ] Personalización por usuario
- [ ] Métricas de engagement
- [ ] Backup automático de frases 