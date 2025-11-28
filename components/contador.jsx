"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-06-27T15:00:00");

  const [time, setTime] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = String(Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / 1000 / 60) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
return (
  <div className="w-full text-center mt-8 space-y-3">

    {/* Fecha */}
    <div className="text-sm tracking-widest text-stone-700 font-Coldiac">
      JUNIO
    </div>

    {/* Día central */}
    <div className="text-6xl md:text-7xl font-Coldiac text-stone-700">
      27
    </div>

    {/* Año */}
    <div className="text-sm tracking-widest text-stone-700 font-Coldiac">
      2026
    </div>

    {/* Subtítulo */}
    <div className="mt-6 text-stone-600 tracking-[0.3em] font-Coldiac">
      FALTAN
    </div>

    {/* CONTADOR PREMIUM */}
    <div className="flex justify-center gap-6 md:gap-10 mb-4">

      {/* Bloque */}
      {[
        { value: time.days, label: "Días" },
        { value: time.hours, label: "Horas" },
        { value: time.minutes, label: "Min" },
        { value: time.seconds, label: "Seg" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
        >
          {/* Caja dorada animada */}
          <div
            className="
              w-16 h-16 md:w-20 md:h-20 
              flex items-center justify-center 
              bg-white/80 backdrop-blur-sm
              border border-[#d5c39e]
              rounded-xl 
              shadow-sm
              transition-all duration-300 
              animate-pulse-[1.2s_ease-in-out_infinite]
              font-Coldiac 
              text-3xl md:text-4xl text-stone-700
            "
          >
            {item.value}
          </div>

          {/* Etiqueta */}
          <div className="mt-2 text-[10px] md:text-xs tracking-widest text-stone-500 font-CormorantGaramond">
            {item.label}
          </div>
        </div>
      ))}

    </div>
  </div>
);

}
