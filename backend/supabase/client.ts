import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client configuration
 * During development, we use placeholder values if environment variables are not set
 * IMPORTANT: Replace these values with your actual Supabase project credentials in .env.local
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

/**
 * Initialize Supabase client with configuration
 * This client can be used throughout the application for database operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

/**
 * Type definition for Supabase response
 * Helps with error handling and type checking
 */
export type SupabaseResponse<T> = {
  data: T | null
  error: Error | null
}

/**
 * Helper function to handle Supabase errors
 * @param error - Error object from Supabase operation
 */
export const handleSupabaseError = (error: any) => {
  console.error('Supabase operation failed:', error.message)
  throw new Error(error.message || 'An error occurred with the database operation')
} 