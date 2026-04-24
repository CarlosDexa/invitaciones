import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  Clock3,
  Gift,
  Heart,
  Music2,
  QrCode,
  Users,
  Wine,
  PartyPopper,
  Church,
  Check,
} from "lucide-react";
import QrRegalos from "./QrRegalos";
import { IoGiftSharp } from "react-icons/io5";
import Calendar from "../assets/invitacion/calendar.png";

import Cancion from "../assets/invitacion/cancion.mp3";

import Itinerario from "../assets/invitacion/Itinerario.svg";
import Fecha from "../assets/invitacion/fecha.svg";
import Calendario from "../assets/invitacion/calendario.svg";
import Novios from "../assets/invitacion/novios.png";

export default function InvitacionBodaShelyAndre() {
  const [countdown, setCountdown] = useState({
    days: 94,
    hours: 13,
    minutes: 49,
    seconds: 47,
  });

  useEffect(() => {
    const target = new Date("2026-07-25T19:00:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);


  const audioRef = useRef(null);

const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const formatTime = (time) => {
  if (!time || Number.isNaN(time)) return "00:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const toggleMusic = async () => {
  const audio = audioRef.current;
  if (!audio) return;

  try {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  } catch (error) {
    console.log("El navegador bloqueó la reproducción automática:", error);
  }
};

const skipTime = (seconds) => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.currentTime = Math.max(
    0,
    Math.min(audio.currentTime + seconds, duration || audio.duration)
  );
};

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const startMusic = async () => {
    try {
      audio.volume = 0.7;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      console.log("El navegador bloqueó el autoplay con sonido:", error);
    }
  };

  startMusic();
}, []);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 11) % 84)}%`,
        top: `${8 + ((i * 9) % 86)}%`,
        delay: `${(i % 6) * 0.5}s`,
        duration: `${6 + (i % 4)}s`,
      })),
    []
  );


  const whatsappNumber = "5219981503935";

const confirmationMessage = encodeURIComponent(
  "Hola, con mucho gusto confirmo mi asistencia a la boda civil de Shely & André. Será un honor acompañarlos en este día tan especial. ¡Muchas gracias por la invitación!"
);

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${confirmationMessage}`;
  return (
    <div className="min-h-screen bg-[#526a43] text-[#f8f2e8]">
      <style>{`
        .font-script { font-family: "Great Vibes", cursive; }
        .font-serif-elegant { font-family: "Italianno", serif; }
        .font-link { font-family: "Pinyon Script", serif; font-style: italic; }

        @keyframes twinkle {
          0%,100% { opacity: .12; transform: scale(.92); }
          50% { opacity: .55; transform: scale(1.08); }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
        {sparkles.map((item) => (
          <span
            key={item.id}
            className="absolute text-[#d7c9a5]"
            style={{
              left: item.left,
              top: item.top,
              animation: `twinkle ${item.duration} ease-in-out ${item.delay} infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-[430px] px-4 py-8"
      >
        {/* <section className="text-center">
          <p className="font-script text-[56px] leading-[0.82] text-[#f8f2e8]">
            Shely
          </p>
          <p className="font-script -mt-1 text-[28px] leading-none text-[#f8f2e8]">
            &
          </p>
          <p className="font-script -mt-1 text-[56px] leading-[0.82] text-[#f8f2e8]">
            André
          </p>

          <p className="mt-3 font-serif-elegant text-[13px] tracking-[0.35em] text-[#efe2d1]">
            25.07.26
          </p>
        </section> */}

        <section className="mt-6 border border-white/40 p-2">
          <div className="aspect-[4/5] w-full border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02)),url('https://media.canva.com/v2/image-resize/format:JPG/height:800/quality:92/uri:ifs%3A%2F%2FM%2Fe3c740e2-2ac4-4249-93c8-8c8a1d776050/watermark:F/width:640?csig=AAAAAAAAAAAAAAAAAAAAAJWbYNrwGw3gSWQS6le4-NS9FuSpN2K7dXrpIKlHq0i9&exp=1776972951&osig=AAAAAAAAAAAAAAAAAAAAAOZEIF3bExVOGEX7mZLc1NnraQIz6NZf8iKn6E193NZo&signer=media-rpc&x-canva-quality=screen')] bg-cover bg-center" />

         <div className="mt-2 text-center">
  <audio
  ref={audioRef}
  src={Cancion}
  autoPlay
  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
  onEnded={() => setIsPlaying(false)}
/>

  <button
    type="button"
    onClick={toggleMusic}
    className="inline-flex items-center gap-2 font-link text-[22px] text-[#f3e7da]"
  >
    <Music2 className="h-4 w-4" />
    {isPlaying ? "Pausar canción" : "Dale play a la canción"}
  </button>

  <div className="mx-auto mt-2 flex max-w-[290px] items-center gap-3 text-[#f3e9db]">
    <span className="font-serif-elegant text-[10px]">
      {formatTime(currentTime)}
    </span>

    <div className="h-px flex-1 bg-white/60" />

    <button
      type="button"
      onClick={() => skipTime(-10)}
      className="font-serif-elegant text-[12px]"
    >
      ◄◄
    </button>

    <button
      type="button"
      onClick={toggleMusic}
      className="font-serif-elegant text-[14px]"
    >
      {isPlaying ? "❚❚" : "▶"}
    </button>

    <button
      type="button"
      onClick={() => skipTime(10)}
      className="font-serif-elegant text-[12px]"
    >
      ►►
    </button>

    <div className="h-px flex-1 bg-white/60" />

    <span className="font-serif-elegant text-[10px]">
      {formatTime(duration)}
    </span>
  </div>
</div>
        </section>

        <section className="mt-7 text-center">
          <p className="mx-auto max-w-[292px] font-script text-[26px] leading-[1.12] text-[#f8f2e8]">
            Con la bendición de Dios y nuestros padres, tenemos el honor de
            invitarles a nuestra boda civil.
          </p>
        </section>

      <section className="mt-7 text-center">
 <img            src={Fecha}
            alt="Fecha"
            className="mx-auto w-full max-w-[240px] object-contain"
          />
        </section>

        <section className="mt-6 text-center">
          <p className="font-serif-elegant text-[38px] leading-none tracking-[0.18em] text-[#f8f2e8]">
            {String(countdown.days).padStart(2, "0")} :{" "}
            {String(countdown.hours).padStart(2, "0")} :{" "}
            {String(countdown.minutes).padStart(2, "0")} :{" "}
            {String(countdown.seconds).padStart(2, "0")}
          </p>

          <div className="mt-2 flex justify-center gap-4 font-serif-elegant text-[12px] uppercase tracking-[0.22em] text-[#efe1d2]">
            <span>DÍAS</span>
            <span>HORAS</span>
            <span>MIN</span>
            <span>SEG</span>
          </div>
        </section>

        <section className="mt-8 px-6 py-7">
          <img
            src={Calendario}
            alt="Calendario"
            className="mx-auto w-full max-w-[240px] object-contain"
          />
        </section>

      <section className="mt-12 text-center px-0">
  <img
    src={Itinerario}
    alt="Itinerario"
    className="mx-auto block w-[92vw] max-w-[290px] object-contain"
  />
  <p className={`mt-3 text-[#f6eddc] font-script text-[34px]`}>
    Fin de la celebración
  </p>
  <p className={`mt-3 text-[#f6eddc] font-script text-[34px]`}>
    1:00 am.
  </p>
</section>


<SectionBlock
  title="Código de vestimenta"
  titleClassName="font-link text-[34px]  leading-none "
  titleTopLine={true}
  titleBottomLine={true}
  titleLineWidth="w-60"
>
  <img
    src={Novios}
    alt="Código de vestimenta"
    className="mx-auto mt-4 w-full max-w-[240px] object-contain"
  />

  <div className="mx-auto mt-2 h-px w-60 bg-white/45" />

  <p className="mt-1 font-link text-[34px] leading-none text-[#f8f2e8]">
    Formal
  </p>

  <div className="mx-auto mt-1 h-px w-60 bg-white/45" />

  <p className="mx-auto mt-3 max-w-[285px] font-script text-[28px] leading-[1.08] text-[#f0dfd7]">
  Para armonizar con la paleta de la boda, agradeceremos{" "}
   <span className="text-[#dca3a0] underline underline-offset-2">evitar</span> los
  siguientes tonos.
</p>
  <div className="mt-4 flex items-center justify-center gap-3">
    {[ "#b9b09e", "#dbb7b6", "#dca3a0", "#cb4740"].map((c, i) => (
      <span
        key={i}
        className="h-5 w-5 rounded-sm border border-white/20"
        style={{ backgroundColor: c }}
      />
    ))}
  </div>

  <div className="mx-auto mt-4 h-px w-60 bg-white/45" />
</SectionBlock>

        <SectionBlock
          icon={<IoGiftSharp className="h-auto w-48 text-[#f8f2e8] mb-4" />}
          title="Mesa de regalos"
          titleClassName="font-link text-[34px] leading-none"
          titleTopLine={true}
          titleBottomLine={true}
          titleLineWidth="w-60"

        >
          <p className="mx-auto mt-3 max-w-[300px] font-script text-[28px] leading-[1.08] text-[#f0dfd7]">
            El mejor regalo es tu presencia, pero si deseas tener un detalle con
            nosotros les dejamos estas opciones.
          </p>

           <div className="mt-6">
    <QrRegalos />
  </div>
          <div className="mx-auto mt-4 h-px w-60 bg-white/45" />
        </SectionBlock>

        <SectionBlock
        
          icon={<img src={Calendar} alt="Calendario" className="h-auto w-48 text-[#f8f2e8] mb-4" />}
         
          title="Confirmación"
          titleClassName="font-link text-[34px] leading-none"
          titleTopLine={true}
          titleBottomLine={true}
          titleLineWidth="w-60"
        >
          <p className="mx-auto mt-3 max-w-[300px] font-serif-elegant text-[28px] leading-[1.08] text-[#f0dfd7]">
            Agradecemos que confirmes tu asistencia antes del 25 de Julio.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block px-7 py-2 font-link text-[22px] text-[#f8f2e8] underline underline-offset-4"
          >
            Click para confirmar.
          </a>
        </SectionBlock>

        <SectionBlock
          icon={<Heart className="h-auto w-36 fill-current text-[#f8f2e8]" />}
          title="Recomendaciones"
          titleClassName="font-link text-[34px] leading-none"
          titleTopLine={true}
          titleBottomLine={true}
          titleLineWidth="w-60"
        >
          <p className="mx-auto mt-3 max-w-[300px] font-serif-elegant text-[28px] leading-[1.08] text-[#f0dfd7]">
            Seguir con las indicaciones del personal de la boda y ser puntual.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Sin niños"
          titleClassName="font-link text-[34px] underline underline-offset-4 leading-none"
        >
          <p className="mx-auto mt-3 max-w-[310px] font-serif-elegant text-[28px] leading-[1.08] text-[#f0dfd7]">
            Para crear un ambiente especial, hemos decidido que este evento sea
            exclusivo para adultos. Gracias por su comprensión.
          </p>
        </SectionBlock>

        <section className="mt-12 pb-10 text-center">
          <p className="font-serif-elegant text-[34px] leading-[1.04] text-[#f8f2e8]">
            Esperamos contar con tu presencia
          </p>
          <p className="mt-3 font-link text-[28px] text-[#f0d8d3]">
            ¡Muchas gracias!
          </p>
        </section>
      </motion.main>
    </div>
  );
}
function SectionBlock({
  icon,
  title,
  titleClassName = "",
  children,
  titleTopLine = false,
  titleBottomLine = false,
  titleLineWidth = "w-auto",
}) {
  return (
    <section className="mt-11 text-center">
      <div className="flex justify-center">{icon}</div>

      {titleTopLine && (
        <div className={`mx-auto mt-3 h-px ${titleLineWidth} bg-white/45`} />
      )}

      <p className={`mt-3 text-[#f6eddc] ${titleClassName}`}>{title}</p>

      {titleBottomLine && (
        <div className={`mx-auto mt-3 h-px ${titleLineWidth} bg-white/45`} />
      )}

      {children}
    </section>
  );
}
function CalendarMini() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [
    "", "", "", 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, "",
  ];

  return (
    <div>
      <p className="text-center font-serif-elegant text-[46px] leading-none text-[#f8f2e8]">
        Julio 2026
      </p>

      <div className="mt-6 grid grid-cols-7 gap-y-4 text-center font-serif-elegant text-[16px] text-[#efe0d1]">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}

        {dates.map((d, i) => (
          <div key={i} className="flex items-center justify-center">
            {d === 25 ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f8f2e8] text-[18px] text-[#f8f2e8]">
                {d}
              </span>
            ) : (
              <span className="text-[18px]">{d}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}