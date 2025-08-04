# 🏗️ Patrón MCP (Model-Controller-Persistence)

Documentación del patrón arquitectónico MCP implementado en el proyecto Daily Motivation.

## 📋 ¿Qué es MCP?

**MCP (Model-Controller-Persistence)** es un patrón arquitectónico que separa la lógica de negocio en tres capas principales:

- **Model**: Maneja los datos y la lógica de negocio
- **Controller**: Gestiona las operaciones y la coordinación
- **Persistence**: Se encarga de la persistencia de datos

## 🏗️ Implementación en Daily Motivation

### **Estructura del Patrón:**

```
backend/
├── models/              # 🎯 MODEL - Lógica de negocio
│   └── Phrase.ts       # Modelo de frases motivacionales
├── supabase/           # 💾 PERSISTENCE - Capa de datos
│   └── client.ts       # Cliente de Supabase
└── scripts/            # 🎮 CONTROLLER - Operaciones
    └── generateDailyPhrase.ts  # Generador de frases
```

## 🎯 MODEL - Capa de Modelo

### **Ubicación:** `backend/models/Phrase.ts`

### **Responsabilidades:**
- ✅ **Definir estructura** de datos
- ✅ **Validar información** de frases
- ✅ **Implementar lógica** de negocio
- ✅ **Manejar errores** específicos del dominio

### **Implementación:**

```typescript
// ============================================================================
// INTERFAZ: Phrase - Define la estructura de una frase motivacional
// ============================================================================
export interface Phrase {
  id: string // Identificador único
  content: string // Contenido de la frase
  author: string // Autor de la frase
  category?: string // Categoría opcional
  created_at: string // Fecha de creación
}

// ============================================================================
// CLASE: PhraseModel - Modelo para operaciones de base de datos
// ============================================================================
export class PhraseModel {
  private static readonly TABLE_NAME = 'phrases'

  // Obtener frase aleatoria
  static async getRandom(): Promise<Phrase | null> {
    // Lógica de negocio para obtener frase aleatoria
  }

  // Crear nueva frase
  static async create(phrase: Omit<Phrase, 'id' | 'created_at'>): Promise<Phrase> {
    // Lógica de negocio para crear frase
  }

  // Obtener todas las frases
  static async getAll(): Promise<Phrase[]> {
    // Lógica de negocio para obtener todas las frases
  }

  // Eliminar frase
  static async delete(id: string): Promise<void> {
    // Lógica de negocio para eliminar frase
  }
}
```

## 💾 PERSISTENCE - Capa de Persistencia

### **Ubicación:** `backend/supabase/client.ts`

### **Responsabilidades:**
- ✅ **Configurar conexión** a la base de datos
- ✅ **Manejar credenciales** y configuración
- ✅ **Proporcionar cliente** para operaciones
- ✅ **Gestionar errores** de conexión

### **Implementación:**

```typescript
// ============================================================================
// CONFIGURACIÓN DEL CLIENTE SUPABASE
// ============================================================================
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// ============================================================================
// UTILIDADES PARA MANEJO DE ERRORES
// ============================================================================
export const handleSupabaseError = (error: any) => {
  console.error('Supabase operation failed:', error.message)
  throw new Error(error.message || 'An error occurred with the database operation')
}
```

## 🎮 CONTROLLER - Capa de Controlador

### **Ubicación:** `backend/scripts/generateDailyPhrase.ts`

### **Responsabilidades:**
- ✅ **Orquestar operaciones** entre capas
- ✅ **Gestionar flujo** de trabajo
- ✅ **Manejar errores** de alto nivel
- ✅ **Coordinar** diferentes servicios

### **Implementación:**

```typescript
// ============================================================================
// FUNCIÓN PRINCIPAL: generateDailyPhrase - Orquesta todo el proceso
// ============================================================================
export async function generateDailyPhrase(): Promise<void> {
  try {
    // 1. Obtener fecha objetivo
    const tomorrowDate = getTomorrowDate()
    
    // 2. Verificar si ya existe frase (usando Model)
    const phraseExists = await checkIfPhraseExists(tomorrowDate)
    
    // 3. Generar nueva frase con IA
    const newPhrase = await generateMotivationalPhrase()
    
    // 4. Insertar en base de datos (usando Model)
    const success = await insertPhrase(newPhrase, tomorrowDate)
    
    // 5. Manejar resultado
    if (success) {
      console.log('🎉 Frase diaria generada e insertada exitosamente!')
    }
  } catch (error) {
    console.error('❌ Error en generateDailyPhrase:', error)
  }
}
```

## 🔄 Flujo de Datos MCP

### **1. Generación de Frase:**

```
CONTROLLER (generateDailyPhrase.ts)
    ↓
MODEL (PhraseModel.create)
    ↓
PERSISTENCE (supabase client)
    ↓
DATABASE (Supabase PostgreSQL)
```

### **2. Obtención de Frase:**

```
FRONTEND (page.tsx)
    ↓
CONTROLLER (getMessageFromDB)
    ↓
MODEL (PhraseModel.getRandom)
    ↓
PERSISTENCE (supabase client)
    ↓
DATABASE (Supabase PostgreSQL)
```

## 🎯 Beneficios del Patrón MCP

### **Separación de Responsabilidades:**
- ✅ **Model**: Solo lógica de negocio
- ✅ **Controller**: Solo coordinación
- ✅ **Persistence**: Solo acceso a datos

### **Mantenibilidad:**
- ✅ **Código organizado** y fácil de entender
- ✅ **Cambios aislados** en cada capa
- ✅ **Testing independiente** por capa

### **Escalabilidad:**
- ✅ **Fácil agregar** nuevas funcionalidades
- ✅ **Cambiar base de datos** sin afectar lógica
- ✅ **Reutilizar** componentes en diferentes contextos

## 🛠️ Implementación Práctica

### **Ejemplo: Agregar Nueva Funcionalidad**

#### **1. Extender el Modelo:**
```typescript
// En PhraseModel
static async getByCategory(category: string): Promise<Phrase[]> {
  // Nueva lógica de negocio
}
```

#### **2. Usar en el Controlador:**
```typescript
// En generateDailyPhrase.ts
const categoryPhrases = await PhraseModel.getByCategory('motivación')
```

#### **3. La Persistencia se mantiene igual:**
```typescript
// El cliente de Supabase sigue siendo el mismo
```

## 🔍 Testing del Patrón MCP

### **Testing por Capa:**

#### **Model Testing:**
```typescript
// Test de lógica de negocio
describe('PhraseModel', () => {
  test('should create phrase with valid data', async () => {
    // Test de creación
  })
  
  test('should handle invalid data', async () => {
    // Test de validación
  })
})
```

#### **Persistence Testing:**
```typescript
// Test de conexión
describe('Supabase Client', () => {
  test('should connect to database', async () => {
    // Test de conexión
  })
})
```

#### **Controller Testing:**
```typescript
// Test de flujo completo
describe('generateDailyPhrase', () => {
  test('should generate and save phrase', async () => {
    // Test de flujo completo
  })
})
```

## 📝 Mejores Prácticas

### **1. Separación Clara:**
- ✅ **No mezclar** responsabilidades entre capas
- ✅ **Usar interfaces** para definir contratos
- ✅ **Mantener** dependencias unidireccionales

### **2. Manejo de Errores:**
- ✅ **Errores específicos** en cada capa
- ✅ **Propagación** de errores hacia arriba
- ✅ **Logging** apropiado en cada nivel

### **3. Testing:**
- ✅ **Test unitario** por capa
- ✅ **Test de integración** entre capas
- ✅ **Mocks** para dependencias externas

## 🚀 Próximas Mejoras

- [ ] **Repository Pattern** para abstraer la persistencia
- [ ] **Service Layer** para lógica de negocio compleja
- [ ] **DTOs** para transferencia de datos
- [ ] **Validation Layer** para validaciones complejas
- [ ] **Event System** para comunicación entre capas

## 📚 Referencias

- **Clean Architecture** - Robert C. Martin
- **Domain-Driven Design** - Eric Evans
- **SOLID Principles** - Robert C. Martin

---

**¡El patrón MCP hace que el código sea más mantenible y escalable! 🏗️✨** 