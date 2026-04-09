import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Thermometer } from "lucide-react";

const HERO_IMAGE = "https://media.base44.com/images/public/69d545faec79dd35aee25779/855adaff7_generated_98c77afa.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Vue aérienne de la côte atlantique de Sidi Rahal Chataï"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Côte Atlantique — Maroc
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.95] mb-6">
            SIDI RAHAL
            <br />
            <span className="text-primary italic font-normal">Chataï</span>
          </h1>
          <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10">
            Votre horizon privé sur le littoral atlantique. Un sanctuaire entre 
            l'océan et le ciel, à seulement 30 minutes de Casablanca.
          </p>

          {/* Info Widgets */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Clock size={14} className="text-primary" />
              <span className="font-body text-xs text-white/90">30 min de Casablanca</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Thermometer size={14} className="text-primary" />
              <span className="font-body text-xs text-white/90">22°C moyenne annuelle</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <MapPin size={14} className="text-primary" />
              <span className="font-body text-xs text-white/90">Berrechid, Maroc</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}