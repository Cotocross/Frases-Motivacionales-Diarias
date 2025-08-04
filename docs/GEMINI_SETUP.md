# 🤖 Configuración de Google Gemini API

Guía completa para configurar Google Gemini API en el proyecto Daily Motivation.

## 📋 Pasos para obtener tu API Key de Gemini:

### 1. **Crear cuenta en Google AI Studio**
- Ve a: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- Inicia sesión con tu cuenta de Google
- Acepta los términos y condiciones

### 2. **Obtener API Key**
- En el dashboard, busca **"Get API key"**
- Haz clic en **"Create API key"**
- Copia la API key generada (formato: `AIzaSy...`)

### 3. **Configurar en GitHub Variables**
- Ve a tu repositorio en GitHub
- Ve a **Settings** → **Secrets and variables** → **Actions**
- En la pestaña **Variables**, añade:
  - **Nombre:** `GEMINI_API_KEY`
  - **Valor:** Tu API key de Gemini

### 4. **Configurar localmente (opcional)**
Si quieres probar localmente, crea un archivo `.env.local` en la carpeta `frontend/`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima

# Google Gemini (opcional para desarrollo local)
GEMINI_API_KEY=tu-api-key-aqui
```

## 🎯 **Ventajas de Gemini:**

- ✅ **Completamente gratis** para nuestro uso
- ✅ **60 requests por minuto** gratis
- ✅ **Sin límite de tiempo**
- ✅ **Sin tarjeta de crédito** necesaria
- ✅ **Buena calidad** de texto generado
- ✅ **Respuestas en JSON** estructurado
- ✅ **Múltiples idiomas** soportados

## 🔧 **Verificación:**

### Test de conexión con Gemini:
```bash
cd backend
pnpm run test-gemini
```

### Generar frase de prueba:
```bash
cd backend
pnpm run generate-phrase
```

### Verificar variables de entorno:
```bash
cd backend
npx ts-node scripts/test-env.ts
```

## 📊 **Límites y Uso:**

### **Límites Gratuitos:**
- **60 requests por minuto**
- **Sin límite diario**
- **Sin límite mensual**
- **Sin expiración de API key**

### **Nuestro Uso:**
- **1 frase por día** = 1 request/día
- **Máximo 30 requests/mes** (muy por debajo del límite)
- **Uso muy eficiente** de la cuota gratuita

## 🛠️ **Configuración Técnica:**

### **Modelo Utilizado:**
```typescript
// En backend/scripts/generateDailyPhrase.ts
const model = 'gemini-2.0-flash-lite'
```

### **Parámetros de Generación:**
```typescript
generationConfig: {
  temperature: 0.8,        // Creatividad (0-1)
  maxOutputTokens: 200     // Máximo de tokens
}
```

### **Prompt Utilizado:**
```typescript
const prompt = `Genera una frase motivacional única y original en español.
Responde SOLO con un JSON en este formato exacto:
{
  "content": "La frase motivacional aquí",
  "author": "Nombre del autor (puede ser 'Anónimo')",
  "category": "Una categoría como: motivación, éxito, perseverancia, etc."
}

La frase debe ser inspiradora, positiva y motivacional.`
```

## 🔍 **Troubleshooting:**

### **Error 404 - Modelo no encontrado:**
- Verificar que el modelo sea `gemini-2.0-flash-lite`
- Asegurar que la API key sea válida

### **Error de parsing JSON:**
- El sistema limpia automáticamente markdown de la respuesta
- Si falla, usa frase predefinida como fallback

### **Error de rate limit:**
- Muy improbable con nuestro uso
- El sistema tiene fallback automático

## 📝 **Notas Importantes:**

- ✅ **La API key de Gemini es gratuita** y no expira
- ✅ **No necesitas añadir método de pago**
- ✅ **El límite de 60 requests/min es más que suficiente** para 1 frase/día
- ✅ **El sistema tiene fallback automático** si Gemini falla
- ✅ **Las respuestas se limpian automáticamente** de markdown
- ✅ **Se verifica la estructura JSON** antes de usar la respuesta

## 🚀 **Próximas Mejoras:**

- [ ] **Múltiples modelos** de Gemini para variedad
- [ ] **Ajuste dinámico** de parámetros de generación
- [ ] **Categorización automática** más avanzada
- [ ] **Análisis de sentimiento** de las frases generadas
- [ ] **Cache inteligente** para optimizar requests

---

**¡Con Gemini, cada día tendrás una frase única y motivacional! 🌟🤖** 