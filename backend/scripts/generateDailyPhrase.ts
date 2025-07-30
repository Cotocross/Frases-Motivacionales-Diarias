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
 * Genera una frase motivacional usando IA
 * Por ahora usaremos frases predefinidas, pero puedes integrar con OpenAI, Claude, etc.
 */
async function generateMotivationalPhrase(): Promise<{ content: string; author: string; category: string }> {
  // Array de frases motivacionales predefinidas
  const motivationalPhrases = [
    {
      content: "El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje para continuar.",
      author: "Winston Churchill",
      category: "perseverancia"
    },
    {
      content: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
      author: "John Lennon",
      category: "vida"
    },
    {
      content: "No hay ascensor al éxito, tienes que tomar las escaleras.",
      author: "Zig Ziglar",
      category: "esfuerzo"
    },
    {
      content: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
      author: "Eleanor Roosevelt",
      category: "sueños"
    },
    {
      content: "La única forma de hacer un gran trabajo es amar lo que haces.",
      author: "Steve Jobs",
      category: "pasión"
    },
    {
      content: "No cuentes los días, haz que los días cuenten.",
      author: "Muhammad Ali",
      category: "productividad"
    },
    {
      content: "La vida es 10% lo que te pasa y 90% cómo reaccionas a ello.",
      author: "Charles R. Swindoll",
      category: "actitud"
    },
    {
      content: "Cada amanecer trae nuevas esperanzas y nuevas oportunidades.",
      author: "Anónimo",
      category: "esperanza"
    },
    {
      content: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
      author: "Robert Collier",
      category: "constancia"
    },
    {
      content: "Los sueños no tienen fecha de caducidad.",
      author: "Anónimo",
      category: "sueños"
    }
  ]

  // Seleccionar una frase aleatoria
  const randomIndex = Math.floor(Math.random() * motivationalPhrases.length)
  return motivationalPhrases[randomIndex]
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
async function insertPhrase(phrase: { content: string; author: string; category: string }, date: string): Promise<boolean> {
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
      date: data.created_at
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