"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Volume2,
  VolumeX,
  X,
  Gift,
  Mail,
  CalendarIcon,
} from "lucide-react"
import Contador from "@/components/contador"

export default function WeddingCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  {/* ------------------ EFECTOS ------------------ */}

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvelopeFlipped(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  {/* ------------------ HANDLERS ------------------ */}

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true)
    setTimeout(() => {
      setShowCard(true)
    }, 1500)

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsMusicPlaying(false)
      })
      setIsMusicPlaying(true)
    }
  }

  const handleCloseEnvelope = () => {
    setShowCard(false)
    setIsFlipped(false)

    setTimeout(() => {
      setEnvelopeOpened(false)
    }, 300)

    if (audioRef.current) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsMusicPlaying(!isMusicPlaying)
  }

  {/* ------------------ CALENDAR ------------------ */}

  const createGoogleCalendarUrl = (eventDetails: {
    title: string
    location: string
    details: string
    startDate: string
    endDate: string
  }) => {
    const baseUrl = "https://calendar.google.com/calendar/render"

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventDetails.title,
      dates: `${eventDetails.startDate}/${eventDetails.endDate}`,
      details: eventDetails.details,
      location: eventDetails.location,
    })

    return `${baseUrl}?${params.toString()}`
  }

  { /* ------------------ PDF ------------------ */}

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      const html2pdf = (await import("html2pdf.js")).default

      const element = document.createElement("div")
      element.style.width = "800px"
      element.style.padding = "40px"
      element.style.backgroundColor = "white"

      element.innerHTML = `
        <div style="text-align:center;font-family:'Cormorant Garamond', serif;">
          <img src="/wedding1.png" style="width:100%;max-width:600px;margin-bottom:40px;" />
          <h1 style="color:#8B7355;font-size:32px;letter-spacing:0.2em;">
            Nuestra Boda<br/>Angeles & Eduardo
          </h1>
        </div>
      `

      await html2pdf().set({
        filename: "wedding-invitation.pdf",
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "A3", orientation: "portrait" },
      }).from(element).save()

    } catch (err) {
      console.error(err)
      alert("Error al generar el PDF")
    } finally {
      setIsGeneratingPDF(false)
    }
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

      {/* ------------------ BOTONES FLOTANTES ------------------ */}
      {showCard && (
        <>
          <button
            onClick={handleCloseEnvelope}
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-stone-800 text-white"
          >
            <X />
          </button>

          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-stone-800 text-white"
          >
            {isMusicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        </>
      )}

      {/* ------------------ SOBRE ------------------ */}
      {!showCard && (
        <div className="relative w-full max-w-4xl px-4">
          <div style={{ perspective: "2000px" }}>
            <div
              className={`envelope-container ${envelopeOpened ? "opened" : ""} ${
                envelopeFlipped ? "flipped" : ""
              }`}
              onClick={!envelopeOpened ? handleOpenEnvelope : undefined}
            >
              <div className="envelope-body" />
              <div className="envelope-frame" />

              <div
                className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                  envelopeOpened ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <img
                  src="/imagennames.png"
                  className="w-[260px] md:w-[700px]"
                />
              </div>

              {/* COMENTARIO JSX CORREGIDO */}
              {/*
              <div className="envelope-address">
                <p className="calligraphy-text"></p>
              </div>
              */}

              <button onClick={handleOpenEnvelope} className="envelope-button">
                <img src="/sello.png" className="w-20 h-20" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ TARJETA ------------------ */}
      {showCard && (
        <div className="w-full max-w-5xl px-4">
          <div
            className="relative"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className="relative transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <Card
                className="w-full shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img src="/wedding1.png" />
              </Card>

              <Card
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="p-6">
                  <h2 className="text-center text-4xl font-greatv text-[#8B7355]">
                    Nuestra Boda
                  </h2>

                  <Contador />

                  <Button
                    className="w-full mt-6 bg-[#8B7355]"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadPDF()
                    }}
                  >
                    Descargar Invitación
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
