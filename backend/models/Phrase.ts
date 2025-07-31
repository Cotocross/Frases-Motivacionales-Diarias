import { supabase, handleSupabaseError } from '../supabase/client'

// ============================================================================
// INTERFAZ: Phrase - Define la estructura de una frase motivacional
// ============================================================================
// Esta interfaz define todos los campos que tiene una frase en la base de datos
export interface Phrase {
  id: string // Identificador único de la frase (generado automáticamente por Supabase)
  content: string // Contenido/texto de la frase motivacional
  author: string // Autor de la frase
  category?: string // Categoría opcional (ej: motivación, éxito, perseverancia)
  created_at: string // Fecha de creación en formato ISO string
}

// ============================================================================
// CLASE: PhraseModel - Modelo para operaciones de base de datos con frases
// ============================================================================
// Esta clase implementa el patrón MCP (Model) para manejar todas las operaciones
// relacionadas con la tabla 'phrases' en Supabase
export class PhraseModel {
  // Nombre de la tabla en Supabase (constante privada)
  private static readonly TABLE_NAME = 'phrases'

  // ============================================================================
  // MÉTODO: getRandom - Obtiene una frase aleatoria de la base de datos
  // ============================================================================
  /**
   * Obtiene una frase aleatoria de la tabla 'phrases'
   * Útil para mostrar frases variadas al usuario
   * 
   * @returns Promise<Phrase | null> - La frase aleatoria o null si no hay frases
   */
  static async getRandom(): Promise<Phrase | null> {
    try {
      // Consulta a Supabase para obtener una frase aleatoria
      const { data, error } = await supabase
        .from(this.TABLE_NAME) // Seleccionar tabla 'phrases'
        .select('*') // Seleccionar todos los campos
        .order('RANDOM()') // Ordenar aleatoriamente
        .limit(1) // Limitar a 1 resultado
        .single() // Obtener un solo registro
      
      if (error) handleSupabaseError(error) // Manejar errores de Supabase
      return data // Retornar la frase encontrada
    } catch (error) {
      console.error('Error getting random phrase:', error)
      return null // Retornar null en caso de error
    }
  }

  // ============================================================================
  // MÉTODO: create - Crea una nueva frase en la base de datos
  // ============================================================================
  /**
   * Crea una nueva frase en la tabla 'phrases'
   * Se usa principalmente en la automatización diaria para insertar nuevas frases
   * 
   * @param phrase - Objeto con los datos de la frase (sin id ni created_at)
   * @returns Promise<Phrase> - La frase creada con todos sus campos
   * @throws Error - Si hay un error al crear la frase
   */
  static async create(phrase: Omit<Phrase, 'id' | 'created_at'>): Promise<Phrase> {
    try {
      // Insertar la nueva frase en Supabase
      const { data, error } = await supabase
        .from(this.TABLE_NAME) // Seleccionar tabla 'phrases'
        .insert([phrase]) // Insertar la frase (array con un elemento)
        .select() // Seleccionar todos los campos del registro insertado
        .single() // Obtener un solo registro
      
      if (error) handleSupabaseError(error) // Manejar errores de Supabase
      if (!data) throw new Error('No data returned after creating phrase') // Verificar que se insertó correctamente
      return data // Retornar la frase creada
    } catch (error) {
      console.error('Error creating phrase:', error)
      throw error // Re-lanzar el error para manejo superior
    }
  }

  // ============================================================================
  // MÉTODO: getAll - Obtiene todas las frases de la base de datos
  // ============================================================================
  /**
   * Obtiene todas las frases ordenadas por fecha de creación (más recientes primero)
   * Útil para listar frases o hacer análisis de datos
   * 
   * @returns Promise<Phrase[]> - Array con todas las frases
   */
  static async getAll(): Promise<Phrase[]> {
    try {
      // Consulta a Supabase para obtener todas las frases
      const { data, error } = await supabase
        .from(this.TABLE_NAME) // Seleccionar tabla 'phrases'
        .select('*') // Seleccionar todos los campos
        .order('created_at', { ascending: false }) // Ordenar por fecha descendente (más recientes primero)
      
      if (error) handleSupabaseError(error) // Manejar errores de Supabase
      return data || [] // Retornar array vacío si no hay datos
    } catch (error) {
      console.error('Error getting all phrases:', error)
      return [] // Retornar array vacío en caso de error
    }
  }

  // ============================================================================
  // MÉTODO: delete - Elimina una frase de la base de datos
  // ============================================================================
  /**
   * Elimina una frase específica por su ID
   * Útil para mantenimiento o corrección de datos
   * 
   * @param id - ID único de la frase a eliminar
   * @returns Promise<void> - No retorna datos
   * @throws Error - Si hay un error al eliminar la frase
   */
  static async delete(id: string): Promise<void> {
    try {
      // Eliminar la frase de Supabase por ID
      const { error } = await supabase
        .from(this.TABLE_NAME) // Seleccionar tabla 'phrases'
        .delete() // Operación de eliminación
        .eq('id', id) // Filtro por ID exacto
      
      if (error) handleSupabaseError(error) // Manejar errores de Supabase
    } catch (error) {
      console.error('Error deleting phrase:', error)
      throw error // Re-lanzar el error para manejo superior
    }
  }
} 