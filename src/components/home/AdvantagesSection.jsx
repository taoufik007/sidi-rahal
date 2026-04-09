import React from "react";
import { motion } from "framer-motion";
import { Train, Wind, Waves, TrendingUp } from "lucide-react";

const advantages = [
  {
    icon: Train,
    title: "Proximité Métropolitaine",
    description:
      "À seulement 30 minutes de Casablanca et 20 minutes de Berrechid. Un accès direct via l'autoroute, parfait pour ceux qui travaillent en ville mais rêvent de vivre face à l'océan.",
    stat: "30 min",
    statLabel: "de Casablanca",
  },
  {
    icon: Wind,
    title: "Pureté de l'Air",
    description:
      "L'air marin pur de l'Atlantique combiné à l'absence d'industrie lourde offre une qualité de vie respiratoire exceptionnelle. Un véritable poumon vert côtier.",
    stat: "100%",
    statLabel: "Air pur océanique",
  },
  {
    icon: Waves,
    title: "Plages Préservées",
    description:
      "Des kilomètres de plages de sable doré encore préservées du tourisme de masse. Baignade, surf, et promenades au coucher du soleil dans un cadre naturel intact.",
    stat: "12 km",
    statLabel: "de littoral",
  },
  {
    icon: TrendingUp,
    title: "Croissance de Valeur",
    description:
      "Sidi Rahal connaît une croissance immobilière exceptionnelle. Les prix ont augmenté de manière significative ces dernières années, faisant de chaque investissement une opportunité en or.",
    stat: "+40%",
    statLabel: "en 5 ans",
  },
];

export default function AdvantagesSection() {
  return (
    <section id="avantages" className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Les Avantages
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-6">
            Pourquoi choisir
            <br />
            <span className="text-primary italic">Sidi Rahal Chataï ?</span>
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Un cadre de vie exceptionnel qui allie la sérénité côtière à la 
            proximité des grandes métropoles. Découvrez les quatre piliers qui 
            font de Sidi Rahal la destination résidentielle de demain.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-card border border-border rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <adv.icon size={22} className="text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3">
                {adv.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                {adv.description}
              </p>

              {/* Stat */}
              <div className="flex items-end gap-3 pt-6 border-t border-border">
                <span className="font-display text-3xl font-semibold text-primary">
                  {adv.stat}
                </span>
                <span className="font-body text-xs text-muted-foreground pb-1">
                  {adv.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}