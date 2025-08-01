import { createClient } from '@supabase/supabase-js'

// ============================================================================
// CLIENTE SUPABASE PARA FRONTEND
// ============================================================================
// Este archivo configura el cliente de Supabase para el frontend
// Usa las variables de entorno NEXT_PUBLIC_ para que estén disponibles en el navegador

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) 