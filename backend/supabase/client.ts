import { createClient } from '@supabase/supabase-js'

// ============================================================================
// CONFIGURACIÓN DEL CLIENTE SUPABASE
// ============================================================================
// Este archivo configura la conexión con Supabase para toda la aplicación
// Durante el desarrollo, usamos valores placeholder si las variables de entorno no están configuradas
// IMPORTANTE: Reemplaza estos valores con tus credenciales reales de Supabase en .env.local

/**
 * Configuración de URL y clave de Supabase
 * Prioriza las variables de entorno en este orden:
 * 1. SUPABASE_URL (para scripts del backend/GitHub Actions)
 * 2. NEXT_PUBLIC_SUPABASE_URL (para el frontend Next.js)
 * 3. Valor por defecto (solo para desarrollo)
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// ============================================================================
// LOGS DE DEPURACIÓN
// ============================================================================
// Estos logs ayudan a verificar que las variables de entorno se están cargando correctamente
console.log('Supabase URL:', supabaseUrl)
console.log('Using default URL:', supabaseUrl === 'https://your-project.supabase.co')

// ============================================================================
// CLIENTE SUPABASE PRINCIPAL
// ============================================================================
/**
 * Inicializa el cliente de Supabase con la configuración especificada
 * Este cliente puede ser usado en toda la aplicación para operaciones de base de datos
 * 
 * Configuración de autenticación:
 * - persistSession: true - Mantiene la sesión activa entre recargas
 * - autoRefreshToken: true - Renueva automáticamente el token cuando expira
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Persistir sesión en localStorage
    autoRefreshToken: true, // Renovar token automáticamente
  },
})

// ============================================================================
// TIPOS Y UTILIDADES
// ============================================================================

/**
 * Definición de tipo para respuestas de Supabase
 * Ayuda con el manejo de errores y verificación de tipos
 * 
 * @template T - Tipo de datos que se espera en la respuesta
 */
export type SupabaseResponse<T> = {
  data: T | null // Datos de la respuesta (puede ser null si hay error)
  error: Error | null // Objeto de error (null si la operación fue exitosa)
}

/**
 * Función auxiliar para manejar errores de Supabase de manera consistente
 * Registra el error en la consola y lanza una excepción con un mensaje descriptivo
 * 
 * @param error - Objeto de error de una operación de Supabase
 * @throws Error - Lanza una excepción con el mensaje de error
 */
export const handleSupabaseError = (error: any) => {
  console.error('Supabase operation failed:', error.message)
  throw new Error(error.message || 'An error occurred with the database operation')
} 