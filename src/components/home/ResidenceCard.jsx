import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Maximize, ArrowUpRight } from "lucide-react";

const statusLabels = {
  livré: "Livré",
  en_construction: "En construction",
  sur_plan: "Sur plan",
};

const statusStyles = {
  livré: "bg-green-500/10 text-green-700 border-green-200",
  en_construction: "bg-primary/10 text-primary border-primary/20",
  sur_plan: "bg-blue-500/10 text-blue-700 border-blue-200",
};

const typeLabels = {
  villa: "Villa",
  appartement: "Appartement",
  duplex: "Duplex",
  riad: "Riad",
};

export default function ResidenceCard({ residence, index }) {
  const mainImage =
    residence.image_urls?.[0] ||
    "https://media.base44.com/images/public/69d545faec79dd35aee25779/b6a574151_generated_703cde38.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/residence/${residence.id}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={mainImage}
            alt={residence.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`${statusStyles[residence.status]} border font-body text-xs px-3 py-1`}
            >
              {statusLabels[residence.status]}
            </Badge>
          </div>

          {/* Hover Arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={16} className="text-primary-foreground" />
          </div>

          {/* Amenities on Hover */}
          {residence.amenities?.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {residence.amenities.slice(0, 4).map((a) => (
                <span
                  key={a}
                  className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-body px-2.5 py-1 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                {typeLabels[residence.type]}
              </p>
              <h3 className="font-display text-lg font-semibold leading-snug">
                {residence.name}
              </h3>
            </div>
          </div>

          {residence.address && (
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin size={12} className="text-muted-foreground flex-shrink-0" />
              <span className="font-body text-xs text-muted-foreground truncate">
                {residence.address}
              </span>
            </div>
          )}

          {/* Details Row */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            {residence.bedrooms_range && (
              <div className="flex items-center gap-1.5">
                <BedDouble size={14} className="text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">
                  {residence.bedrooms_range} Ch.
                </span>
              </div>
            )}
            {residence.surface_range && (
              <div className="flex items-center gap-1.5">
                <Maximize size={14} className="text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">
                  {residence.surface_range}
                </span>
              </div>
            )}
            {residence.price_range && (
              <span className="ml-auto font-body text-xs font-semibold text-primary">
                {residence.price_range}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}