import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { supabase } from '../supabase/client'

async function checkPolicies() {
  try {
    console.log('🔍 Verificando políticas RLS de la tabla phrases...')
    
    // Intentar hacer una consulta simple para ver si podemos leer
    const { data: readData, error: readError } = await supabase
      .from('phrases')
      .select('id, content, author, created_at')
      .limit(1)
    
    if (readError) {
      console.error('❌ Error leyendo datos:', readError)
    } else {
      console.log('✅ Lectura exitosa:', readData)
    }
    
    // Intentar insertar un registro de prueba
    const testPhrase = {
      content: 'Frase de prueba para verificar permisos',
      author: 'Sistema',
      category: 'test',
      created_at: '2025-07-30'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('phrases')
      .insert([testPhrase])
      .select()
    
    if (insertError) {
      console.error('❌ Error insertando datos:', insertError)
      console.log('💡 Sugerencia: Necesitas configurar políticas RLS en Supabase')
    } else {
      console.log('✅ Inserción exitosa:', insertData)
      
      // Limpiar el registro de prueba
      if (insertData && insertData[0]) {
        const { error: deleteError } = await supabase
          .from('phrases')
          .delete()
          .eq('id', insertData[0].id)
        
        if (deleteError) {
          console.error('⚠️ Error eliminando registro de prueba:', deleteError)
        } else {
          console.log('✅ Registro de prueba eliminado')
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  checkPolicies()
    .then(() => {
      console.log('✅ Verificación completada')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error en verificación:', error)
      process.exit(1)
    })
} 