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
   {/* BLOQUE FECHA – REFERENCIA EXACTA · RESPONSIVE */}
<div className="w-full flex flex-col items-center text-[#8B7355]">

  {/* FILA CENTRAL */}
  <div className="flex items-center w-full max-w-[520px]">

    {/* BLOQUE IZQUIERDO */}
    <div className="flex flex-col items-center flex-[0.8] gap-1">
      <div className="w-32 sm:w-34 md:w-36 border-t border-[#8B7355]/45"></div>
      <span
        className="
          font-unna
          uppercase
          tracking-[0.35em]
          text-[20px]
          sm:text-[21px]
          md:text-lg
          lg:text-xl
          xl:text-2xl
        "
      >
        Sábado
      </span>
      <div className="w-32 sm:w-34 md:w-36 border-t border-[#8B7355]/45"></div>
    </div>

    {/* NÚMERO CENTRAL */}
    <div
      className="
        mx-3 sm:mx-4 md:mx-5
        font-greatv
        leading-none
        -mt-[2px]
        text-[48px]
        sm:text-[56px]
        md:text-[64px]
        lg:text-[72px]
        xl:text-[84px]
      "
    >
      27
    </div>

    {/* BLOQUE DERECHO */}
    <div className="flex flex-col items-center flex-[0.8] gap-1">
      <div className="w-32 sm:w-34 md:w-36 border-t border-[#8B7355]/45"></div>
      <span
        className="
          font-unna
          uppercase
          tracking-[0.35em]
          text-[30px]
          sm:text-[31px]
          md:text-xl
          lg:text-2xl
          xl:text-3xl
        "
      >
        2026
      </span>
      <div className="w-22 sm:w-24 md:w-26 border-t border-[#8B7355]/45"></div>
    </div>
  {/* MES */}
  <div
    className="
      font-unna
      uppercase
      tracking-[0.45em]
      mb-2
      text-[20px]
      sm:text-xs
      md:text-sm
      lg:text-base
      xl:text-lg
    "
  >
    Junio
  </div>
  </div>
</div>

  <div className="pt-3 md:pt-8" />
    <div className="space-y-3 md:space-y-4">
      <div className="text-center space-y-1 md:space-y-2">
        <p className="text-sm md:text-xl lg:text-2xl font-unna text-stone-700">
          ¡Falta Poco!
        </p>
      </div>
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
          {/* NÚMERO CON - SHIMMER */}
          <div
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bona
              
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
