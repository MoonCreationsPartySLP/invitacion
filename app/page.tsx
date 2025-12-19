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
    const timer = setTimeout(() => {setEnvelopeFlipped(true)}, 300)
    return () => clearTimeout(timer)}, [])

  const handleOpenEnvelope = () => { 
    setEnvelopeOpened(true)
    setTimeout(() => { setShowCard(true) }, 1500) 
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
      setEnvelopeOpened(false)}, 300)
    if (audioRef.current) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } 
      else {
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
      <img src="/wedding1.png" alt="Invitación Boda A&E" style="width: 100%; max-width: 600px; margin-bottom: 40px; align: center;" crossorigin="anonymous" />
      <div style="text-align: left; max-width: 500px; margin: 0 auto; line-height: 1.8; font-size: 16px;">

      </div>
      <h1 style="color: #8B7355; font-size: 32px; margin-bottom: 20px; letter-spacing: 0.2em;">Nuestra Boda <br/> Angeles & Eduardo</h1>
      <div style="text-align: left; max-width: 500px; margin: 0 auto; line-height: 1.8; font-size: 16px;">
      <h2 style="color: #5C4A3A; margin-top: 30px; text-align: center; letter-spacing: 0.15em;">LOCATIONS</h2>
      <h3 style="margin-top: 20px; text-align: center; font-weight: 600;">Ceremonia Religiosa</h3>
      <p style="text-align: center;">Parroquia Nuestra Señora de La Candelaria<br/>Plaza Julián Carrillo 3, 78450 Ahualulco del Sonido 13, S.L.P.<br/>Sábado 26 de Junio del 2026<br/>Hora: 3:00PM</p>
      <h3 style="margin-top: 20px; text-align: center; font-weight: 600;">Recepción</h3>
      <p style="text-align: center;">Jardín La Noria<br/>C. Comité de los 13 Pro J.Carrillo 35, Centro, 78450 Ahualulco del Sonido 13, S.L.P.<br/> Apartir de las 5:00 PM </p>
      </div>
      </div>
      `

      const opt = {
        margin: 0.1,
        filename: "wedding-invitation.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "A3", orientation: "portrait" }, 
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
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/bg-mobile.png')] sm:bg-[url('/images/bg-desktop.png')]" >

    <div className="absolute inset-0 bg-black/0 backdrop-blur-[0px]" />
    <audio ref={audioRef} loop src="/audio/Perfect Symphony (Ed Sheeran-Andrea Bocelli).mp3" />

    {showCard && ( 
      <>
      <button onClick={handleCloseEnvelope} 
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 p-2 md:p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110" 
        aria-label="Close card">

        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <button onClick={toggleMusic} 
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110" 
        aria-label={isMusicPlaying ? "Mute music" : "Play music"}>
          {isMusicPlaying ? ( <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> ) : ( <VolumeX className="w-4 h-4 md:w-5 md:h-5" />)}
      </button>
      </>
      )
    }

    {!showCard && (
      <div className="relative w-full max-w-4xl px-4">
          <div style={{ perspective: "2000px" }} className="w-full">
            <div className={`envelope-container ${envelopeOpened ? "opened" : ""} ${envelopeFlipped ? "flipped" : ""}`} onClick={!envelopeOpened ? handleOpenEnvelope : undefined} style={{ transformStyle: "preserve-3d" }}>
                  <div className="envelope-body" />
                  <div className="envelope-corner top-left" />
                  <div className="envelope-corner top-right" />
                  <div className="envelope-corner bottom-left" />
                  <div className="envelope-corner bottom-right" />
                  <div className="envelope-ornament left-ornament" />
                  <div className="envelope-ornament right-ornament" />
                  <div className="envelope-ornament-center" />
                  <div className="envelope-frame" />

                  <div className={`absolute left-1/2 transform -translate-x-1/2 z-50 top-[12%] sm:top-[8%] md:top-[2%] transition-all duration-700 ${envelopeOpened ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>

                    <img src="/imagennames.png" alt="Postal image" 
                      className="rounded-sm w-[260px] sm:w-[420px] md:w-[700px] h-auto object-contain"/>
                  
                  </div>

                  {/*<div className="envelope-address">
                  <p className="calligraphy-text"></p>
                  </div>*/}

                  <div className="envelope-flap transition-none"/>

                  <button onClick={handleOpenEnvelope} className="envelope-button">
                    <img src="/sello.png" alt="Open"
                    className=" object-contain pointer-events-none w-20 h-20 sm:w-20 sm:h-20 md:w-26 md:h-26"/>
                  </button>


                  {!envelopeOpened && (
                    <div className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-xs md:text-sm text-stone-600 font-light animate-pulse">
                        Click to open
                      </p>
                    </div>)
                  }
            </div>
          </div>
      </div>)
    }

    {showCard && (
      <div className="w-full max-w-5xl px-4 animate-slide-up">
        <div className="relative cursor-pointer" style={{ perspective: "1000px" }} onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`relative w-full transition-transform duration-700`} style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", }} >
            <Card className="w-full bg-white border-2 border-stone-200 shadow-2xl overflow-hidden p-0" 
              style={{ backfaceVisibility: "hidden", aspectRatio: "1080 / 1920", maxWidth: "100%", }}>
                
                <img src="/wedding1.png" alt="Wedding Invitation" className="w-full h-full object-cover"/>

            </Card>
            <Card className="absolute inset-0 w-full bg-white border-2 border-stone-200 shadow-2xl overflow-hidden" 
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", aspectRatio: "1080 / 1920", maxWidth: "100%",}}>
              
              <div className="h-full flex flex-col p-6 md:p-8 lg:p-12 overflow-y-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-greatv text-[#8B7355] text-center mb-6 md:mb-8">
                  Nuestra Boda
                </h2>

                <div className="border-t border-transparent pt-3 md:pt-4" />

                <div className="space-y-3 md:space-y-4">
                  <div className="text-center space-y-1 md:space-y-2">
                    <p className="text-sm md:text-base lg:text-xl font-display font-medium text-stone-700">
                      Cada momento juntos nos ha llevado a este día tan especial. Junto a nuestros padres, tenemos el honor de invitarte a celebrar nuestra boda y
                      compartir con nosotros la felicidad de comenzar una nueva etapa en nuestras vidas.
                    </p>
                  </div>
                
                  <div className="flex flex-col sm:flex-row justify-center gap-16 mt-6">
                    <div className="text-center space-y-2">
                      <h4 className="font-display font-semibold text-stone-800 text-base md:text-lg lg:text-xl tracking-wide uppercase">
                        Padres de la novia
                      </h4>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Marcelina Vázquez y
                      </p>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Luis Zapata
                      </p>
                    </div>

                    <div className="text-center space-y-2">
                      <h4 className="font-display font-semibold text-stone-800 text-base md:text-lg lg:text-xl tracking-wide uppercase">
                        Padres del novio
                      </h4>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Irene Torres y
                      </p>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Eduardo Contreras 
                      </p>
                    </div>
                  </div>
                  <div className="text-center space-y-2 mt-5">
                      <h4 className="font-display font-semibold text-stone-800 text-base md:text-lg lg:text-xl tracking-wide uppercase">
                        Padrinos de Velación
                      </h4>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Marcelina Vázquez y
                      </p>
                      <p className="text-sm md:text-base lg:text-xl font-display text-stone-600">
                        Luis Zapata
                      </p>
                    </div>
                </div>

                  <Contador />

                  <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                  </div>

                  <div className="pt-6 md:pt-8" />

                  <div className="flex-1 space-y-6 md:space-y-10">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-display font-medium text-stone-700 text-center tracking-[0.2em] uppercase">
                        
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                      {/*icono*/}
                      <div className="flex justify-center mb-2">
                        <img src="/icons/iglesia.png" alt="Ceremonia Religiosa" className="
                        w-8 h-8
                        sm:w-10 sm:h-10
                        md:w-12 md:h-12
                        lg:w-14 lg:h-14
                        opacity-90"/>
                      </div>
                      
                      <div className="flex-1 space-y-3 md:space-y-4">
                          <h4 className="font-greatv text-stone-800 text-center text-xl md:text-2xl lg:text-3xl tracking-wide">
                          Ceremonia Religiosa
                          </h4>
                          {/*Detalles*/}
                          <div className="text-center space-y-1 md:space-y-2">
                            <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                            Parroquia de Nuestra Señora de la Candelaria 
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                            Plaza Julián Carrillo 3, CP.78450, Ahualulco del Sonido 13, S.L.P.
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                            15:00 hrs
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600"></p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600"></p>
                          </div>
                          {/*botones*/}
                          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                            <Button variant="link" className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display" 
                              onClick={(e) => { 
                                e.stopPropagation() 
                                window.open("https://maps.app.goo.gl/Zy33LV52gPrW4xFz7", "_blank") }}>
                            
                              <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />

                              Ver Ubicación

                            </Button>
                            <Button variant="link" className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display" 
                              onClick={(e) => { 
                                e.stopPropagation()
                                const calendarUrl = createGoogleCalendarUrl({
                                title: "Ceremonia Religiosa - Boda Angeles & Eduardo",
                                location: "Parroquia Nuestra Señora de La Candelaria, Plaza Julián Carrillo 3, 78450 Ahualulco del Sonido 13, S.L.P.",
                                details: "Ceremonia Religiosa Boda Angeles y Eduardo",
                                startDate: "20260627T150000-0600",
                                endDate: "20260627T160000-0600",})
                                window.open(calendarUrl, "_blank") }}>

                              <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />

                              Agendar en mi Calendario

                            </Button>
                          </div>
                      </div>

                      {/*Recepción----*/}

                      <div className="space-y-3 md:space-y-4">
                          {/*icono*/}
                          <div className="flex justify-center mb-2">
                            <img src="/icons/recepcion.png" alt="Recepcion" className=" 
                              w-8 h-8
                              sm:w-10 sm:h-10
                              md:w-12 md:h-12
                              lg:w-14 lg:h-14
                              opacity-90"/>
                          </div>
                          <h4 className="font-greatv text-stone-800 text-center text-xl md:text-2xl lg:text-3xl tracking-wide">
                            Recepción
                          </h4>
                          <div className="text-center space-y-1 md:space-y-2">
                            <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                              Jardín de Eventos La Noria
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                              Calle Comité de los 13 Pro J.Carrillo 35, 
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                              Centro, 78450 Ahualulco del Sonido 13, S.L.P.
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                              17:00 hrs
                            </p>
                          </div>
                      </div>  

                      {/*botones*/}

                      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                        <Button variant="link" className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display" 
                          onClick={(e) => {
                          e.stopPropagation() 
                          window.open("https://maps.app.goo.gl/Kv6aFtLzxcxdEZ6X8", "_blank")}}>

                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />

                          Ver Ubicación

                        </Button>
                        <Button variant="link" className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-sm md:text-base lg:text-lg font-display" 
                          onClick={(e) => {e.stopPropagation()
                          const calendarUrl = createGoogleCalendarUrl({
                          title: "Recepción - Boda Angeles & Eduardo",
                          location: "Jardín La Noria, C. Comité de los 13 Pro J.Carrillo 35, Centro, 78450 Ahualulco del Sonido 13, S.L.P.",
                          details: "Recepción de la Boda de Angeles y Eduardo",
                          startDate: "20260627T170000-0600",
                          endDate: "20260628T040000-0600" }) 
                          window.open(calendarUrl, "_blank")}}>

                          <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />

                          Agendar en mi Calendario

                        </Button>
                      </div>

                      {/* Código de Vestimenta */}

                      <div className="space-y-3 md:space-y-4">
                          <div className="flex justify-center mb-2">
                            <img src="/icons/dress.png" alt="Code Dress" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-90"/>
                          </div>
                        <h4 className="font-greatv text-stone-800 text-center text-xl md:text-2xl lg:text-3xl tracking-wide">
                            Código de Vestimenta
                          </h4>
                        
                          <div className="text-center space-y-1 md:space-y-2">
                            <p className="text-sm md:text-base lg:text-lg font-display font-medium text-stone-700">
                              Elegante
                            </p>
                            <p className="text-sm md:text-base lg:text-lg font-display text-stone-600">
                              Con cariño les pedimos evitar prendas en color blanco y tonos similares.
                            </p>
                          </div>
                      </div>

                      {/* Mensaje Final */}

                      <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-center mb-2">
                          <img src="/icons/anillos.png" alt="Wedding" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-90"/>
                        </div>

                        <div className="text-center space-y-1 md:space-y-2">
                          <p className="text-lg md:text-lg lg:text-xl font-unna text-stone-600">
                          Esperamos contar con su presencia.
                          </p>
                        </div>

                        <h4 className="font-greatv text-stone-800 text-center text-xl md:text-2xl lg:text-3xl tracking-wide">
                        ¡Muchas Gracias!
                        </h4>
                      </div>
                  </div>
                  {/*BOTONES--------*/}
                  <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
                    <Button 
                      className="w-full bg-[#8B7355] hover:bg-[#6B5335] text-white font-display font-medium tracking-widest text-sm md:text-base lg:text-lg py-4 md:py-6" 
                      size="lg" 
                      onClick={(e) => { 
                        e.stopPropagation() 
                        window.open("https://wa.link/6drmce", "_blank")}}>
                      <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Confirma tu Asistencia
                    </Button>
                    <Button variant="outline" 
                      className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white bg-transparent font-display font-medium tracking-wide text-sm md:text-base lg:text-lg py-4 md:py-6 disabled:opacity-50"
                      onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadPDF() }} 
                      disabled={isGeneratingPDF} >
                      {isGeneratingPDF ? "Generating PDF..." : "Descargar Invitación"}
                    </Button>
                    <p className="text-xs md:text-sm lg:text-base text-center text-stone-500 italic mt-2 md:mt-3 font-display">
                    Toca para Voltear
                    </p>
                  </div>
              </div>
            </Card>
          </div>
        </div>
        <p className="text-center text-sm md:text-base text-stone-600 mt-4 md:mt-6">
        ¡Da Clic sobre la tarjeta para ver los Detalles!
        </p>
      </div>
    )}
  </div>
  )
}
