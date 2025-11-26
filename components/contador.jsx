"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-06-27T00:00:00");

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
      <div className="text-sm tracking-widest text-stone-700 font-TuFuenteSerif">
        JUNIO
      </div>

      {/* Día central */}
      <div className="text-6xl md:text-7xl font-TuFuenteSerif text-stone-700">
        27
      </div>

      {/* Año */}
      <div className="text-sm tracking-widest text-stone-700 font-TuFuenteSerif">
        2026
      </div>

      {/* Subtítulo */}
      <div className="mt-6 text-stone-600 tracking-[0.3em] font-TuFuenteRegular">
        FALTAN
      </div>

      {/* Contador */}
      <div className="flex justify-center gap-2 md:gap-4 text-stone-700 font-TuFuenteSerif">
        <span className="text-3xl md:text-5xl">{time.days}</span>
        <span className="text-3xl md:text-5xl">:</span>
        <span className="text-3xl md:text-5xl">{time.hours}</span>
        <span className="text-3xl md:text-5xl">:</span>
        <span className="text-3xl md:text-5xl">{time.minutes}</span>
        <span className="text-3xl md:text-5xl">:</span>
        <span className="text-3xl md:text-5xl">{time.seconds}</span>
      </div>

      {/* Labels */}
      <div className="flex justify-center gap-6 md:gap-10 text-[10px] md:text-xs tracking-widest text-stone-500 font-TuFuenteRegular">
        <div>Días</div>
        <div>Horas</div>
        <div>Min</div>
        <div>Seg</div>
      </div>
    </div>
  );
}
