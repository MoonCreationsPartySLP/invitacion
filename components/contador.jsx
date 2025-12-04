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
  <div className="w-full text-center mt-10 space-y-6 text-black fade-in-up">

    {/* FECHA SUPERIOR */}
   <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.35em] font-display font-light uppercase opacity-0 fade-in-up"
    style={{ animationDelay: "0.2s" }}>
    27 de junio 2026
  </div>

    {/* LÍNEA SUPERIOR */}
    <div
      className="w-[85%] sm:w-[60%] md:w-[45%] mx-auto border-t border-black/30 opacity-0 fade-in-up"
      style={{ animationDelay: "0.35s" }}
    ></div>

    {/* CONTADOR */}
    <div className="flex justify-center gap-5 sm:gap-10 md:gap-12 text-center pt-1">
      {[
        { value: time.days, label: "Días" },
        { value: time.hours, label: "Hrs" },
        { value: time.minutes, label: "Min" },
        { value: time.seconds, label: "Seg" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center opacity-0 fade-in-scale"
          style={{ animationDelay: `${0.45 + index * 0.15}s` }}
        >
          {/* NÚMERO CON GLOW + SHIMMER */}
          <div
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bona
              gold-glow
              gold-shimmer
            "
          >
            {item.value}
          </div>

          {/* ETIQUETA */}
          <div
            className="
              mt-1
              text-[9px]
              sm:text-[10px]
              md:text-xs
              tracking-[0.25em]
              font-bona
              uppercase
            "
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>

    {/* LÍNEA INFERIOR */}
    <div
      className="w-[85%] sm:w-[60%] md:w-[45%] mx-auto border-t border-black/30 opacity-0 fade-in-up"
      style={{ animationDelay: "1.2s" }}
    ></div>
  </div>
);

}
