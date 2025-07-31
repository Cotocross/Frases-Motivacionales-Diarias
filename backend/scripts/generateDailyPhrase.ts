// En GitHub Actions, las variables de entorno ya están disponibles
// No necesitamos cargar .env.local
import { supabase } from '../supabase/client'

interface Phrase {
  content: string
  author: string
  category: string
  created_at: string
}

/**
 * Genera una frase motivacional usando OpenAI
 */
async function generateMotivationalPhrase(): Promise<{ content: string; author: string; category: string; isAI: boolean }> {
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    console.log('⚠️ OpenAI API key no configurada, usando frase predefinida')
    // Fallback a frase predefinida si no hay API key
    return {
      content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
      author: "Anónimo",
      category: "esperanza",
      isAI: false
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en motivación y frases inspiradoras. Genera frases motivacionales únicas y originales.'
          },
          {
            role: 'user',
            content: `Genera una frase motivacional única y original en español. 
            Responde SOLO con un JSON en este formato exacto:
            {
              "content": "La frase motivacional aquí",
              "author": "Nombre del autor (puede ser 'Anónimo' si no conoces el autor)",
              "category": "Una categoría como: motivación, éxito, perseverancia, sueños, vida, trabajo, actitud, esperanza, constancia, pasión"
            }
            
            La frase debe ser inspiradora, positiva y motivacional.`
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json() as any
    const content = data.choices[0].message.content
    
    // Intentar parsear el JSON de la respuesta
    try {
      const parsed = JSON.parse(content)
      console.log('🤖 Frase generada exitosamente por IA')
      return {
        content: parsed.content,
        author: parsed.author,
        category: parsed.category,
        isAI: true
      }
    } catch (parseError) {
      console.error('Error parseando respuesta de OpenAI:', parseError)
      console.log('⚠️ Usando frase predefinida por error de parsing')
      // Fallback si no se puede parsear
      return {
        content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
        author: "Anónimo",
        category: "esperanza",
        isAI: false
      }
    }

  } catch (error) {
    console.error('Error generando frase con OpenAI:', error)
    console.log('⚠️ Usando frase predefinida por error de API')
    // Fallback a frase predefinida en caso de error
    return {
      content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
      author: "Anónimo",
      category: "esperanza",
      isAI: false
    }
  }
}

/**
 * Obtiene la fecha de mañana en formato YYYY-MM-DD
 */
function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

/**
 * Verifica si ya existe una frase para la fecha especificada
 */
async function checkIfPhraseExists(date: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .select('id')
      .eq('created_at', date)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error verificando frase existente:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Error verificando frase existente:', error)
    return false
  }
}

/**
 * Inserta una nueva frase en la base de datos
 */
async function insertPhrase(phrase: { content: string; author: string; category: string; isAI: boolean }, date: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .insert([{
        content: phrase.content,
        author: phrase.author,
        category: phrase.category,
        created_at: date
      }])
      .select()
      .single()

    if (error) {
      console.error('Error insertando frase:', error)
      return false
    }

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

/**
 * Función principal que genera e inserta la frase del día siguiente
 */
export async function generateDailyPhrase(): Promise<void> {
  try {
    console.log('🚀 Iniciando generación de frase diaria...')
    
    const tomorrowDate = getTomorrowDate()
    console.log('📅 Fecha objetivo:', tomorrowDate)
    
    // Verificar si ya existe una frase para mañana
    const phraseExists = await checkIfPhraseExists(tomorrowDate)
    if (phraseExists) {
      console.log('⚠️ Ya existe una frase para mañana, saltando generación.')
      return
    }
    
                    // Generar nueva frase
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

// Si se ejecuta directamente este script
if (require.main === module) {
  generateDailyPhrase()
    .then(() => {
      console.log('✅ Script completado')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script falló:', error)
      process.exit(1)
    })
} 