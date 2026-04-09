import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Avantages", href: "/#avantages" },
    { label: "Résidences", href: "/#residences" },
    { label: "Devis", href: "/devis" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              SIDI RAHAL
            </span>
            <span className="hidden sm:inline-block w-px h-5 bg-primary/40 mx-2" />
            <span className="hidden sm:inline-block font-body text-xs tracking-[0.3em] uppercase text-primary">
              L'Horizon
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() =>
                  link.href.startsWith("/#")
                    ? handleNavClick(link.href)
                    : null
                }
                className="relative font-body text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.href.startsWith("/#") ? (
                  link.label
                ) : (
                  <Link to={link.href}>{link.label}</Link>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() =>
                    link.href.startsWith("/#")
                      ? handleNavClick(link.href)
                      : setMobileOpen(false)
                  }
                  className="block w-full text-left font-body text-base text-foreground/80 hover:text-foreground py-2"
                >
                  {link.href.startsWith("/#") ? (
                    link.label
                  ) : (
                    <Link to={link.href}>{link.label}</Link>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}