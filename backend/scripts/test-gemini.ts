// Script para testear la conexión con Gemini API
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' }) // For local execution

console.log('🔍 Testeando conexión con Gemini API...')
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ No configurada')

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY no configurada')
  process.exit(1)
}

async function testGeminiConnection() {
  const geminiApiKey = process.env.GEMINI_API_KEY
  
  console.log('\n🚀 Probando diferentes URLs de Gemini API...')
  
  // Test 1: URL v1
  console.log('\n📋 Test 1: URL v1')
  try {
    const response1 = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Responde solo con "OK"'
          }]
        }]
      })
    })
    
    console.log('Status:', response1.status)
    console.log('Status Text:', response1.statusText)
    
         if (response1.ok) {
       const data = await response1.json() as any
       console.log('✅ URL v1 funciona correctamente')
       console.log('Respuesta:', JSON.stringify(data, null, 2))
     } else {
      console.log('❌ URL v1 falló')
    }
  } catch (error) {
    console.log('❌ Error con URL v1:', error)
  }
  
  // Test 2: URL v1beta
  console.log('\n📋 Test 2: URL v1beta')
  try {
    const response2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Responde solo con "OK"'
          }]
        }]
      })
    })
    
    console.log('Status:', response2.status)
    console.log('Status Text:', response2.statusText)
    
         if (response2.ok) {
       const data = await response2.json() as any
       console.log('✅ URL v1beta funciona correctamente')
       console.log('Respuesta:', JSON.stringify(data, null, 2))
     } else {
      console.log('❌ URL v1beta falló')
    }
  } catch (error) {
    console.log('❌ Error con URL v1beta:', error)
  }
  
  // Test 3: Verificar API key
  console.log('\n📋 Test 3: Verificar API key')
  try {
    const response3 = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${geminiApiKey}`)
    
    console.log('Status:', response3.status)
    console.log('Status Text:', response3.statusText)
    
         if (response3.ok) {
       const data = await response3.json() as any
       console.log('✅ API key válida')
       console.log('Modelos disponibles:', data.models?.map((m: any) => m.name) || 'No disponible')
     } else {
      console.log('❌ API key inválida o problema de autenticación')
    }
  } catch (error) {
    console.log('❌ Error verificando API key:', error)
  }
}

testGeminiConnection()
  .then(() => {
    console.log('\n✅ Test completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Test falló:', error)
    process.exit(1)
  }) 