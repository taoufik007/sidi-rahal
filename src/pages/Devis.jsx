import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Ruler,
  Bed,
  Layers,
  CheckCircle,
  Download,
  Mail,
  Calculator,
  Sparkles,
  Car,
  Waves,
  ShieldCheck,
  Sun
} from 'lucide-react';
import jsPDF from 'jspdf';

const residences = [
  {
    id: '1',
    name: 'Résidence Ocean Bleu',
    type: 'appartement',
    location: 'Sidi Rahal Centre',
    basePrice: 8500,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    promoteur: 'Groupe Immobilier Atlas',
    status: 'Livré',
  },
  {
    id: '3',
    name: 'Résidence Les Palmiers',
    type: 'appartement',
    location: 'Quartier Résidentiel',
    basePrice: 7200,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600',
    promoteur: 'Palmiers Développement',
    status: 'En construction',
  },
  {
    id: '5',
    name: 'Résidence Marina',
    type: 'appartement',
    location: 'Front de Mer',
    basePrice: 9500,
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600',
    promoteur: 'Marina Development',
    status: 'En construction',
  },
];

const surfaceOptions = [
  { value: 60, label: '60 m²' },
  { value: 80, label: '80 m²' },
  { value: 100, label: '100 m²' },
  { value: 120, label: '120 m²' },
  { value: 140, label: '140 m²' },
  { value: 160, label: '160 m²' },
  { value: 180, label: '180 m²' },
];

const bedroomOptions = [
  { value: 1, label: '1 Chambre' },
  { value: 2, label: '2 Chambres' },
  { value: 3, label: '3 Chambres' },
  { value: 4, label: '4 Chambres' },
];

const floorOptions = [
  { value: 0, label: 'Rez-de-chaussée', multiplier: 0.95 },
  { value: 1, label: '1er Étage', multiplier: 1.0 },
  { value: 2, label: '2ème Étage', multiplier: 1.02 },
  { value: 3, label: '3ème Étage', multiplier: 1.04 },
  { value: 4, label: '4ème Étage', multiplier: 1.06 },
  { value: 5, label: '5ème Étage et +', multiplier: 1.08 },
];

const extras = [
  { id: 'parking', label: 'Place de Parking', price: 80000, icon: Car },
  { id: 'piscine', label: 'Accès Piscine', price: 50000, icon: Waves },
  { id: 'securite', label: 'Sécurité 24/7', price: 30000, icon: ShieldCheck },
  { id: 'terrasse', label: 'Terrasse Privée', price: 120000, icon: Sun },
];

function formatPrice(price) {
  return new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(price) + ' DH';
}

function calculateEstimate(residence, surface, bedrooms, floor, selectedExtras) {
  if (!residence) return null;

  const baseCost = residence.basePrice * surface;
  const bedroomSupplement = (bedrooms - 1) * surface * 200;
  const floorInfo = floorOptions.find(f => f.value === floor);
  const floorMultiplier = floorInfo ? floorInfo.multiplier : 1.0;
  const subtotal = (baseCost + bedroomSupplement) * floorMultiplier;
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);
  const totalHT = subtotal + extrasTotal;
  const tva = totalHT * 0.10;
  const totalTTC = totalHT + tva;

  return {
    baseCost: Math.round(baseCost),
    bedroomSupplement: Math.round(bedroomSupplement),
    floorLabel: floorInfo?.label || '',
    floorAdjustment: Math.round((baseCost + bedroomSupplement) * (floorMultiplier - 1)),
    extrasTotal: Math.round(extrasTotal),
    totalHT: Math.round(totalHT),
    tva: Math.round(tva),
    totalTTC: Math.round(totalTTC),
  };
}

function generatePDFContent(doc, data) {
  const { residence, surface, bedrooms, floor, selectedExtras, estimate, clientName, clientEmail, clientPhone } = data;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Header
  doc.setFillColor(41, 55, 63);
  doc.rect(0, 0, pageWidth, 50, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('SIDI RAHAL - L\'Horizon', margin, 25);
  doc.setFontSize(10);
  doc.text('Devis Estimatif Détaillé', margin, 38);

  const today = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(9);
  doc.text(`Date: ${today}`, pageWidth - margin, 30, { align: 'right' });
  doc.text(`Réf: DEV-${Date.now().toString(36).toUpperCase()}`, pageWidth - margin, 38, { align: 'right' });

  y = 65;
  doc.setTextColor(41, 55, 63);

  // Client info
  if (clientName || clientEmail || clientPhone) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Informations Client', margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    if (clientName) { doc.text(`Nom: ${clientName}`, margin, y); y += 6; }
    if (clientEmail) { doc.text(`Email: ${clientEmail}`, margin, y); y += 6; }
    if (clientPhone) { doc.text(`Téléphone: ${clientPhone}`, margin, y); y += 6; }
    y += 8;
  }

  // Residence info
  doc.setFillColor(245, 240, 235);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 38, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Résidence Sélectionnée', margin + 5, y + 3);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`${residence.name}`, margin + 5, y + 12);
  doc.text(`Emplacement: ${residence.location}`, margin + 5, y + 19);
  doc.text(`Promoteur: ${residence.promoteur}`, margin + 5, y + 26);
  y += 48;

  // Config
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Configuration Choisie', margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  const floorLabel = floorOptions.find(f => f.value === floor)?.label || '';
  const configs = [
    ['Surface', `${surface} m²`],
    ['Chambres', `${bedrooms}`],
    ['Étage', floorLabel],
  ];
  configs.forEach(([label, value]) => {
    doc.text(`${label}:`, margin + 5, y);
    doc.text(value, margin + 60, y);
    y += 7;
  });

  if (selectedExtras.length > 0) {
    doc.text('Options:', margin + 5, y);
    const extraLabels = selectedExtras.map(id => extras.find(e => e.id === id)?.label).filter(Boolean).join(', ');
    doc.text(extraLabels, margin + 60, y);
    y += 7;
  }
  y += 10;

  // Price breakdown
  doc.setFillColor(41, 55, 63);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Détail de l\'Estimation', margin + 5, y + 1);
  y += 12;
  doc.setTextColor(41, 55, 63);
  doc.setFont(undefined, 'normal');

  const lines = [
    [`Prix de base (${surface} m² × ${formatPrice(residence.basePrice)}/m²)`, formatPrice(estimate.baseCost)],
    [`Supplément chambres (${bedrooms} ch.)`, formatPrice(estimate.bedroomSupplement)],
    [`Ajustement étage (${floorLabel})`, formatPrice(estimate.floorAdjustment)],
  ];

  if (selectedExtras.length > 0) {
    lines.push(['Options supplémentaires', formatPrice(estimate.extrasTotal)]);
  }

  lines.forEach(([label, value], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(250, 248, 245);
      doc.rect(margin, y - 4, pageWidth - margin * 2, 8, 'F');
    }
    doc.text(label, margin + 5, y);
    doc.text(value, pageWidth - margin - 5, y, { align: 'right' });
    y += 8;
  });

  y += 4;
  doc.setDrawColor(200, 190, 180);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont(undefined, 'bold');
  doc.text('Total HT', margin + 5, y);
  doc.text(formatPrice(estimate.totalHT), pageWidth - margin - 5, y, { align: 'right' });
  y += 8;
  doc.setFont(undefined, 'normal');
  doc.text('TVA (10%)', margin + 5, y);
  doc.text(formatPrice(estimate.tva), pageWidth - margin - 5, y, { align: 'right' });
  y += 10;

  doc.setFillColor(41, 55, 63);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL TTC', margin + 5, y + 3);
  doc.text(formatPrice(estimate.totalTTC), pageWidth - margin - 5, y + 3, { align: 'right' });

  y += 22;
  doc.setTextColor(150, 140, 130);
  doc.setFontSize(8);
  doc.setFont(undefined, 'italic');
  doc.text('* Ce devis est une estimation indicative et ne constitue pas un engagement contractuel.', margin, y);
  y += 5;
  doc.text('* Les prix peuvent varier selon les disponibilités et les finitions choisies.', margin, y);
  y += 5;
  doc.text('* Validité du devis: 30 jours à compter de la date d\'émission.', margin, y);
  y += 12;
  doc.setTextColor(41, 55, 63);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('SIDI RAHAL L\'Horizon — contact@sidirahal-horizon.ma — +212 5XX XXX XXX', pageWidth / 2, y, { align: 'center' });
}

export default function Devis() {
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [surface, setSurface] = useState(100);
  const [bedrooms, setBedrooms] = useState(2);
  const [floor, setFloor] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);

  const residence = residences.find(r => r.id === selectedResidence);
  const estimate = calculateEstimate(residence, surface, bedrooms, floor, selectedExtras);

  const toggleExtra = (id) => {
    setSelectedExtras(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleDownloadPDF = () => {
    if (!residence || !estimate) return;
    const doc = new jsPDF();
    generatePDFContent(doc, {
      residence, surface, bedrooms, floor, selectedExtras, estimate,
      clientName, clientEmail, clientPhone
    });
    doc.save(`devis-${residence.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!residence || !estimate) return;
    if (!clientName || !clientEmail) {
      setError('Veuillez remplir votre nom et email.');
      return;
    }
    setError('');
    setSending(true);

    const floorLabel = floorOptions.find(f => f.value === floor)?.label || '';
    const extrasLabels = selectedExtras.map(id => extras.find(ex => ex.id === id)?.label).filter(Boolean).join(', ') || 'Aucune';

    const devisDetails = [
      `--- DEVIS ESTIMATIF ---`,
      `Résidence: ${residence.name}`,
      `Emplacement: ${residence.location}`,
      `Promoteur: ${residence.promoteur}`,
      ``,
      `--- CONFIGURATION ---`,
      `Surface: ${surface} m²`,
      `Chambres: ${bedrooms}`,
      `Étage: ${floorLabel}`,
      `Options: ${extrasLabels}`,
      ``,
      `--- DÉTAIL DES PRIX ---`,
      `Prix de base: ${formatPrice(estimate.baseCost)}`,
      `Supplément chambres: ${formatPrice(estimate.bedroomSupplement)}`,
      `Ajustement étage: ${formatPrice(estimate.floorAdjustment)}`,
      `Options: ${formatPrice(estimate.extrasTotal)}`,
      `Total HT: ${formatPrice(estimate.totalHT)}`,
      `TVA (10%): ${formatPrice(estimate.tva)}`,
      `TOTAL TTC: ${formatPrice(estimate.totalTTC)}`,
    ].join('\n');

    const formData = new URLSearchParams({
      'form-name': 'devis',
      'name': clientName,
      'email': clientEmail,
      'phone': clientPhone || '',
      'residence': residence.name,
      'location': residence.location,
      'surface': `${surface} m²`,
      'chambres': String(bedrooms),
      'etage': floorLabel,
      'options': extrasLabels,
      'total-ttc': formatPrice(estimate.totalTTC),
      'devis-details': devisDetails,
      'subject': `Devis Estimatif - ${residence.name} - ${formatPrice(estimate.totalTTC)}`,
    });

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setSent(true);
      } else {
        setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch {
      setError('Erreur réseau. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-20 px-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-amber-400" />
              <h1 className="font-display text-4xl md:text-5xl font-bold">Devis en Ligne</h1>
            </div>
            <p className="text-stone-300 text-lg max-w-2xl">
              Estimez le prix de votre appartement en sélectionnant une résidence et en configurant vos préférences.
              Téléchargez votre devis en PDF ou recevez-le par email.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select residence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-xl font-bold text-stone-800">Choisir une Résidence</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {residences.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedResidence(r.id)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                      selectedResidence === r.id
                        ? 'border-stone-800 shadow-lg ring-2 ring-stone-800/20'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={r.image} alt={r.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-stone-800 text-sm">{r.name}</h3>
                      <p className="text-xs text-stone-500">{r.location}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-stone-600">{formatPrice(r.basePrice)}/m²</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          r.status === 'Livré' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                    {selectedResidence === r.id && (
                      <div className="absolute top-2 right-2 bg-stone-800 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Configure apartment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center text-sm font-bold">2</div>
                <h2 className="text-xl font-bold text-stone-800">Configurer votre Appartement</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Surface */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3">
                    <Ruler className="w-4 h-4" /> Surface
                  </label>
                  <select
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 bg-white focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                  >
                    {surfaceOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3">
                    <Bed className="w-4 h-4" /> Chambres
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 bg-white focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                  >
                    {bedroomOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Floor */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3">
                    <Layers className="w-4 h-4" /> Étage
                  </label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 bg-white focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                  >
                    {floorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Extras */}
              <div className="mt-8">
                <h3 className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-4">
                  <Sparkles className="w-4 h-4" /> Options Supplémentaires
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {extras.map((extra) => {
                    const Icon = extra.icon;
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? 'border-stone-800 bg-stone-800 text-white shadow-lg'
                            : 'border-stone-200 hover:border-stone-400 text-stone-700'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-xs font-semibold">{extra.label}</div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          +{formatPrice(extra.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Step 3: Client info + actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center text-sm font-bold">3</div>
                <h2 className="text-xl font-bold text-stone-800">Vos Coordonnées</h2>
              </div>

              <form ref={formRef} onSubmit={handleSendEmail}>
                <input type="hidden" name="form-name" value="devis" />
                <p style={{ display: 'none' }}>
                  <label>Ne remplissez pas: <input name="bot-field" /></label>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      placeholder="Votre nom"
                      className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      placeholder="votre@email.com"
                      className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {sent && (
                  <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Votre devis a été envoyé avec succès ! Vous le recevrez par email sous peu.
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={!residence || !estimate}
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-800 text-white py-3 px-6 rounded-xl hover:bg-stone-900 transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger en PDF
                  </button>
                  <button
                    type="submit"
                    disabled={!residence || !estimate || sending}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-800 text-stone-800 py-3 px-6 rounded-xl hover:bg-stone-800 hover:text-white transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-5 h-5" />
                    {sending ? 'Envoi en cours...' : 'Envoyer par Email'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right column - Price estimate */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden"
              >
                <div className="bg-stone-800 text-white p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold">Estimation du Prix</h3>
                  </div>
                  {residence ? (
                    <p className="text-stone-300 text-sm">{residence.name}</p>
                  ) : (
                    <p className="text-stone-400 text-sm">Sélectionnez une résidence</p>
                  )}
                </div>

                {estimate ? (
                  <div className="p-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-stone-600">
                        <span>Prix de base ({surface} m²)</span>
                        <span className="font-medium text-stone-800">{formatPrice(estimate.baseCost)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Supplément chambres</span>
                        <span className="font-medium text-stone-800">{formatPrice(estimate.bedroomSupplement)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Ajustement étage</span>
                        <span className="font-medium text-stone-800">{formatPrice(estimate.floorAdjustment)}</span>
                      </div>
                      {selectedExtras.length > 0 && (
                        <div className="flex justify-between text-stone-600">
                          <span>Options</span>
                          <span className="font-medium text-stone-800">{formatPrice(estimate.extrasTotal)}</span>
                        </div>
                      )}

                      <div className="border-t border-stone-200 pt-3 mt-3">
                        <div className="flex justify-between text-stone-600">
                          <span>Total HT</span>
                          <span className="font-medium text-stone-800">{formatPrice(estimate.totalHT)}</span>
                        </div>
                        <div className="flex justify-between text-stone-600 mt-2">
                          <span>TVA (10%)</span>
                          <span className="font-medium text-stone-800">{formatPrice(estimate.tva)}</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-stone-800 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-stone-800">Total TTC</span>
                          <span className="text-2xl font-bold text-stone-800">{formatPrice(estimate.totalTTC)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-stone-50 rounded-xl text-xs text-stone-500">
                      * Estimation indicative. Les prix peuvent varier selon les disponibilités.
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-stone-400">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Configurez votre appartement pour voir l'estimation</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
