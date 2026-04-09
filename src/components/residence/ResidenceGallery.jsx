import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ResidenceGallery({ images = [], name }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${name} - Photo ${current + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight size={18} className="text-foreground" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}