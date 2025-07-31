# 🚀 Configuración de Google Gemini API

## 📋 Pasos para obtener tu API Key de Gemini:

### 1. **Crear cuenta en Google AI Studio**
- Ve a: [aistudio.google.com](https://aistudio.google.com)
- Inicia sesión con tu cuenta de Google
- Acepta los términos y condiciones

### 2. **Obtener API Key**
- En el dashboard, busca **"Get API key"**
- Haz clic en **"Create API key"**
- Copia la API key generada

### 3. **Configurar en GitHub Variables**
- Ve a tu repositorio en GitHub
- Ve a **Settings** → **Secrets and variables** → **Actions**
- En la pestaña **Variables**, añade:
  - **Nombre:** `GEMINI_API_KEY`
  - **Valor:** Tu API key de Gemini

### 4. **Configurar localmente (opcional)**
Si quieres probar localmente, crea un archivo `.env.local` en la carpeta `backend/`:
```env
GEMINI_API_KEY=tu-api-key-aqui
```

## 🎯 **Ventajas de Gemini:**
- ✅ **Completamente gratis** para nuestro uso
- ✅ **60 requests por minuto** gratis
- ✅ **Sin límite de tiempo**
- ✅ **Sin tarjeta de crédito** necesaria
- ✅ **Buena calidad** de texto

## 🔧 **Verificación:**
Una vez configurado, puedes probar ejecutando:
```bash
cd backend
pnpm run test-generation
```

## 📝 **Nota:**
- La API key de Gemini es gratuita y no expira
- No necesitas añadir método de pago
- El límite de 60 requests/min es más que suficiente para 1 frase/día 