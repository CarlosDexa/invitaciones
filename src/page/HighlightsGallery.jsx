import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

const highlightModules = import.meta.glob(
  "../assets/invitacion/Highlights/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  {
    eager: true,
    import: "default",
  }
);

const PREVIEW_LIMIT = 8;

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export default function HighlightsGallery() {
  const images = useMemo(() => {
    return Object.entries(highlightModules)
      .sort(([pathA], [pathB]) => naturalSort(pathA, pathB))
      .map(([path, src], index) => {
        const fileName =
          path.split("/").pop()?.replace(/\.[^.]+$/, "") || `Foto ${index + 1}`;

        return {
          id: index,
          src,
          alt: fileName,
        };
      });
  }, []);

  const [showAll, setShowAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const visibleImages = showAll ? images : images.slice(0, PREVIEW_LIMIT);
  const remainingImages = Math.max(images.length - PREVIEW_LIMIT, 0);

  const closeImage = () => setSelectedIndex(null);

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, images.length]);

  if (!images.length) return null;

  const firstImage = visibleImages[0];
  const secondImage = visibleImages[1];
  const thirdImage = visibleImages[2];
  const collageImages = visibleImages.slice(3, 8);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 text-center"
      >
        <div className="mx-auto h-px w-60 bg-white/45" />

        <h2 className="mt-3 font-link text-[36px] leading-none text-[#f6eddc]">
          Nuestra galería
        </h2>

        <div className="mx-auto mt-3 h-px w-60 bg-white/45" />

        <p className="mx-auto mt-4 max-w-[310px] font-serif-elegant text-[28px] leading-[1.08] text-[#f0dfd7]">
          Un pequeño recuerdo de nuestra sesión
        </p>

        <div className="relative mt-8 overflow-hidden rounded-[30px] p-3 shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #526a43 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative grid grid-cols-1 gap-3">
            {firstImage && (
              <motion.button
                type="button"
                onClick={() => setSelectedIndex(firstImage.id)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative h-[430px] overflow-hidden rounded-t-[24px] bg-black"
              >
                <img
                  src={firstImage.src}
                  alt={firstImage.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute bottom-7 left-0 right-0 px-6 text-center text-white">
                  <p className="font-link text-[58px] leading-none">
                    Shely & André
                  </p>

                  <p className="mx-auto mt-3 max-w-[250px] font-body text-[13px] uppercase tracking-[0.22em]">
                    Una historia que apenas comienza
                  </p>
                </div>
              </motion.button>
            )}

            {secondImage && (
              <motion.button
                type="button"
                onClick={() => setSelectedIndex(secondImage.id)}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative h-[360px] overflow-hidden "
              >
                <img
                  src={secondImage.src}
                  alt={secondImage.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <p className="absolute bottom-5 left-0 right-0 font-link text-[42px] text-white">
                  Nuestros recuerdos
                </p>
              </motion.button>
            )}

            <div className="grid grid-cols-2 gap-2  p-2">
              {collageImages.map((image, index) => {
                const isLastPreview =
                  !showAll &&
                  index === collageImages.length - 1 &&
                  remainingImages > 0;

                return (
                  <motion.button
                    key={image.id}
                    type="button"
                    onClick={() => {
                      if (isLastPreview) {
                        setShowAll(true);
                        return;
                      }

                      setSelectedIndex(image.id);
                    }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index * 0.06, 0.25),
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    className={`group relative overflow-hidden bg-black ${
                      index === 0 || index === 3
                        ? "col-span-2 h-[240px]"
                        : "h-[180px]"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`h-full w-full object-cover transition duration-700 ${
                        isLastPreview
                          ? "scale-105 blur-[1px]"
                          : "group-hover:scale-[1.04]"
                      }`}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {isLastPreview && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-4 text-[#f8f2e8] backdrop-blur-[1px]">
                        <Images className="mb-3 h-8 w-8" />

                        <span className="font-link text-[38px] leading-none">
                          Ver más
                        </span>

                        <span className="mt-2 font-body text-[12px] uppercase tracking-[0.25em]">
                          +{remainingImages} fotos
                        </span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="grid grid-cols-2 gap-3">
              {images.slice(PREVIEW_LIMIT).map((image, index) => (
                <motion.button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedIndex(image.id)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.025, 0.3),
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  className={`group relative overflow-hidden rounded-[22px] border border-white/20 bg-white/5 shadow-lg ${
                    index % 5 === 0 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="mt-7 border border-white/45 px-7 py-2 font-link text-[24px] text-[#f8f2e8] transition duration-300 hover:bg-white/10 hover:text-white"
            >
              Ver menos
            </button>
          </motion.div>
        )}
      </motion.section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button
              type="button"
              onClick={closeImage}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Cerrar galería"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={images[selectedIndex].src}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex w-full max-w-[92vw] flex-col items-center"
            >
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-h-[78vh] max-w-full rounded-[28px] border border-white/20 object-contain shadow-2xl"
              />

              <div className="mt-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-[0.25em] text-white/90">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}