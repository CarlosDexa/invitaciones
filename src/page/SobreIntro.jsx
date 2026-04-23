import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sobreCerrado from "../assets/sobre-cerrado.svg";
import sobreAbierto from "../assets/sobre-abierto.svg";

const OPENING_FRAMES = [
  { scale: 1, y: 0, rotate: 0, opacityOpen: 0, duration: 0.08 },
  { scale: 0.995, y: -3, rotate: 0.2, opacityOpen: 0.12, duration: 0.08 },
  { scale: 0.99, y: -6, rotate: 0.35, opacityOpen: 0.2, duration: 0.08 },
  { scale: 0.985, y: -10, rotate: 0.45, opacityOpen: 0.35, duration: 0.08 },
  { scale: 0.982, y: -14, rotate: 0.55, opacityOpen: 0.48, duration: 0.08 },
  { scale: 0.978, y: -18, rotate: 0.65, opacityOpen: 0.62, duration: 0.08 },
  { scale: 0.974, y: -20, rotate: 0.72, opacityOpen: 0.78, duration: 0.08 },
  { scale: 0.97, y: -22, rotate: 0.8, opacityOpen: 1, duration: 0.1 },
];

export default function SobreIntro({ onFinish }) {
  const [step, setStep] = useState("cerrado");
  const [frameIndex, setFrameIndex] = useState(0);
  const timersRef = useRef([]);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 13) % 84)}%`,
        top: `${12 + ((i * 9) % 72)}%`,
        delay: i * 0.08,
      })),
    []
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const handleOpen = () => {
    if (step !== "cerrado") return;

    clearAllTimers();
    setStep("abriendo");
    setFrameIndex(0);

    let accumulated = 0;

    OPENING_FRAMES.forEach((frame, index) => {
      accumulated += frame.duration * 1000;
      const timer = setTimeout(() => {
        setFrameIndex(index);

        if (index === OPENING_FRAMES.length - 1) {
          setStep("abierto");

          timersRef.current.push(
            setTimeout(() => setStep("saliendo"), 2200),
            setTimeout(() => onFinish?.(), 3000)
          );
        }
      }, accumulated);

      timersRef.current.push(timer);
    });
  };

  const currentFrame = OPENING_FRAMES[frameIndex] ?? OPENING_FRAMES[0];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#5d7149] px-4">
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: .15; transform: scale(.85); }
          50% { opacity: .9; transform: scale(1.15); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: .25; transform: scale(1); }
          50% { opacity: .55; transform: scale(1.08); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7b88e]/20 blur-3xl"
          style={{ animation: "glowPulse 3.2s ease-in-out infinite" }}
        />

        {sparkles.map((item) => (
          <span
            key={item.id}
            className="absolute text-[#f6eddc]/80"
            style={{
              left: item.left,
              top: item.top,
              animation: `sparkle 2.6s ease-in-out ${item.delay}s infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="relative text-center">
        <AnimatePresence mode="wait">
          {(step === "cerrado" || step === "abriendo") && (
            <motion.div
              key="cerrado-a-abriendo"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{
                opacity: 1,
                scale: currentFrame.scale,
                y: currentFrame.y,
                rotate: currentFrame.rotate,
              }}
              exit={{
                opacity: 0,
                scale: 1.04,
                y: -34,
                filter: "blur(2px)",
              }}
              transition={{
                duration: step === "abriendo" ? 0.06 : 0.45,
                ease: "linear",
              }}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={handleOpen}
                whileHover={step === "cerrado" ? { scale: 1.02 } : {}}
                whileTap={step === "cerrado" ? { scale: 0.985 } : {}}
                className="relative rounded-2xl focus:outline-none"
                aria-label="Abrir invitación"
              >
                <div className="relative w-full max-w-md">
                  <motion.img
                    src={sobreCerrado}
                    alt="Sobre cerrado"
                    className="relative z-[2] w-full cursor-pointer select-none object-contain"
                    draggable="false"
                    animate={{
                      filter:
                        step === "cerrado"
                          ? [
                              "drop-shadow(0 18px 28px rgba(0,0,0,.22))",
                              "drop-shadow(0 26px 38px rgba(0,0,0,.30))",
                              "drop-shadow(0 18px 28px rgba(0,0,0,.22))",
                            ]
                          : "drop-shadow(0 30px 40px rgba(0,0,0,.30))",
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: step === "cerrado" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.img
                    src={sobreAbierto}
                    alt="Transición de apertura"
                    className="pointer-events-none absolute inset-0 z-[3] w-full select-none object-contain"
                    draggable="false"
                    animate={{
                      opacity: step === "abriendo" ? currentFrame.opacityOpen : 0,
                    }}
                    transition={{
                      duration: 0.05,
                      ease: "linear",
                    }}
                  />

                  {step === "abriendo" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pointer-events-none absolute inset-0 z-[1] rounded-full bg-white/10 blur-2xl"
                    />
                  )}
                </div>
              </motion.button>

              <motion.button
                onClick={handleOpen}
                animate={
                  step === "cerrado"
                    ? { opacity: [0.75, 1, 0.75], y: [0, -2, 0] }
                    : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: 2,
                  repeat: step === "cerrado" ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="mt-5 font-serif text-2xl italic text-white underline underline-offset-4"
              >
                Click para abrir
              </motion.button>
            </motion.div>
          )}

          {(step === "abierto" || step === "saliendo") && (
            <motion.div
              key="abierto"
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{
                opacity: step === "saliendo" ? 0 : 1,
                scale: step === "saliendo" ? 1.06 : 1,
                y: step === "saliendo" ? -70 : 0,
                filter: step === "saliendo" ? "blur(4px)" : "blur(0px)",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#f6eddc]/10 blur-3xl" />
                <img
                  src={sobreAbierto}
                  alt="Sobre abierto"
                  className="relative w-full max-w-md object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,.30)]"
                  draggable="false"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step === "saliendo" ? 0 : 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35 }}
                className="mt-5 text-lg text-white/90"
              >
                Abriendo invitación...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}