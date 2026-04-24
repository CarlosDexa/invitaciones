import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Heart, Music2, MapPin } from "lucide-react";
import { IoGiftSharp } from "react-icons/io5";

import QrRegalos from "./QrRegalos";

import Calendar from "../assets/invitacion/calendar.png";
import Cancion from "../assets/invitacion/cancion.mp3";
import Sesion from "../assets/invitacion/sesion.jpeg";
import Itinerario from "../assets/invitacion/Itinerario.svg";
import Fecha from "../assets/invitacion/fecha.svg";
import Calendario from "../assets/invitacion/calendario.svg";
import Novios from "../assets/invitacion/novios.png";


const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const softFade = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineReveal = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export default function InvitacionBodaShelyAndre() {
  const [countdown, setCountdown] = useState({
    days: 94,
    hours: 13,
    minutes: 49,
    seconds: 47,
  });

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
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

        @keyframes slowFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
        transition={{ duration: 1 }}
        className="relative mx-auto w-full max-w-[430px] px-4 py-8"
      >
        <motion.section
          variants={softFade}
          initial="hidden"
          animate="visible"
          className="mt-6 border border-white/40 p-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] w-full overflow-hidden border border-white/30"
          >
            <motion.img
              src={Sesion}
              alt="Sesión de Shely y André"
              className="h-full w-full object-cover object-center"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-2 text-center"
          >
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
              className="inline-flex items-center gap-2 font-link text-[22px] text-[#f3e7da] transition duration-300 hover:scale-[1.03] hover:text-white"
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
                className="font-serif-elegant text-[12px] transition duration-300 hover:scale-110 hover:text-white"
              >
                ◄◄
              </button>

              <button
                type="button"
                onClick={toggleMusic}
                className="font-serif-elegant text-[14px] transition duration-300 hover:scale-110 hover:text-white"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button
                type="button"
                onClick={() => skipTime(10)}
                className="font-serif-elegant text-[12px] transition duration-300 hover:scale-110 hover:text-white"
              >
                ►►
              </button>

              <div className="h-px flex-1 bg-white/60" />

              <span className="font-serif-elegant text-[10px]">
                {formatTime(duration)}
              </span>
            </div>
          </motion.div>
        </motion.section>

        <AnimatedSection className="mt-7 text-center">
          <p className="mx-auto max-w-[292px] font-script text-[26px] leading-[1.12] text-[#f8f2e8]">
            Con la bendición de Dios y nuestros padres, tenemos el honor de
            invitarles a nuestra boda civil.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-7 text-center">
          <motion.img
            src={Fecha}
            alt="Fecha"
            className="mx-auto w-full max-w-[240px] object-contain"
            whileInView={{ scale: [0.96, 1.02, 1] }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </AnimatedSection>

        <AnimatedSection className="mt-6 text-center">
          <motion.p
            key={`${countdown.days}-${countdown.hours}-${countdown.minutes}`}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            className="font-serif-elegant text-[38px] leading-none tracking-[0.18em] text-[#f8f2e8]"
          >
            {String(countdown.days).padStart(2, "0")} :{" "}
            {String(countdown.hours).padStart(2, "0")} :{" "}
            {String(countdown.minutes).padStart(2, "0")} :{" "}
            {String(countdown.seconds).padStart(2, "0")}
          </motion.p>

          <div className="mt-2 flex justify-center gap-4 font-serif-elegant text-[12px] uppercase tracking-[0.22em] text-[#efe1d2]">
            <span>DÍAS</span>
            <span>HORAS</span>
            <span>MIN</span>
            <span>SEG</span>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8 px-6 py-7">
          <motion.img
            src={Calendario}
            alt="Calendario"
            className="mx-auto w-full max-w-[240px] object-contain"
            whileInView={{ opacity: [0, 1], y: [18, 0] }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.4 }}
          />
        </AnimatedSection>

        <AnimatedSection className="mt-12 px-0 text-center">
          <motion.img
            src={Itinerario}
            alt="Itinerario"
            className="mx-auto block w-[92vw] max-w-[290px] object-contain"
            whileInView={{ opacity: [0, 1], scale: [0.94, 1] }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          />

          <motion.p
            variants={fadeUp}
            className="mt-3 font-script text-[34px] text-[#f6eddc]"
          >
            Fin de la celebración
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 font-script text-[34px] text-[#f6eddc]"
          >
            1:00 am.
          </motion.p>
        </AnimatedSection>

        <SectionBlock
  title="Ubicación"
  titleClassName="font-link text-[34px] leading-none"
  titleTopLine={true}
  titleBottomLine={true}
  titleLineWidth="w-60"
>
  <p className="mx-auto mt-3 max-w-[300px] font-serif-elegant text-[30px] leading-[1.08] text-[#f0dfd7]">
    Recepciones Sarath Cancún
  </p>

  <p className="mx-auto mt-2 max-w-[310px] font-script text-[24px] leading-[1.12] text-[#f8f2e8]">
    Av. Álamos s/n, 77560 Cancún, Q.R.
  </p>

  <motion.a
    href="https://maps.google.com?q=Recepciones%20Sarath%20Cancun,%20Av.%20Alamos%20s/n,%2077560%20Canc%C3%BAn,%20Q.R.&ftid=0x0:0xa619f6dd81c20795&entry=gps&shh=CAE&lucs=,94297699,94284502,94231188,94280568,47071704,94218641,94282134,100799872,94286869&g_st=iw"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="mt-5 inline-flex items-center justify-center gap-2 border border-white/45 px-7 py-2 font-link text-[24px] text-[#f8f2e8] transition duration-300 hover:bg-white/10 hover:text-white"
  >
    <MapPin className="h-4 w-4" />
    Ver ubicación
  </motion.a>

</SectionBlock>

        <SectionBlock
          title="Código de vestimenta"
          titleClassName="font-link text-[34px] leading-none"
          titleTopLine={true}
          titleBottomLine={true}
          titleLineWidth="w-60"
        >
          <motion.img
            src={Novios}
            alt="Código de vestimenta"
            className="mx-auto mt-4 w-full max-w-[240px] object-contain"
            whileInView={{ opacity: [0, 1], y: [24, 0] }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.4 }}
          />

          <div className="mx-auto mt-2 h-px w-60 bg-white/45" />

          <p className="mt-1 font-link text-[34px] leading-none text-[#f8f2e8]">
            Formal
          </p>

          <div className="mx-auto mt-1 h-px w-60 bg-white/45" />

          <p className="mx-auto mt-3 max-w-[285px] font-script text-[28px] leading-[1.08] text-[#f0dfd7]">
            Para armonizar con la paleta de la boda, agradeceremos{" "}
            <span className="text-[#dca3a0] underline underline-offset-2">
              evitar
            </span>{" "}
            los siguientes tonos.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-4 flex items-center justify-center gap-3"
          >
            {["#b9b09e", "#dbb7b6", "#dca3a0", "#cb4740"].map((c, i) => (
              <motion.span
                key={i}
                variants={softFade}
                className="h-5 w-5 rounded-sm border border-white/20"
                style={{ backgroundColor: c }}
              />
            ))}
          </motion.div>

          <div className="mx-auto mt-4 h-px w-60 bg-white/45" />
        </SectionBlock>

        <SectionBlock
          icon={<IoGiftSharp className="mb-4 h-auto w-48 text-[#f8f2e8]" />}
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

          <motion.div
            className="mt-6"
            whileInView={{ opacity: [0, 1], scale: [0.94, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <QrRegalos />
          </motion.div>

          <div className="mx-auto mt-4 h-px w-60 bg-white/45" />
        </SectionBlock>

        <SectionBlock
          icon={
            <img
              src={Calendar}
              alt="Calendario"
              className="mb-4 h-auto w-48 text-[#f8f2e8]"
            />
          }
          title="Confirmación"
          titleClassName="font-link text-[34px] leading-none"
          titleTopLine={true}
          titleBottomLine={true}
          titleLineWidth="w-60"
        >
          <p className="mx-auto mt-3 max-w-[300px] font-serif-elegant text-[28px] leading-[1.08] text-[#f0dfd7]">
            Agradecemos que confirmes tu asistencia antes del 25 de Julio.
          </p>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-block px-7 py-2 font-link text-[22px] text-[#f8f2e8] underline underline-offset-4 transition duration-300 hover:text-white"
          >
            Click para confirmar.
          </motion.a>
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

        <AnimatedSection className="mt-12 pb-10 text-center">
          <p className="font-serif-elegant text-[34px] leading-[1.04] text-[#f8f2e8]">
            Esperamos contar con tu presencia
          </p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-3 font-link text-[28px] text-[#f0d8d3]"
          >
            ¡Muchas gracias!
          </motion.p>
        </AnimatedSection>
      </motion.main>
    </div>
  );
}

function AnimatedSection({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className={className}
    >
      {children}
    </motion.section>
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
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className="mt-11 text-center"
    >
      {icon && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex justify-center"
          style={{ animation: "slowFloat 5s ease-in-out infinite" }}
        >
          {icon}
        </motion.div>
      )}

      {titleTopLine && (
        <motion.div
          variants={lineReveal}
          className={`mx-auto mt-3 h-px ${titleLineWidth} origin-center bg-white/45`}
        />
      )}

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.75 }}
        viewport={{ once: true, amount: 0.4 }}
        className={`mt-3 text-[#f6eddc] ${titleClassName}`}
      >
        {title}
      </motion.p>

      {titleBottomLine && (
        <motion.div
          variants={lineReveal}
          className={`mx-auto mt-3 h-px ${titleLineWidth} origin-center bg-white/45`}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.85 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}