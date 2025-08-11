# 🚀 Despliegue en Vercel

Guía completa para desplegar la aplicación Daily Motivation en Vercel.

## 🌐 **Aplicación Desplegada**
**URL:** [https://frases-motivacionales-diarias.vercel.app](https://frases-motivacionales-diarias.vercel.app)

*¡Aplicación desplegada exitosamente en Vercel!*

## 📋 **Prerrequisitos**

- ✅ Cuenta en [Vercel](https://vercel.com)
- ✅ Proyecto configurado en GitHub
- ✅ Variables de entorno configuradas
- ✅ Vercel CLI instalado (opcional)

## 🛠️ **Configuración Inicial**

### **1. Instalar Vercel CLI (Opcional)**
```bash
npm i -g vercel
```

### **2. Configurar Variables de Entorno**

En tu dashboard de Vercel, agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### **3. Archivo de Configuración**

Crear `vercel.json` en la raíz del proyecto:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

## 🚀 **Métodos de Despliegue**

### **Opción 1: Despliegue Automático desde GitHub (Recomendado)**

1. **Conectar repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Crea cuenta o inicia sesión
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub

2. **Configurar proyecto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

3. **Configurar variables de entorno:**
   - Ve a Settings → Environment Variables
   - Agrega las variables de Supabase

### **Opción 2: Despliegue Manual con CLI**

#### **Desde la carpeta frontend:**
```bash
cd frontend
vercel --prod
```

#### **Desde la raíz del proyecto:**
```bash
vercel --prod
```

## 📝 **Comandos de Vercel**

### **Despliegue:**
```bash
# Despliegue de producción
vercel --prod

# Despliegue de preview
vercel

# Despliegue con configuración específica
vercel --prod --yes
```

### **Gestión:**
```bash
# Ver logs
vercel logs

# Listar proyectos
vercel ls

# Ver información del proyecto
vercel inspect

# Eliminar proyecto
vercel remove
```

### **Variables de Entorno:**
```bash
# Agregar variable
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Listar variables
vercel env ls

# Eliminar variable
vercel env rm NEXT_PUBLIC_SUPABASE_URL
```

## 🔧 **Configuración Avanzada**

### **Configuración de Dominio Personalizado:**

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a Settings → Domains
4. Agrega tu dominio personalizado

### **Configuración de Build:**

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs"
}
```

### **Configuración de Headers:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 🚨 **Solución de Problemas**

### **Error: "Module not found"**
- **Causa:** Importaciones incorrectas entre frontend y backend
- **Solución:** Crear archivo `frontend/lib/supabase.ts` para el cliente de Supabase

### **Error: "Build failed"**
- **Causa:** Variables de entorno no configuradas
- **Solución:** Configurar variables en dashboard de Vercel

### **Error: "Command exited with 1"**
- **Causa:** Dependencias faltantes o errores de TypeScript
- **Solución:** Verificar `package.json` y `tsconfig.json`

### **Error: "Project settings missing"**
- **Causa:** Configuración incorrecta del `vercel.json`
- **Solución:** Simplificar el archivo de configuración

## 📊 **Monitoreo y Analytics**

### **Dashboard de Vercel:**
- **Analytics:** Métricas de visitantes
- **Functions:** Logs de funciones serverless
- **Deployments:** Historial de despliegues
- **Performance:** Métricas de rendimiento

### **Integración con GitHub:**
- **Despliegue automático** en cada push
- **Preview deployments** en pull requests
- **Rollback automático** en caso de errores

## 🔄 **Flujo de Trabajo Recomendado**

1. **Desarrollo local:** `pnpm dev`
2. **Commit y push:** `git add . && git commit -m "mensaje" && git push`
3. **Despliegue automático:** Vercel se despliega automáticamente
4. **Verificación:** Revisar la aplicación en Vercel

## 🎯 **Ventajas de Vercel**

- ✅ **Despliegue automático** desde GitHub
- ✅ **CDN global** para mejor rendimiento
- ✅ **SSL automático** para seguridad
- ✅ **Preview deployments** para testing
- ✅ **Analytics integrados** para métricas
- ✅ **Funciones serverless** incluidas
- ✅ **Dominios personalizados** fáciles de configurar

## 📞 **Soporte**

- **Documentación oficial:** [vercel.com/docs](https://vercel.com/docs)
- **Comunidad:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Soporte:** [vercel.com/support](https://vercel.com/support) 
