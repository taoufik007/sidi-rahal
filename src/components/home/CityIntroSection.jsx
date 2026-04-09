import React from "react";
import { motion } from "framer-motion";

const INTERIOR_IMAGE = "https://media.base44.com/images/public/69d545faec79dd35aee25779/ded9017e8_generated_4ffc78f8.png";
const POOL_IMAGE = "https://media.base44.com/images/public/69d545faec79dd35aee25779/7f4771500_generated_47045ea9.png";

export default function CityIntroSection() {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Découvrir la Ville
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Un joyau caché sur la
              <br />
              <span className="text-primary italic">côte atlantique</span>
            </h2>
            <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed">
              <p>
                Nichée entre Casablanca et Berrechid, Sidi Rahal Chataï est une 
                station balnéaire en pleine métamorphose. Autrefois paisible village 
                côtier, elle se transforme aujourd'hui en une destination résidentielle 
                prisée, alliant le charme authentique du Maroc à des infrastructures modernes.
              </p>
              <p>
                La ville bénéficie d'un climat doux toute l'année, de plages immaculées 
                s'étendant sur des kilomètres, et d'un environnement naturel préservé. 
                C'est l'endroit idéal pour ceux qui cherchent à s'évader du rythme 
                effréné de la métropole sans sacrifier l'accessibilité.
              </p>
              <p>
                Avec le développement de nouvelles résidences de standing, Sidi Rahal 
                Chataï s'impose comme la prochaine grande destination de la côte 
                atlantique marocaine — un investissement dans un art de vivre.
              </p>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={INTERIOR_IMAGE}
                alt="Vue intérieure d'un appartement avec vue sur l'océan à Sidi Rahal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-background shadow-xl hidden lg:block">
              <img
                src={POOL_IMAGE}
                alt="Piscine à débordement avec vue sur l'Atlantique"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}