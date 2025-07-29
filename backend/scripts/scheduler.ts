import { generateDailyPhrase } from './generateDailyPhrase'

/**
 * Scheduler que ejecuta la generación de frases diarias
 * Se puede ejecutar manualmente o configurar como cron job
 */
class DailyPhraseScheduler {
  private intervalId: NodeJS.Timeout | null = null

  /**
   * Inicia el scheduler para ejecutar cada día a las 00:00
   */
  start(): void {
    console.log('🕐 Iniciando scheduler de frases diarias...')
    
    // Calcular tiempo hasta la próxima medianoche
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime()
    
    console.log(`⏰ Próxima ejecución programada para: ${tomorrow.toLocaleString()}`)
    
    // Ejecutar la primera vez después de la medianoche
    setTimeout(() => {
      this.executeDailyGeneration()
      
      // Luego ejecutar cada 24 horas
      this.intervalId = setInterval(() => {
        this.executeDailyGeneration()
      }, 24 * 60 * 60 * 1000) // 24 horas en milisegundos
    }, timeUntilMidnight)
  }

  /**
   * Detiene el scheduler
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      console.log('🛑 Scheduler detenido')
    }
  }

  /**
   * Ejecuta la generación diaria de frases
   */
  private async executeDailyGeneration(): Promise<void> {
    console.log('📅 Ejecutando generación diaria de frases...')
    try {
      await generateDailyPhrase()
      console.log('✅ Generación diaria completada')
    } catch (error) {
      console.error('❌ Error en generación diaria:', error)
    }
  }

  /**
   * Ejecuta la generación inmediatamente (para testing)
   */
  async executeNow(): Promise<void> {
    console.log('⚡ Ejecutando generación inmediata...')
    await this.executeDailyGeneration()
  }
}

// Exportar la instancia del scheduler
export const dailyPhraseScheduler = new DailyPhraseScheduler()

// Si se ejecuta directamente este script
if (require.main === module) {
  // Ejecutar inmediatamente para testing
  dailyPhraseScheduler.executeNow()
    .then(() => {
      console.log('✅ Ejecución inmediata completada')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error en ejecución inmediata:', error)
      process.exit(1)
    })
} 