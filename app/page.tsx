"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Volume2, VolumeX, X, Gift, Mail, CalendarIcon } from "lucide-react"

export default function WeddingCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false)
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

  const handleDownloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default

    // Create a temporary container
    const element = document.createElement("div")
    element.style.width = "800px"
    element.style.padding = "40px"
    element.style.backgroundColor = "white"

    // Create image element and wait for it to load
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/elegant-wedding-invitation-card-with-ampersand-mon.jpg"

    await new Promise((resolve) => {
      img.onload = resolve
    })

    element.innerHTML = `
      <div style="text-align: center; font-family: serif;">
        <img src="/elegant-wedding-invitation-card-with-ampersand-mon.jpg" alt="Wedding Invitation" style="width: 100%; max-width: 600px; margin-bottom: 40px;" />
        <h1 style="color: #8B7355; font-size: 32px; margin-bottom: 20px;">WEDDING DETAILS</h1>
        <div style="text-align: left; max-width: 500px; margin: 0 auto; line-height: 1.8;">
          <h2 style="color: #5C4A3A; margin-top: 30px;">LOCATIONS</h2>
          <h3 style="margin-top: 20px;">Ceremony</h3>
          <p>St Joseph Catholic Church<br/>600 S Jupiter Rd Richardson, TX 75081<br/>Saturday, August 2, 2025<br/>Mass 1:30PM</p>
          <h3 style="margin-top: 20px;">Reception</h3>
          <p>The Delanie Venue<br/>10230 County Road 202 Forney, Tx 75126<br/>5:00 PM Saturday, August 2, 2025</p>
        </div>
      </div>
    `

    const opt = {
      margin: 0.5,
      filename: "wedding-invitation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
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
      <audio ref={audioRef} loop src="/audio/Ed Sheeran - Perfect Symphony with Andrea Bocelli.mp3" />

      {showCard && (
        <>
          <button
            onClick={handleCloseEnvelope}
            className="fixed top-6 left-6 z-50 p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Close card"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-stone-800/90 hover:bg-stone-900 text-white shadow-xl transition-all duration-300 hover:scale-110"
            aria-label={isMusicPlaying ? "Mute music" : "Play music"}
          >
            {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
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

              <div className="envelope-address">
                <p className="calligraphy-text">Sterling Hayes</p>
                <p className="calligraphy-text">123 Ash Ave</p>
                <p className="calligraphy-text">Oswego, CA</p>
                <p className="calligraphy-text">14054</p>
              </div>

              <div className="envelope-flap" />
              <button onClick={handleOpenEnvelope} className="envelope-button" aria-label="Open envelope">
                <img
                  src="/elegant-wedding-monogram-s-and-h-in-gold-on-white-.jpg"
                  alt="Open invitation"
                  className="w-full h-full object-cover"
                />
              </button>
              {!envelopeOpened && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-sm text-stone-600 font-light animate-pulse">Click to open</p>
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
                className="w-full aspect-[4/3] bg-white border-2 border-stone-200 shadow-2xl overflow-hidden p-0"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src="/elegant-wedding-invitation-card-with-ampersand-mon.jpg"
                  alt="Wedding Invitation"
                  className="w-full h-full object-cover"
                />
              </Card>

              <Card
                className="absolute inset-0 w-full aspect-[4/3] bg-white border-2 border-stone-200 shadow-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="h-full flex flex-col p-8 md:p-12 overflow-y-auto">
                  {/* Header */}
                  <h2 className="text-3xl md:text-4xl font-display font-light text-[#8B7355] text-center mb-8 tracking-[0.25em] uppercase">
                    Details
                  </h2>

                  <div className="border-t border-stone-300 pt-8" />

                  {/* Locations Section */}
                  <div className="flex-1 space-y-10">
                    {/* Locations Section */}
                    <h3 className="text-xl md:text-2xl font-display font-medium text-stone-700 text-center tracking-[0.2em] uppercase">
                      Locations
                    </h3>

                    {/* Ceremony */}
                    <div className="space-y-4">
                      {/* Ceremony */}
                      <h4 className="font-display font-semibold text-stone-800 text-center text-xl md:text-2xl tracking-wide">
                        Ceremony
                      </h4>
                      <div className="text-center space-y-2">
                        {/* Ceremony Details */}
                        <p className="text-base md:text-lg font-display font-medium text-stone-700">
                          St Joseph Catholic Church
                        </p>
                        <p className="text-base md:text-lg font-display text-stone-600">
                          600 S Jupiter Rd Richardson, TX 75081
                        </p>
                        <p className="text-base md:text-lg font-display text-stone-600">Saturday, August 2, 2025</p>
                        <p className="text-base md:text-lg font-display text-stone-600">Mass</p>
                        <p className="text-base md:text-lg font-display text-stone-600">1:30PM</p>
                      </div>
                      <div className="flex justify-center gap-6 mt-4">
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-base md:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open("https://maps.google.com/?q=St+Joseph+Catholic+Church+Richardson+TX", "_blank")
                          }}
                        >
                          <MapPin className="w-5 h-5 mr-2" />
                          View Map
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-base md:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <CalendarIcon className="w-5 h-5 mr-2" />
                          Add to calendar
                        </Button>
                      </div>
                    </div>

                    {/* Reception */}
                    <div className="space-y-4">
                      {/* Reception */}
                      <h4 className="font-display font-semibold text-stone-800 text-center text-xl md:text-2xl tracking-wide">
                        Reception
                      </h4>
                      <div className="text-center space-y-2">
                        {/* Reception Details */}
                        <p className="text-base md:text-lg font-display font-medium text-stone-700">
                          The Delanie Venue
                        </p>
                        <p className="text-base md:text-lg font-display text-stone-600">
                          10230 County Road 202 Forney, Tx 75126
                        </p>
                        <p className="text-base md:text-lg font-display text-stone-600">
                          5:00 PM Saturday, August 2, 2025
                        </p>
                      </div>

                      <div className="flex justify-center gap-6 mt-4">
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-base md:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open("https://maps.google.com/?q=The+Delanie+Venue+Forney+TX", "_blank")
                          }}
                        >
                          <MapPin className="w-5 h-5 mr-2" />
                          View Map
                        </Button>
                        <Button
                          variant="link"
                          className="text-[#8B7355] hover:text-[#6B5335] p-0 h-auto text-base md:text-lg font-display"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <CalendarIcon className="w-5 h-5 mr-2" />
                          Add to calendar
                        </Button>
                      </div>
                    </div>

                    {/* Gift Card Button */}
                    <div className="border-t border-stone-300 pt-8">
                      <Button
                        variant="outline"
                        className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white bg-transparent font-display font-medium tracking-wide text-base md:text-lg py-6"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Gift className="w-5 h-5 mr-2" />
                        Send A Gift Card
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Buttons */}
                  <div className="space-y-4 mt-8">
                    <Button
                      className="w-full bg-[#8B7355] hover:bg-[#6B5335] text-white font-display font-medium tracking-widest text-base md:text-lg py-6"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      SEND MESSAGE
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white bg-transparent font-display font-medium tracking-wide text-base md:text-lg py-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadPDF()
                      }}
                    >
                      Download PDF
                    </Button>
                    <p className="text-sm md:text-base text-center text-stone-500 italic mt-3 font-display">
                      Tap to return
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <p className="text-center text-base text-stone-600 mt-6">Click the card to flip and view details</p>
        </div>
      )}
    </div>
  )
}
