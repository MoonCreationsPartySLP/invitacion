"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Volume2, VolumeX, X, Gift, Mail, CalendarIcon } from "lucide-react"
import Contador from "@/components/contador";


export default function WeddingCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnvelopeFlipped(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true)
    setTimeout(() => {
      setShowCard(true)
    }, 1500) // Increased delay to 1500ms for better card slide-out animation
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
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

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

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)

      const html2pdf = (await import("html2pdf.js")).default

      const element = document.createElement("div")
      element.style.width = "800px"
      element.style.padding = "40px"
      element.style.backgroundColor = "white"

      element.innerHTML = `
        <div style="text-align: center; font-family: 'Cormorant Garamond', serif;">
          <img src="/wedding1.png" alt="Wedding Invitation" style="width: 100%; max-width: 600px; margin-bottom: 40px;" crossorigin="anonymous" />
          <h1 style="color: #8B7355; font-size: 32px; margin-bottom: 20px; letter-spacing: 0.2em;">WEDDING DETAILS</h1>
          <div style="text-align: left; max-width: 500px; margin: 0 auto; line-height: 1.8; font-size: 16px;">
            <h2 style="color: #5C4A3A; margin-top: 30px; text-align: center; letter-spacing: 0.15em;">LOCATIONS</h2>
            <h3 style="margin-top: 20px; text-align: center; font-weight: 600;">Ceremony</h3>
            <p style="text-align: center;">St Joseph Catholic Church<br/>600 S Jupiter Rd Richardson, TX 75081<br/>Saturday, August 2, 2025<br/>Mass 1:30PM</p>
            <h3 style="margin-top: 20px; text-align: center; font-weight: 600;">Reception</h3>
            <p style="text-align: center;">The Delanie Venue<br/>10230 County Road 202 Forney, Tx 75126<br/>5:00 PM Saturday, August 2, 2025</p>
          </div>
        </div>
      `

      const opt = {
        margin: 0.5,
        filename: "wedding-invitation.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/image.png)" }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <audio ref={audioRef} loop src="/audio/Perfect Symphony (Ed Sheeran-Andrea Bocelli).mp3" />

      {showCard && (
        <>
          <button
            onClick={handleCloseEnvelope}
            className="fixed top-4 left-4 md:top-6 md:left-6 z-50 p-2 md:p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Close card"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110"
            aria-label={isMusicPlaying ? "Mute music" : "Play music"}
          >
            {isMusicPlaying ? (
              <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </>
      )}

      {!showCard && (
        <div className="relative w-full max-w-4xl px-4">
          <div style={{ perspective: "2000px" }} className="w-full">
            <div
              className={`envelope-container ${envelopeOpened ? "opened" : ""} ${envelopeFlipped ? "flipped" : ""}`}
              onClick={!envelopeOpened ? handleOpenEnvelope : undefined}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="envelope-body" />
              <div className="envelope-corner top-left" />
              <div className="envelope-corner top-right" />
              <div className="envelope-corner bottom-left" />
              <div className="envelope-corner bottom-right" />

              <div className="envelope-ornament left-ornament" />
              <div className="envelope-ornament right-ornament" />
              <div className="envelope-ornament-center" />

              <div className="envelope-frame" />
              
              <div className={`absolute left-1/2 transform -translate-x-1/2 z-50 top-[12%] sm:top-[8%] md:top-[2%]
                transition-all duration-700 ${envelopeOpened ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                <img src="/imagennames.png" alt="Postal image" className="rounded-sm w-[260px] sm:w-[420px] md:w-[700px] h-auto object-contain"/>
            </div>

              /*<div className="envelope-address">
                <p className="calligraphy-text"></p>
              </div>*/

              <div className="envelope-flap transition-none"/>
              <button onClick={handleOpenEnvelope} className="envelope-button aria-label="Open envelope">
                  <img
                    src="/sello.png"
                    alt="Open"
                    className="
                      object-contain
                      pointer-events-none
                      w-14 h-14
                      sm:w-20 sm:h-20
                      md:w-24 md:h-24"
                  />
                </button>
               
  
              {!envelopeOpened && (
                <div className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-xs md:text-sm text-stone-600 font-light animate-pulse">Click to open</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCard && (
        <div className="w-full max-w-5xl px-4 animate-slide-up">
          <div
            className="relative cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`relative w-full transition-transform duration-700`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <Card
                className="w-full bg-white border-2 border-stone-200 shadow-2xl overflow-hidden p-0"
                style={{
                  backfaceVisibility: "hidden",
                  aspectRatio: "1080 / 1920",
                  maxWidth: "100%",
                }}
              >
                <img
                  src="/wedding1.png"
                  alt="Wedding Invitation"
                  className="w-full h-full object-cover"
                />
              </Card>

              <Card
                className="absolute inset-0 w-full bg-white border-2 border-stone-200 shadow-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  aspectRatio: "1080 / 1920",
                  maxWidth: "100%",
                }}
              >
                <div className="h-full flex flex-col p-6 md:p-8 lg:p-12 overflow-y-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-[#8B7355] text-center mb-6 md:mb-8 tracking-[0.25em] uppercase">
                    Detalles
                  </h2>

                  <div className="border-t border-transparent pt-6 md:pt-8" />
                  
                  <div className="space-y-3 md:space-y-4">
                      <div className="text-center space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                          Cada momento juntos nos ha llevado a este día tan especial. Junto a nuestros padres, tenemos el honor de invitarte a celebrar nuestra boda y compartir con nosotros la felicidad de comenzar una nueva etapa en nuestras vidas.
                        </p>
                        
                   </div>
                    
                 <div className="flex flex-col sm:flex-row justify-center gap-16 mt-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-semibold text-stone-800 text-lg md:text-xl lg:text-2xl tracking-wide">
                        Padres de la novia
                      </h4>
                      <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                        Marcelina Vázquez y
                      </p>
                       <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                        Luis Zapata
                      </p>
                    </div>
          
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-semibold text-stone-800 text-lg md:text-xl lg:text-2xl tracking-wide">
                        Padres del novio
                      </h4>
                      <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                        Irene Torres y
                      </p>
                      <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                        Eduardo Contreras 
                      </p>
                    </div>
                  
                  </div>
                  </div>

                  <div className="pt-6 md:pt-8" />
                  
                  <Contador />
                  <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4"></div>

                  <div className="pt-6 md:pt-8" />
                    
                  <div className="flex-1 space-y-6 md:space-y-10">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-display font-medium text-stone-700 text-center tracking-[0.2em] uppercase">
                      Locations
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                      <h4 className="font-display font-semibold text-stone-800 text-center text-lg md:text-xl lg:text-2xl tracking-wide">
                        Ceremony
                      </h4>
                      <div className="text-center space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                          St Joseph Catholic Church
                        </p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                          600 S Jupiter Rd Richardson, TX 75081
                        </p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                          Saturday, August 2, 2025
                        </p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">Mass</p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">1:30PM</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open("https://maps.google.com/?q=St+Joseph+Catholic+Church+Richardson+TX", "_blank")
                          }}
                        >
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          View Map
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            const calendarUrl = createGoogleCalendarUrl({
                              title: "Wedding Ceremony - Sterling & Harper",
                              location: "St Joseph Catholic Church, 600 S Jupiter Rd Richardson, TX 75081",
                              details: "Wedding Mass Ceremony",
                              startDate: "20250802T133000",
                              endDate: "20250802T143000",
                            })
                            window.open(calendarUrl, "_blank")
                          }}
                        >
                          <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          Add to calendar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h4 className="font-display font-semibold text-stone-800 text-center text-lg md:text-xl lg:text-2xl tracking-wide">
                        Reception
                      </h4>
                      <div className="text-center space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                          The Delanie Venue
                        </p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                          10230 County Road 202 Forney, Tx 75126
                        </p>
                        <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                          5:00 PM Saturday, August 2, 2025
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open("https://maps.google.com/?q=The+Delanie+Venue+Forney+TX", "_blank")
                          }}
                        >
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          View Map
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            const calendarUrl = createGoogleCalendarUrl({
                              title: "Wedding Reception - Sterling & Harper",
                              location: "The Delanie Venue, 10230 County Road 202 Forney, TX 75126",
                              details: "Wedding Reception",
                              startDate: "20250802T170000",
                              endDate: "20250802T230000",
                            })
                            window.open(calendarUrl, "_blank")
                          }}
                        >
                          <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          Add to calendar
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-stone-300 pt-6 md:pt-8">
                      <Button
                        variant="outline"
                        className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white bg-transparent font-display font-medium tracking-wide text-sm md:text-base lg:text-lg py-4 md:py-6"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Gift className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Send A Gift Card
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
                    <Button
                      className="w-full bg-[#8B7355] hover:bg-[#6B5335] text-white font-display font-medium tracking-widest text-sm md:text-base lg:text-lg py-4 md:py-6"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      SEND MESSAGE
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white bg-transparent font-display font-medium tracking-wide text-sm md:text-base lg:text-lg py-4 md:py-6 disabled:opacity-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadPDF()
                      }}
                      disabled={isGeneratingPDF}
                    >
                      {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                    </Button>
                    <p className="text-xs md:text-sm lg:text-base text-center text-stone-500 italic mt-2 md:mt-3 font-display">
                      Tap to return
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <p className="text-center text-sm md:text-base text-stone-600 mt-4 md:mt-6">
            Click the card to flip and view details
          </p>
        </div>
      )}
    </div>
  )
}
