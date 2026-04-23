import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoApertura from "../assets/invitacion-abriendo.mp4";

export default function SobreIntro({ onAnimationComplete }) {
  const videoRef = useRef(null);
  const cutTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showTapHint, setShowTapHint] = useState(true);

  const MAX_DURATION = 3;

  useEffect(() => {
    const timer = setTimeout(() => setShowTapHint(false), 4000);

    return () => {
      clearTimeout(timer);
      if (cutTimerRef.current) clearTimeout(cutTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const startExitAnimation = () => {
    if (isExiting) return;

    setIsExiting(true);

    exitTimerRef.current = setTimeout(() => {
      onAnimationComplete?.();
    }, 800);
  };

  const handlePlay = async () => {
    if (!videoRef.current || isPlaying) return;

    try {
      const video = videoRef.current;

      setIsPlaying(true);
      setShowTapHint(false);

      video.currentTime = 0;
      await video.play();

      cutTimerRef.current = setTimeout(() => {
        video.pause();
        startExitAnimation();
      }, MAX_DURATION * 1000);
    } catch (error) {
      console.error("Error al reproducir el video:", error);
      startExitAnimation();
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 overflow-hidden bg-[#5d7149]"
          onClick={handlePlay}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <video
              ref={videoRef}
              className="h-screen w-auto max-w-none object-contain"
              src={videoApertura}
              playsInline
              preload="auto"
              muted
            />
          </motion.div>

          <AnimatePresence>
            {showTapHint && !isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1 }}
                className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
              >
                <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                  <p className="font-serif text-sm uppercase tracking-widest text-white">
                    Toca para iniciar
                  </p>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-white/30"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}