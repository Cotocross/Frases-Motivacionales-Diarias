"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Star, Twitter, Instagram, Github } from "lucide-react"
import { supabase } from '../../backend/supabase/client'

// Componente para crear estrellas individuales
const StarElement = ({
  style,
  filled = false,
  size = "small",
}: { style: React.CSSProperties; filled?: boolean; size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-6 h-6",
  }

  if (filled) {
    return (
      <Star className={`absolute ${sizeClasses[size]} text-golden fill-current animate-twinkle-subtle`} style={style} />
    )
  }

  return <Star className={`absolute ${sizeClasses[size]} text-golden animate-twinkle-subtle`} style={style} />
}

// Componente para estrella fugaz mejorada
const ShootingStar = ({ style, delay }: { style: React.CSSProperties; delay: number }) => {
  return (
    <div
      className="absolute animate-shooting-star opacity-0"
      style={{
        ...style,
        animationDelay: `${delay}s`,
      }}
    >
      {/* Estrella principal con brillo */}
      <div className="relative">
        <Star className="w-4 h-4 text-golden fill-current drop-shadow-lg animate-star-glow" />
        {/* Efecto de brillo adicional */}
        <div className="absolute inset-0 w-4 h-4 bg-golden rounded-full blur-sm opacity-60"></div>
      </div>

      {/* Cola larga y realista */}
      <div className="absolute top-2 -left-16 w-16 h-0.5 bg-gradient-to-r from-transparent via-golden/80 to-golden rounded-full animate-shooting-tail"></div>
      <div className="absolute top-2 -left-12 w-12 h-px bg-gradient-to-r from-transparent via-golden/60 to-golden/90 rounded-full animate-shooting-tail"></div>

      {/* Partículas adicionales */}
      <div className="absolute top-1 -left-8 w-1 h-1 bg-golden rounded-full opacity-80 animate-shooting-particle"></div>
      <div className="absolute top-3 -left-6 w-0.5 h-0.5 bg-golden rounded-full opacity-60 animate-shooting-particle animation-delay-200"></div>
    </div>
  )
}

export default function DailyMotivation() {
  const [currentMessage, setCurrentMessage] = useState({ 
    message: '', 
    author: '',
    created_at: null
  })
  const [isAnimating, setIsAnimating] = useState(false)

  const getMessageFromDB = async (date: string) => {
    try {
      console.log('Buscando frase para la fecha:', date)
      const { data, error } = await supabase
        .from('phrases')
        .select('content, author, created_at')
        .eq('created_at', date)
        .single()

      console.log('Respuesta de Supabase:', { data, error })

      if (error) {
        console.error('Error de Supabase:', error)
        return null
      }
      
      if (data) {
        console.log('Frase encontrada:', data)
        return {
          message: data.content,
          author: data.author.toUpperCase(),
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

  const refreshMessage = async () => {
    console.log('Iniciando refreshMessage')
    if (isAnimating) {
      console.log('Animación en progreso, retornando')
      return
    }
    
    setIsAnimating(true)
    console.log('Obteniendo nueva frase...')
    
    // Calculamos la fecha anterior
    if (currentMessage.created_at) {
      const currentDate = new Date(currentMessage.created_at + 'T12:00:00')
      currentDate.setDate(currentDate.getDate() - 1)
      const previousDate = currentDate.toISOString().split('T')[0]
      
      console.log('Buscando frase para fecha anterior:', previousDate)
      const newMessage = await getMessageFromDB(previousDate)
      console.log('Nueva frase obtenida:', newMessage)
      
    setTimeout(() => {
        if (newMessage) {
          console.log('Actualizando mensaje:', newMessage)
          setCurrentMessage(newMessage)
        }
      setIsAnimating(false)
    }, 400)
    }
  }

  useEffect(() => {
    console.log('Iniciando efecto inicial')
    let mounted = true

    const initializeMessage = async () => {
      console.log('Inicializando mensaje...')
      // Obtener la fecha actual en formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0]
      console.log('Fecha actual:', today)
      
      const message = await getMessageFromDB(today)
      console.log('Mensaje inicial:', message)
      if (mounted && message) {
        setCurrentMessage(message)
      }
    }

    initializeMessage()

    return () => {
      mounted = false
    }
  }, [])

  const formatDate = () => {
    if (!currentMessage.created_at) {
      // Si no hay fecha de la frase, mostrar la fecha actual
    const today = new Date()
    return today.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      }).toUpperCase()
  }

    try {
      // Agregar hora del mediodía para evitar problemas de zona horaria
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

  const shareToTwitter = () => {
    const text = `"${currentMessage.message}" - ${currentMessage.author}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=motivacion,inspiracion,frases`
    window.open(url, "_blank", "width=600,height=400")
  }

  const shareToInstagram = async () => {
    const text = `"${currentMessage.message}"\n\n- ${currentMessage.author}\n\n#motivacion #inspiracion #frases #crecimientopersonal`

    try {
      await navigator.clipboard.writeText(text)
      alert("¡Texto copiado! Pégalo en tu historia o post de Instagram 📱✨")
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("¡Texto copiado! Pégalo en tu historia o post de Instagram 📱✨")
    }
  }

  // Generar posiciones aleatorias para las estrellas
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    filled: Math.random() > 0.6,
    size: Math.random() > 0.7 ? "large" : Math.random() > 0.4 ? "medium" : "small",
    delay: Math.random() * 4,
  }))

  // Generar estrellas fugaces aleatorias
  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    startTop: `${Math.random() * 30}%`,
    startLeft: `${Math.random() * 20}%`,
    delay: Math.random() * 15 + 5, // Entre 5 y 20 segundos
  }))

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center p-4">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
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

      {/* Contenido principal */}
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Header con fecha y hora */}
        <div className="mb-12">
          <h1 className="text-golden text-2xl font-medium tracking-[0.2em] uppercase mb-6">FRASES DE MOTIVACIÓN DEL DIA !</h1>

          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-golden text-base font-light tracking-[0.2em] uppercase">{formatDate()}</p>
          </div>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-golden/40"></div>
            <Star className="w-3 h-3 text-golden fill-current" />
            <div className="w-8 h-px bg-golden/40"></div>
          </div>

          <p className="text-golden text-sm font-light italic tracking-[0.05em] max-w-md mx-auto">
            Una nueva inspiración cada día para iluminar tu camino
          </p>
        </div>

        {/* Mensaje principal */}
        <div
          className={`transition-all duration-500 ease-out ${
            isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          <blockquote className="text-golden text-3xl md:text-4xl lg:text-5xl font-playfair font-light leading-relaxed mb-12 px-8">
            {currentMessage.message}
          </blockquote>

          <cite className="text-golden text-sm font-light tracking-[0.4em] uppercase">{currentMessage.author}</cite>
        </div>

        {/* Botón para nuevo mensaje */}
        <div className="mt-16">
          <Button
            onClick={refreshMessage}
            className="bg-transparent hover:bg-golden/10 text-golden border border-golden/30 hover:border-golden/50 px-8 py-3 text-sm font-light rounded-none tracking-[0.2em] uppercase transition-all duration-300"
            disabled={isAnimating}
          >
            <RefreshCw className={`w-4 h-4 mr-3 ${isAnimating ? "animate-spin" : ""}`} />
            Nueva Inspiración
          </Button>
        </div>

        {/* Botones de compartir */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <span className="text-golden text-xs font-light tracking-[0.2em] uppercase">Compartir</span>
          <div className="flex gap-3">
            <Button
              onClick={shareToTwitter}
              className="bg-transparent hover:bg-blue-500/10 text-golden hover:text-blue-400 border border-golden/20 hover:border-blue-400/50 p-2 rounded-full transition-all duration-300 group"
              title="Compartir en Twitter"
            >
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              onClick={shareToInstagram}
              className="bg-transparent hover:bg-pink-500/10 text-golden hover:text-pink-400 border border-golden/20 hover:border-pink-400/50 p-2 rounded-full transition-all duration-300 group"
              title="Compartir en Instagram"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex justify-center items-center gap-3">
          <a
            href="https://github.com/Cotocross"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden hover:text-golden/80 transition-colors duration-300 text-sm font-light hover:underline"
            title="Ver en GitHub"
          >
            Desarrollado con 💓 por Cotocross @{new Date().getFullYear()}
          </a>
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
