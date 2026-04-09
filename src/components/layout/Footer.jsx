import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">
              SIDI RAHAL
            </h3>
            <p className="font-body text-sm text-background/60 leading-relaxed max-w-xs">
              Votre horizon privé sur la côte atlantique marocaine. 
              Découvrez un cadre de vie exceptionnel entre mer et ciel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 font-body text-sm text-background/60">
              <li><a href="/" className="hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="/#avantages" className="hover:text-primary transition-colors">Avantages</a></li>
              <li><a href="/#residences" className="hover:text-primary transition-colors">Résidences</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-body text-sm text-background/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Sidi Rahal Chataï, Berrechid, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>contact@sidirahal.ma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-background/40">
              © 2026 Sidi Rahal — L'Horizon Atlantique. Tous droits réservés.
            </p>
            <p className="font-body text-xs text-background/40">
              Conçu avec passion pour la côte marocaine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}