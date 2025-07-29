import { supabase, handleSupabaseError } from '../supabase/client'

export interface Phrase {
  id: string
  content: string
  author: string
  category?: string
  created_at: string
}

export class PhraseModel {
  private static readonly TABLE_NAME = 'phrases'

  /**
   * Get a random phrase from the database
   */
  static async getRandom(): Promise<Phrase | null> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select('*')
        .order('RANDOM()')
        .limit(1)
        .single()
      
      if (error) handleSupabaseError(error)
      return data
    } catch (error) {
      console.error('Error getting random phrase:', error)
      return null
    }
  }

  /**
   * Create a new phrase
   */
  static async create(phrase: Omit<Phrase, 'id' | 'created_at'>): Promise<Phrase> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .insert([phrase])
        .select()
        .single()
      
      if (error) handleSupabaseError(error)
      if (!data) throw new Error('No data returned after creating phrase')
      return data
    } catch (error) {
      console.error('Error creating phrase:', error)
      throw error
    }
  }

  /**
   * Get all phrases
   */
  static async getAll(): Promise<Phrase[]> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) handleSupabaseError(error)
      return data || []
    } catch (error) {
      console.error('Error getting all phrases:', error)
      return []
    }
  }

  /**
   * Delete a phrase
   */
  static async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.TABLE_NAME)
        .delete()
        .eq('id', id)
      
      if (error) handleSupabaseError(error)
    } catch (error) {
      console.error('Error deleting phrase:', error)
      throw error
    }
  }
} 