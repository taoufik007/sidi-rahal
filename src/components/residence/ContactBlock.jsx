import React from "react";
import { Phone, Mail, MessageCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactBlock({ residence }) {
  const whatsappLink = residence.whatsapp
    ? `https://wa.me/${residence.whatsapp.replace(/[^0-9]/g, "")}?text=Bonjour, je suis intéressé(e) par la résidence ${residence.name} à Sidi Rahal Chataï.`
    : null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
      <h3 className="font-display text-lg font-semibold mb-1">Contactez le promoteur</h3>
      <p className="font-body text-xs text-muted-foreground mb-6">
        Pour toute demande d'information ou visite
      </p>

      {residence.promoteur && (
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-body text-sm font-medium">{residence.promoteur}</p>
            <p className="font-body text-xs text-muted-foreground">Promoteur Immobilier</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {residence.phone && (
          <a
            href={`tel:${residence.phone}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <Phone size={16} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-body text-xs text-muted-foreground">Téléphone</p>
              <p className="font-body text-sm font-medium">{residence.phone}</p>
            </div>
          </a>
        )}

        {residence.email && (
          <a
            href={`mailto:${residence.email}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <Mail size={16} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-body text-xs text-muted-foreground">Email</p>
              <p className="font-body text-sm font-medium">{residence.email}</p>
            </div>
          </a>
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-body text-sm gap-2 h-12 rounded-xl">
              <MessageCircle size={18} />
              Contacter via WhatsApp
            </Button>
          </a>
        )}
      </div>

      {residence.price_range && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="font-body text-xs text-muted-foreground mb-1">À partir de</p>
          <p className="font-display text-2xl font-semibold text-primary">
            {residence.price_range}
          </p>
        </div>
      )}
    </div>
  );
}