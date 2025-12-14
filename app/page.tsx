"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Volume2, VolumeX, X, Mail, CalendarIcon } from "lucide-react"
import Contador from "@/components/contador"

export default function WeddingCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setEnvelopeFlipped(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true)
    setTimeout(() => setShowCard(true), 1500)
    if (audioRef.current) {
      audioRef.current.play().catch(() => setIsMusicPlaying(false))
      setIsMusicPlaying(true)
    }
  }

  const handleCloseEnvelope = () => {
    setShowCard(false)
    setIsFlipped(false)
    setTimeout(() => setEnvelopeOpened(false), 300)
    if (audioRef.current) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    isMusicPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsMusicPlaying(!isMusicPlaying)
  }

  const createGoogleCalendarUrl = (event: {
    title: string
    location: string
    details: string
    startDate: string
    endDate: string
  }) => {
    const baseUrl = "https://calendar.google.com/calendar/render"
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${event.startDate}/${event.endDate}`,
      details: event.details,
      location: event.location,
    })
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/image.png)" }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <audio
        ref={audioRef}
        loop
        src="/audio/Perfect Symphony (Ed Sheeran-Andrea Bocelli).mp3"
      />

      {/* BOTONES SUPERIORES */}
      {showCard && (
        <>
          <button
            onClick={handleCloseEnvelope}
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-stone-800/90 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-stone-800/90 text-white"
          >
            {isMusicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        </>
      )}

      {/* SOBRE */}
      {!showCard && (
        <div className="relative w-full max-w-4xl px-4">
          <div className="envelope-container" onClick={handleOpenEnvelope}>
            <img
              src="/imagennames.png"
              alt="Postal"
              className="mx-auto w-[260px] sm:w-[420px] md:w-[700px]"
            />

            {/*
            <div className="envelope-address">
              <p className="calligraphy-text"></p>
            </div>
            */}

            <button className="envelope-button">
              <img
                src="/sello.png"
                alt="Open"
                className="w-20 h-20 md:w-28 md:h-28 object-contain"
              />
            </button>
          </div>
        </div>
      )}

      {/* TARJETA */}
      {showCard && (
        <div className="w-full max-w-5xl px-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* PORTADA */}
              <Card
                className="w-full bg-white shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img src="/wedding1.png" className="w-full h-full object-cover" />
              </Card>

              {/* CONTENIDO */}
              <Card
                className="absolute inset-0 w-full bg-white shadow-2xl"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="p-6 space-y-6 overflow-y-auto">
                  <h2 className="text-5xl font-greatv text-center text-[#8B7355]">
                    Nuestra Boda
                  </h2>

                  <Contador />

                  {/* CÓDIGO DE VESTIMENTA */}
                  <div className="space-y-4">
                    <img src="/icons/dress.png" className="mx-auto w-12 h-12" />
                    <h4 className="font-greatv text-center text-2xl">
                      Código de Vestimenta
                    </h4>
                    <p className="text-center">Elegante</p>
                  </div>

                  {/* MENSAJE FINAL */}
                  <div className="space-y-4">
                    <img src="/icons/anillos.png" className="mx-auto w-12 h-12" />
                    <p className="text-center">
                      Esperamos contar con su presencia.
                    </p>
                    <h4 className="font-greatv text-center text-2xl">
                      ¡Muchas Gracias!
                    </h4>
                  </div>

                  <Button className="w-full" onClick={() => window.open("https://wa.link/6drmce")}>
                    <Mail className="mr-2" />
                    Confirmar Asistencia
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
