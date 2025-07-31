"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Star, Twitter, Instagram, Github } from "lucide-react"
import { supabase } from '../../backend/supabase/client'

// ============================================================================
// COMPONENTE: StarElement - Crea estrellas individuales con diferentes tamaños
// ============================================================================
// Props:
// - style: Estilos CSS personalizados para posicionamiento
// - filled: Si la estrella debe estar rellena o solo contorno
// - size: Tamaño de la estrella (small, medium, large)
const StarElement = ({
  style,
  filled = false,
  size = "small",
}: { style: React.CSSProperties; filled?: boolean; size?: "small" | "medium" | "large" }) => {
  // Mapeo de tamaños a clases CSS de Tailwind
  const sizeClasses = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-6 h-6",
  }

  // Renderizar estrella rellena con animación de brillo
  if (filled) {
    return (
      <Star className={`absolute ${sizeClasses[size]} text-golden fill-current animate-twinkle-subtle`} style={style} />
    )
  }

  // Renderizar estrella de contorno con animación de brillo
  return <Star className={`absolute ${sizeClasses[size]} text-golden animate-twinkle-subtle`} style={style} />
}

// ============================================================================
// COMPONENTE: ShootingStar - Crea estrellas fugaces con efectos visuales
// ============================================================================
// Props:
// - style: Estilos CSS para posicionamiento
// - delay: Retraso en segundos para la animación
const ShootingStar = ({ style, delay }: { style: React.CSSProperties; delay: number }) => {
  return (
    <div
      className="absolute animate-shooting-star opacity-0"
      style={{
        ...style,
        animationDelay: `${delay}s`, // Retraso personalizado para cada estrella
      }}
    >
      {/* Estrella principal con efecto de brillo intenso */}
      <div className="relative">
        <Star className="w-4 h-4 text-golden fill-current drop-shadow-lg animate-star-glow" />
        {/* Efecto de brillo adicional con blur */}
        <div className="absolute inset-0 w-4 h-4 bg-golden rounded-full blur-sm opacity-60"></div>
      </div>

      {/* Cola larga y realista con gradiente */}
      <div className="absolute top-2 -left-16 w-16 h-0.5 bg-gradient-to-r from-transparent via-golden/80 to-golden rounded-full animate-shooting-tail"></div>
      <div className="absolute top-2 -left-12 w-12 h-px bg-gradient-to-r from-transparent via-golden/60 to-golden/90 rounded-full animate-shooting-tail"></div>

      {/* Partículas adicionales para mayor realismo */}
      <div className="absolute top-1 -left-8 w-1 h-1 bg-golden rounded-full opacity-80 animate-shooting-particle"></div>
      <div className="absolute top-3 -left-6 w-0.5 h-0.5 bg-golden rounded-full opacity-60 animate-shooting-particle animation-delay-200"></div>
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL: DailyMotivation - Página principal de frases motivacionales
// ============================================================================
export default function DailyMotivation() {
  // Estado para almacenar la frase actual con su autor y fecha de creación
  const [currentMessage, setCurrentMessage] = useState({ 
    message: 'Cargando frase del día...', // Mensaje por defecto mientras carga
    author: '', // Autor de la frase
    created_at: null // Fecha de creación en la base de datos
  })
  
  // Estado para controlar la animación de transición entre frases
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Estado para controlar si está cargando
  const [isLoading, setIsLoading] = useState(true)

  // ============================================================================
  // FUNCIÓN: getMessageFromDB - Obtiene una frase específica de la base de datos
  // ============================================================================
  // Parámetros:
  // - date: Fecha en formato YYYY-MM-DD para buscar la frase
  // Retorna: Objeto con la frase, autor y fecha, o null si no se encuentra
  const getMessageFromDB = async (date: string) => {
    try {
      console.log('Buscando frase para la fecha:', date)
      
      // Consulta a Supabase para obtener frase de una fecha específica
      const { data, error } = await supabase
        .from('phrases') // Tabla de frases en Supabase
        .select('content, author, created_at') // Campos a seleccionar
        .eq('created_at', date) // Filtro por fecha exacta
        .single() // Obtener solo un registro

      console.log('Respuesta de Supabase:', { data, error })

      if (error) {
        console.error('Error de Supabase:', error)
        return null
      }
      
      if (data) {
        console.log('Frase encontrada:', data)
        // Formatear la respuesta para el estado del componente
        return {
          message: data.content,
          author: data.author.toUpperCase(), // Autor en mayúsculas
          created_at: data.created_at
        }
      }
      console.log('No se encontró frase para la fecha:', date)
      return null
    } catch (error) {
      console.error('Error al obtener frase:', error)
      return null
    }
  }

  // ============================================================================
  // FUNCIÓN: refreshMessage - Obtiene una nueva frase aleatoria de días anteriores
  // ============================================================================
  // Esta función se ejecuta cuando el usuario hace clic en "Nueva Inspiración"
  const refreshMessage = async () => {
    console.log('Iniciando refreshMessage')
    
    // Evitar múltiples clics durante la animación
    if (isAnimating) {
      console.log('Animación en progreso, retornando')
      return
    }
    
    setIsAnimating(true) // Iniciar animación de transición
    console.log('Obteniendo nueva frase...')
    
    try {
      // Obtener frases de días anteriores (no la fecha actual)
      const { data, error } = await supabase
        .from('phrases')
        .select('content, author, created_at')
        .lt('created_at', new Date().toISOString().split('T')[0]) // Solo frases de días anteriores
        .order('created_at', { ascending: false }) // Ordenar por fecha descendente
        .limit(20) // Obtener más opciones para variedad

      if (error) {
        console.error('Error obteniendo frases anteriores:', error)
        setIsAnimating(false)
        return
      }
      
      if (data && data.length > 0) {
        // Filtrar frases que no sean la actual para evitar repetición
        const availablePhrases = data.filter(phrase => 
          phrase.created_at !== currentMessage.created_at
        )
        
        if (availablePhrases.length > 0) {
          // Seleccionar una frase aleatoria de las disponibles
          const randomIndex = Math.floor(Math.random() * availablePhrases.length)
          const selectedPhrase = availablePhrases[randomIndex]
          
          console.log('Frase seleccionada:', selectedPhrase)
          
          // Aplicar la nueva frase después de un pequeño delay para la animación
          setTimeout(() => {
            setCurrentMessage({
              message: selectedPhrase.content,
              author: selectedPhrase.author.toUpperCase(),
              created_at: selectedPhrase.created_at
            })
            setIsAnimating(false) // Finalizar animación
          }, 400)
        } else {
          console.log('No hay frases de días anteriores diferentes disponibles')
          setIsAnimating(false)
        }
      } else {
        console.log('No hay frases de días anteriores en la base de datos')
        setIsAnimating(false)
      }
    } catch (error) {
      console.error('Error en refreshMessage:', error)
      setIsAnimating(false)
    }
  }

  // ============================================================================
  // useEffect: Inicialización del componente al cargar la página
  // ============================================================================
  useEffect(() => {
    console.log('Iniciando efecto inicial')
    let mounted = true // Flag para evitar actualizaciones si el componente se desmonta

    const initializeMessage = async () => {
      console.log('Inicializando mensaje...')
      setIsLoading(true) // Iniciar estado de carga
      
      // Obtener la fecha actual en formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0]
      console.log('Fecha actual:', today)
      
      // Buscar la frase del día actual
      const message = await getMessageFromDB(today)
      console.log('Mensaje inicial:', message)
      
      // Si no hay frase para hoy, buscar la más reciente disponible
      if (!message) {
        console.log('No hay frase para hoy, buscando la más reciente...')
        try {
          const { data, error } = await supabase
            .from('phrases')
            .select('content, author, created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (error) {
            console.error('Error obteniendo frase más reciente:', error)
          } else if (data) {
            console.log('Frase más reciente encontrada:', data)
            if (mounted) {
              setCurrentMessage({
                message: data.content,
                author: data.author.toUpperCase(),
                created_at: data.created_at
              })
              setIsLoading(false) // Finalizar carga
            }
            return
          }
        } catch (error) {
          console.error('Error buscando frase más reciente:', error)
        }
      }
      
      // Solo actualizar el estado si el componente sigue montado y hay mensaje
      if (mounted && message) {
        setCurrentMessage(message)
      }
      
      setIsLoading(false) // Finalizar carga
    }

    initializeMessage()

    // Cleanup: marcar como desmontado cuando el componente se destruye
    return () => {
      mounted = false
    }
  }, []) // Array vacío = solo se ejecuta al montar el componente

  // ============================================================================
  // FUNCIÓN: formatDate - Formatea la fecha para mostrar en español
  // ============================================================================
  // Convierte la fecha de la base de datos a formato legible en español
  const formatDate = () => {
    if (!currentMessage.created_at) {
      // Si no hay fecha de la frase, mostrar la fecha actual
      const today = new Date()
      return today.toLocaleDateString("es-ES", {
        weekday: "long", // Día de la semana completo
        year: "numeric", // Año numérico
        month: "long", // Mes completo
        day: "numeric", // Día numérico
      }).toUpperCase() // Convertir a mayúsculas
    }

    try {
      // Agregar hora del mediodía para evitar problemas de zona horaria
      // Esto asegura que la fecha se interprete correctamente
      const date = new Date(currentMessage.created_at + 'T12:00:00')
      return date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).toUpperCase()
    } catch (error) {
      console.error('Error al formatear fecha:', error)
      return ''
    }
  }

  // ============================================================================
  // FUNCIÓN: shareToTwitter - Comparte la frase en Twitter
  // ============================================================================
  const shareToTwitter = () => {
    const text = `"${currentMessage.message}" - ${currentMessage.author}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=motivacion,inspiracion,frases`
    window.open(url, "_blank", "width=600,height=400")
  }

  // ============================================================================
  // FUNCIÓN: shareToInstagram - Copia la frase para compartir en Instagram
  // ============================================================================
  const shareToInstagram = async () => {
    const text = `"${currentMessage.message}"\n\n- ${currentMessage.author}\n\n#motivacion #inspiracion #frases #crecimientopersonal`

    try {
      // Intentar usar la API moderna de clipboard
      await navigator.clipboard.writeText(text)
      alert("¡Texto copiado! Pégalo en tu historia o post de Instagram 📱✨")
    } catch (err) {
      // Fallback para navegadores que no soportan la API moderna
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("¡Texto copiado! Pégalo en tu historia o post de Instagram 📱✨")
    }
  }

  // ============================================================================
  // GENERACIÓN DE ELEMENTOS VISUALES: Estrellas y estrellas fugaces
  // ============================================================================
  
  // Generar 40 estrellas con posiciones y propiedades aleatorias
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`, // Posición vertical aleatoria
    left: `${Math.random() * 100}%`, // Posición horizontal aleatoria
    filled: Math.random() > 0.6, // 40% de probabilidad de estar rellena
    size: Math.random() > 0.7 ? "large" : Math.random() > 0.4 ? "medium" : "small", // Tamaño aleatorio
    delay: Math.random() * 4, // Retraso de animación aleatorio
  }))

  // Generar 3 estrellas fugaces con posiciones y retrasos aleatorios
  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    startTop: `${Math.random() * 30}%`, // Posición inicial vertical
    startLeft: `${Math.random() * 20}%`, // Posición inicial horizontal
    delay: Math.random() * 15 + 5, // Retraso entre 5 y 20 segundos
  }))

  // ============================================================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================================================
  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center p-4">
      {/* ============================================================================
          FONDO ANIMADO: Estrellas y estrellas fugaces
          ============================================================================ */}
      <div className="absolute inset-0">
        {/* Renderizar todas las estrellas de fondo */}
        {stars.map((star) => (
          <StarElement
            key={star.id}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: `${star.delay}s`,
            }}
            filled={star.filled}
            size={star.size as "small" | "medium" | "large"}
          />
        ))}
        
        {/* Renderizar estrellas fugaces */}
        {shootingStars.map((star) => (
          <ShootingStar
            key={`shooting-${star.id}`}
            style={{
              top: star.startTop,
              left: star.startLeft,
            }}
            delay={star.delay}
          />
        ))}
      </div>

      {/* ============================================================================
          CONTENIDO PRINCIPAL: Frase motivacional y controles
          ============================================================================ */}
      <div className="max-w-4xl w-full text-center relative z-10">
        
        {/* ============================================================================
            HEADER: Título, fecha y línea decorativa
            ============================================================================ */}
        <div className="mb-12">
          {/* Título principal de la aplicación */}
          <h1 className="text-golden text-2xl font-medium tracking-[0.2em] uppercase mb-6">FRASES DE MOTIVACIÓN DEL DIA !</h1>

          {/* Fecha formateada en español */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-golden text-base font-light tracking-[0.2em] uppercase">{formatDate()}</p>
          </div>

          {/* Línea decorativa con estrella */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-golden/40"></div>
            <Star className="w-3 h-3 text-golden fill-current" />
            <div className="w-8 h-px bg-golden/40"></div>
          </div>

          {/* Subtítulo descriptivo */}
          <p className="text-golden text-sm font-light italic tracking-[0.05em] max-w-md mx-auto">
            Una nueva inspiración cada día para iluminar tu camino
          </p>
        </div>

        {/* ============================================================================
            MENSAJE PRINCIPAL: Frase motivacional y autor
            ============================================================================ */}
        <div
          className={`transition-all duration-500 ease-out ${
            isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          {/* Frase motivacional con tipografía elegante */}
          <blockquote className="text-golden text-3xl md:text-4xl lg:text-5xl font-playfair font-light leading-relaxed mb-12 px-8">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin mr-4" />
                <span>Cargando frase del día...</span>
              </div>
            ) : (
              currentMessage.message
            )}
          </blockquote>

          {/* Autor de la frase */}
          {!isLoading && currentMessage.author && (
            <cite className="text-golden text-sm font-light tracking-[0.4em] uppercase">{currentMessage.author}</cite>
          )}
        </div>

        {/* ============================================================================
            BOTÓN PRINCIPAL: Nueva Inspiración
            ============================================================================ */}
        <div className="mt-16">
          <Button
            onClick={refreshMessage}
            className="bg-transparent hover:bg-golden/10 text-golden border border-golden/30 hover:border-golden/50 px-8 py-3 text-sm font-light rounded-none tracking-[0.2em] uppercase transition-all duration-300"
            disabled={isAnimating || isLoading} // Deshabilitar durante la animación o carga
          >
            <RefreshCw className={`w-4 h-4 mr-3 ${isAnimating ? "animate-spin" : ""}`} />
            {isLoading ? "Cargando..." : "Nueva Inspiración"}
          </Button>
        </div>

        {/* ============================================================================
            BOTONES DE COMPARTIR: Redes sociales
            ============================================================================ */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <span className="text-golden text-xs font-light tracking-[0.2em] uppercase">Compartir</span>
          <div className="flex gap-3">
            {/* Botón para compartir en Twitter */}
            <Button
              onClick={shareToTwitter}
              className="bg-transparent hover:bg-blue-500/10 text-golden hover:text-blue-400 border border-golden/20 hover:border-blue-400/50 p-2 rounded-full transition-all duration-300 group"
              title="Compartir en Twitter"
            >
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
            
            {/* Botón para compartir en Instagram */}
            <Button
              onClick={shareToInstagram}
              className="bg-transparent hover:bg-pink-500/10 text-golden hover:text-pink-400 border border-golden/20 hover:border-pink-400/50 p-2 rounded-full transition-all duration-300 group"
              title="Compartir en Instagram"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>

        {/* ============================================================================
            FOOTER: Créditos y enlaces
            ============================================================================ */}
        <div className="mt-12 flex justify-center items-center gap-3">
          {/* Enlace al desarrollador */}
          <a
            href="https://github.com/Cotocross"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:text-golden/80 transition-colors duration-300 text-sm font-light hover:underline"
            title="Ver en GitHub"
          >
            Desarrollado con 💓 por Cotocross @{new Date().getFullYear()}
          </a>
          
          {/* Icono de GitHub */}
          <a
            href="https://github.com/Cotocross"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:text-golden/80 transition-colors duration-300 hover:scale-110 transform"
            title="Ver en GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
