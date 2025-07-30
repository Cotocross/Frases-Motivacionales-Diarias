// En GitHub Actions, las variables de entorno ya están disponibles
// No necesitamos cargar .env.local
console.log('🔍 Verificando variables de entorno...')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Configurada' : '❌ No configurada')
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ No configurada')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configurada' : '❌ No configurada')

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Variables de entorno faltantes')
  process.exit(1)
}

console.log('✅ Todas las variables están configuradas') 