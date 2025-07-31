// ============================================================================
// SCRIPT: generateDailyPhrase.ts - Generación automática de frases motivacionales
// ============================================================================
// Este script se ejecuta diariamente para generar una nueva frase motivacional
// usando Google Gemini API y la inserta en la base de datos para el día siguiente
// 
// En GitHub Actions, las variables de entorno ya están disponibles
// No necesitamos cargar .env.local

import { supabase } from '../supabase/client'

// ============================================================================
// INTERFAZ: Phrase - Estructura de una frase en la base de datos
// ============================================================================
interface Phrase {
  content: string // Contenido de la frase motivacional
  author: string // Autor de la frase
  category: string // Categoría (motivación, éxito, etc.)
  created_at: string // Fecha de creación
}

// ============================================================================
// FUNCIÓN: generateMotivationalPhrase - Genera frase usando Google Gemini API
// ============================================================================
/**
 * Genera una frase motivacional única usando la API de Google Gemini
 * Si la API falla o no está configurada, usa una frase predefinida como fallback
 * 
 * @returns Promise<{content: string, author: string, category: string, isAI: boolean}>
 * - content: Texto de la frase motivacional
 * - author: Autor de la frase
 * - category: Categoría de la frase
 * - isAI: true si fue generada por IA, false si es predefinida
 */
async function generateMotivationalPhrase(): Promise<{ content: string; author: string; category: string; isAI: boolean }> {
  // Obtener la clave API de Gemini desde variables de entorno
  const geminiApiKey = process.env.GEMINI_API_KEY

  // Verificar si la API key está configurada
  if (!geminiApiKey) {
    console.log('⚠️ Gemini API key no configurada, usando frase predefinida')
    // Fallback a frase predefinida si no hay API key
    return {
      content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
      author: "Anónimo",
      category: "esperanza",
      isAI: false // Marcar como no generada por IA
    }
  }

  try {
    // Realizar petición a la API de Google Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Genera una frase motivacional única y original en español. 
            Responde SOLO con un JSON en este formato exacto:
            {
              "content": "La frase motivacional aquí",
              "author": "Nombre del autor (puede ser 'Anónimo' si no conoces el autor)",
              "category": "Una categoría como: motivación, éxito, perseverancia, sueños, vida, trabajo, actitud, esperanza, constancia, pasión"
            }
            
            La frase debe ser inspiradora, positiva y motivacional.`
          }]
        }],
        generationConfig: {
          temperature: 0.8, // Creatividad de la respuesta (0-1)
          maxOutputTokens: 200 // Máximo de tokens en la respuesta
        }
      })
    })

    // Verificar si la petición fue exitosa
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    // Parsear la respuesta JSON de Gemini
    const data = await response.json() as any
    const content = data.candidates[0].content.parts[0].text
    
    // Intentar parsear el JSON de la respuesta de Gemini
    try {
      // Limpiar la respuesta de markdown si viene con ```json
      let cleanContent = content.trim()
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      // Parsear el JSON limpio
      const parsed = JSON.parse(cleanContent)
      console.log('🤖 Frase generada exitosamente por IA (Gemini)')
      return {
        content: parsed.content,
        author: parsed.author,
        category: parsed.category,
        isAI: true // Marcar como generada por IA
      }
    } catch (parseError) {
      console.error('Error parseando respuesta de Gemini:', parseError)
      console.log('⚠️ Usando frase predefinida por error de parsing')
      // Fallback si no se puede parsear el JSON
      return {
        content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
        author: "Anónimo",
        category: "esperanza",
        isAI: false
      }
    }

  } catch (error) {
    console.error('Error generando frase con Gemini:', error)
    console.log('⚠️ Usando frase predefinida por error de API')
    // Fallback a frase predefinida en caso de error de red o API
    return {
      content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
      author: "Anónimo",
      category: "esperanza",
      isAI: false
    }
  }
}

// ============================================================================
// FUNCIÓN: getTomorrowDate - Obtiene la fecha de mañana
// ============================================================================
/**
 * Obtiene la fecha de mañana en formato YYYY-MM-DD
 * Esta fecha se usa para insertar la frase en la base de datos
 * 
 * @returns string - Fecha de mañana en formato YYYY-MM-DD
 */
function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1) // Agregar un día
  return tomorrow.toISOString().split('T')[0] // Obtener solo la fecha sin hora
}

// ============================================================================
// FUNCIÓN: checkIfPhraseExists - Verifica si ya existe una frase para una fecha
// ============================================================================
/**
 * Verifica si ya existe una frase en la base de datos para la fecha especificada
 * Evita duplicados y permite re-ejecutar el script sin problemas
 * 
 * @param date - Fecha en formato YYYY-MM-DD
 * @returns Promise<boolean> - true si existe, false si no
 */
async function checkIfPhraseExists(date: string): Promise<boolean> {
  try {
    // Consultar la base de datos para verificar si existe una frase
    const { data, error } = await supabase
      .from('phrases')
      .select('id') // Solo necesitamos el ID para verificar existencia
      .eq('created_at', date) // Filtrar por fecha exacta
      .single() // Obtener un solo registro

    // PGRST116 = no rows returned (no hay registros)
    if (error && error.code !== 'PGRST116') {
      console.error('Error verificando frase existente:', error)
      return false
    }

    return !!data // Retornar true si hay datos, false si no
  } catch (error) {
    console.error('Error verificando frase existente:', error)
    return false
  }
}

// ============================================================================
// FUNCIÓN: insertPhrase - Inserta una nueva frase en la base de datos
// ============================================================================
/**
 * Inserta una nueva frase en la tabla 'phrases' de Supabase
 * 
 * @param phrase - Objeto con los datos de la frase
 * @param date - Fecha para la cual se inserta la frase
 * @returns Promise<boolean> - true si se insertó correctamente, false si hubo error
 */
async function insertPhrase(phrase: { content: string; author: string; category: string; isAI: boolean }, date: string): Promise<boolean> {
  try {
    // Insertar la frase en la base de datos
    const { data, error } = await supabase
      .from('phrases')
      .insert([{
        content: phrase.content,
        author: phrase.author,
        category: phrase.category,
        created_at: date
      }])
      .select() // Seleccionar los datos insertados
      .single() // Obtener un solo registro

    if (error) {
      console.error('Error insertando frase:', error)
      return false
    }

    // Mostrar información de la frase insertada
    console.log('✅ Frase insertada exitosamente:', {
      content: data.content,
      author: data.author,
      date: data.created_at,
      isAI: phrase.isAI ? '🤖 Generada por IA' : '📝 Frase predefinida'
    })
    return true
  } catch (error) {
    console.error('Error insertando frase:', error)
    return false
  }
}

// ============================================================================
// FUNCIÓN PRINCIPAL: generateDailyPhrase - Orquesta todo el proceso
// ============================================================================
/**
 * Función principal que coordina todo el proceso de generación e inserción
 * de la frase del día siguiente. Esta función se ejecuta diariamente.
 * 
 * Proceso:
 * 1. Obtiene la fecha de mañana
 * 2. Verifica si ya existe una frase para esa fecha
 * 3. Genera una nueva frase usando IA o fallback
 * 4. Inserta la frase en la base de datos
 * 
 * @returns Promise<void>
 */
export async function generateDailyPhrase(): Promise<void> {
  try {
    console.log('🚀 Iniciando generación de frase diaria...')
    
    // Obtener la fecha de mañana
    const tomorrowDate = getTomorrowDate()
    console.log('📅 Fecha objetivo:', tomorrowDate)
    
    // Verificar si ya existe una frase para mañana
    const phraseExists = await checkIfPhraseExists(tomorrowDate)
    if (phraseExists) {
      console.log('⚠️ Ya existe una frase para mañana, saltando generación.')
      return
    }
    
    // Generar nueva frase usando IA o fallback
    console.log('🤖 Generando frase motivacional...')
    const newPhrase = await generateMotivationalPhrase()
    
    // Mostrar el tipo de frase generada
    if (newPhrase.isAI) {
      console.log('🎯 Frase generada por IA')
    } else {
      console.log('📝 Usando frase predefinida')
    }

    // Insertar en la base de datos
    console.log('💾 Insertando frase en la base de datos...')
    const success = await insertPhrase(newPhrase, tomorrowDate)
    
    if (success) {
      console.log('🎉 Frase diaria generada e insertada exitosamente!')
    } else {
      console.error('❌ Error al insertar la frase')
    }
    
  } catch (error) {
    console.error('❌ Error en generateDailyPhrase:', error)
  }
}

// ============================================================================
// EJECUCIÓN DIRECTA DEL SCRIPT
// ============================================================================
// Si se ejecuta directamente este script (no importado como módulo)
if (require.main === module) {
  generateDailyPhrase()
    .then(() => {
      console.log('✅ Script completado')
      process.exit(0) // Salir con código de éxito
    })
    .catch((error) => {
      console.error('❌ Script falló:', error)
      process.exit(1) // Salir con código de error
    })
} 