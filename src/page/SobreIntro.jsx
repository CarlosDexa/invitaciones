import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import sobreCerrado from "../assets/sobre-cerrado.svg";
import sobreAbierto from "../assets/sobre-abierto.svg";

export default function SobreIntro({ onAnimationComplete }) {
  const exitTimerRef = useRef(null);
  const hintTimerRef = useRef(null);
  const openTimerRef = useRef(null);
  const completeTimerRef = useRef(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showOpenEnvelope, setShowOpenEnvelope] = useState(false);
  const [showTapHint, setShowTapHint] = useState(true);

  useEffect(() => {
    hintTimerRef.current = setTimeout(() => {
      setShowTapHint(false);
    }, 4000);

    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  const startEnvelopeAnimation = () => {
    if (isOpening || isExiting) return;

    setIsOpening(true);
    setShowTapHint(false);

    // Tiempo que dura la sacudida antes del cambio de imagen
   openTimerRef.current = setTimeout(() => {
  setShowOpenEnvelope(true);
}, 2850);

exitTimerRef.current = setTimeout(() => {
  setIsExiting(true);

  completeTimerRef.current = setTimeout(() => {
    onAnimationComplete?.();
  }, 900);
}, 5600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#5d7149] px-6"
          onClick={startEnvelopeAnimation}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-90px] top-[-90px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-[#d7c9a5]/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #f8f2e8 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 18 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-[360px] flex-col items-center"
          >
            <motion.div
              className="relative w-full"
              animate={
                isOpening
                  ? {
                      x: [
                        0, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -5, 5, -3, 3, 0,
                      ],
                      y: [
                        0, -1, 1, -1, 1, -2, 1, -2, 1, -1, 1, -1, 0,
                      ],
                      rotate: [
                        0, -0.35, 0.35, -0.55, 0.55, -0.85, 0.85, -1.1, 1.1,
                        -0.9, 0.9, -0.55, 0.55, -0.25, 0.25, 0,
                      ],
                      scale: [
                        1, 1.006, 1.012, 1.02, 1.028, 1.038, 1.05, 1.065,
                        1.085, 1.105, 1.13, 1.16, 1.19, 1.22,
                      ],
                    }
                  : {
                      y: [0, -7, 0],
                    }
              }
              transition={
                isOpening
                  ? {
                      duration: 3,
                      ease: [0.45, 0, 0.2, 1],
                    }
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <AnimatePresence mode="wait">
                {!showOpenEnvelope ? (
                  <motion.img
  key="sobre-cerrado"
  src={sobreCerrado}
  alt="Sobre cerrado"
  className="relative z-20 w-full drop-shadow-2xl"
  initial={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
  animate={{
    opacity: isOpening ? [1, 1, 1, 1, 0] : 1,
    filter: isOpening
      ? [
          "brightness(1)",
          "brightness(1.01)",
          "brightness(1.04)",
          "brightness(1.12)",
          "brightness(1.35)",
        ]
      : "brightness(1)",
  }}
  exit={{
    opacity: 0,
    scale: 1.08,
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  }}
  transition={{
    duration: isOpening ? 2.85 : 0.25,
    ease: [0.45, 0, 0.2, 1],
  }}
  draggable={false}
/>
                ) : (
                  <motion.img
                    key="sobre-abierto"
                    src={sobreAbierto}
                    alt="Sobre abierto"
                    className="relative z-20 w-full drop-shadow-2xl"
                    initial={{
                      opacity: 0,
                      scale: 1.22,
                      filter: "brightness(1.35)",
                    }}
                    animate={{
                      opacity: 1,
                      scale: [1.22, 1.08, 1],
                      filter: [
                        "brightness(1.35)",
                        "brightness(1.12)",
                        "brightness(1)",
                      ],
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    transition={{
                      duration: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    draggable={false}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isOpening && (
                  <>
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-10 rounded-full bg-[#f8f2e8]/35 blur-2xl"
                      initial={{ opacity: 0, scale: 0.65 }}
                      animate={{
                        opacity: [0, 0, 0.15, 0.55, 0],
                        scale: [0.65, 0.85, 1.05, 1.55, 2],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2.85,
                        ease: "easeOut",
                      }}
                    />

                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f8f2e8]/60"
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{
                        opacity: [0, 0, 0, 0.9, 0],
                        scale: [0.2, 0.35, 0.7, 2.6, 3.4],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 3.05,
                        ease: "easeOut",
                      }}
                    />

                    <motion.span
                      className="pointer-events-none absolute left-[18%] top-[16%] z-30 text-[#f8f2e8]"
                      initial={{ opacity: 0, scale: 0, y: 12 }}
                      animate={{
                        opacity: [0, 0, 0, 1, 0],
                        scale: [0, 0.15, 0.35, 1.25, 0.7],
                        y: [12, 10, 4, -54, -70],
                      }}
                      transition={{ duration: 3.05, delay: 0.05 }}
                    >
                      ✦
                    </motion.span>

                    <motion.span
                      className="pointer-events-none absolute right-[20%] top-[22%] z-30 text-[#d7c9a5]"
                      initial={{ opacity: 0, scale: 0, y: 12 }}
                      animate={{
                        opacity: [0, 0, 0, 1, 0],
                        scale: [0, 0.15, 0.35, 1.3, 0.7],
                        y: [12, 10, 4, -64, -78],
                      }}
                      transition={{ duration: 3.05, delay: 0.15 }}
                    >
                      ✦
                    </motion.span>

                    <motion.span
                      className="pointer-events-none absolute left-[46%] top-[6%] z-30 text-[#f8f2e8]"
                      initial={{ opacity: 0, scale: 0, y: 12 }}
                      animate={{
                        opacity: [0, 0, 0, 1, 0],
                        scale: [0, 0.15, 0.35, 1.15, 0.7],
                        y: [12, 10, 4, -72, -86],
                      }}
                      transition={{ duration: 3.05, delay: 0.25 }}
                    >
                      ✧
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {showTapHint && !isOpening && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="relative mt-10"
                >
                  <div className="rounded-full border border-white/25 bg-white/10 px-6 py-3 backdrop-blur-md">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-white">
                      Toca para abrir
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.24, 1],
                      opacity: [0.45, 0, 0.45],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-white/30"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}