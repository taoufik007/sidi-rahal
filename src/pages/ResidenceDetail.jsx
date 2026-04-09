import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  Ruler,
  Bed,
  Calendar,
  Home,
  Building2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

// Vos données mockées (gardez les mêmes)
const residences = [
  { 
    id: '1', 
    name: 'Résidence Ocean Bleu', 
    description: 'Magnifique résidence avec vue panoramique sur l\'océan. Appartements spacieux de 2 à 4 chambres.',
    longDescription: 'Cette résidence de luxe offre une vue imprenable sur l\'océan. Chaque appartement est fini avec des matériaux de haute qualité. La résidence comprend une piscine, un spa, une salle de sport et un jardin paysager. Située à 5 minutes de la plage et à proximité de toutes les commodités.',
    status: 'livre',
    type: 'appartement',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800'
    ],
    price: '1 200 000 DH',
    location: 'Sidi Rahal Centre',
    surface: '120 - 180 m²',
    chambres: '2-4',
    livraison: 'Immédiate',
    adresse: 'Boulevard de l\'Océan, Sidi Rahal Centre',
    promoteur: 'Groupe Immobilier Atlas',
    pointsForts: [
      'Vue panoramique imprenable sur l\'océan Atlantique',
      'Finitions haut de gamme avec marbre et bois noble',
      'Complexe fermé et sécurisé avec gardiennage permanent',
      'À 5 minutes à pied de la plage principale'
    ],
    commodites: [
      'Piscine', 'Sécurité 24/7', 'Accès direct plage', 
      'Parking souterrain', 'Espaces verts', 'Aire de jeux enfants',
      'Ascenseur', 'Terrasses vue mer', 'Salle de sport', 'Spa'
    ]
  },
  { 
    id: '2', 
    name: 'Villa Méditerranée', 
    description: 'Villa de luxe avec piscine privée et jardin paysager.',
    longDescription: 'Villa contemporaine de 300m² sur un terrain de 800m². Piscine à débordement, jardin méditerranéen, garage pour 2 voitures. Finitions haut de gamme, climatisation centrale, domotique intégrée.',
    status: 'livre',
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    price: '3 500 000 DH',
    location: 'Bord de Mer',
    surface: '300 m²',
    chambres: '5',
    livraison: 'Immédiate',
    adresse: 'Route de la Plage, Sidi Rahal',
    promoteur: 'Villas Prestige SARL',
    pointsForts: [
      'Piscine à débordement',
      'Domotique intégrée',
      'Jardin paysager méditerranéen',
      'Vue imprenable sur mer'
    ],
    commodites: [
      'Piscine privée', 'Jardin paysager', 'Garage 2 places', 
      'Climatisation centrale', 'Domotique', 'Alarme connectée',
      'Vidéophone', 'Cuisine équipée', 'Home cinéma'
    ]
  },
  { 
    id: '3', 
    name: 'Résidence Les Palmiers', 
    description: 'Résidence calme avec espaces verts.',
    longDescription: 'Résidence paisible entourée de palmiers. Appartements spacieux avec balcons. Piscine commune, espace de jeux pour enfants, parking souterrain.',
    status: 'en_construction',
    type: 'appartement',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    price: '950 000 DH',
    location: 'Quartier Résidentiel',
    surface: '90 - 140 m²',
    chambres: '2-3',
    livraison: 'Prévue en Décembre 2025',
    adresse: 'Quartier Résidentiel, Sidi Rahal',
    promoteur: 'Palmiers Développement',
    pointsForts: [
      'Cadre calme et verdoyant',
      'Espaces verts paysagers',
      'Proximité des écoles et commerces',
      'Accès facile aux axes routiers'
    ],
    commodites: [
      'Piscine commune', 'Aire de jeux', 'Parking souterrain',
      'Espaces verts', 'Ascenseur', 'Balcons panoramiques',
      'Local à vélos', 'Vidéosurveillance'
    ]
  },
  { 
    id: '4', 
    name: 'Villa Horizon', 
    description: 'Villa contemporaine avec terrasse et vue imprenable.',
    longDescription: 'Villa moderne avec terrasse panoramique offrant une vue à 360 degrés. Jardin paysager, piscine, home cinéma, salle de sport privée.',
    status: 'livre',
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'
    ],
    price: '2 800 000 DH',
    location: 'Zone Touristique',
    surface: '250 m²',
    chambres: '4',
    livraison: 'Immédiate',
    adresse: 'Zone Touristique, Sidi Rahal',
    promoteur: 'Horizon Luxury Properties',
    pointsForts: [
      'Vue panoramique à 360 degrés',
      'Terrasse rooftop aménagée',
      'Home cinéma intégré',
      'Salle de sport privée'
    ],
    commodites: [
      'Piscine à débordement', 'Home cinéma', 'Salle de sport',
      'Jardin paysager', 'Garage 3 places', 'Domotique avancée',
      'Système audio intégré', 'Chauffage au sol'
    ]
  },
  { 
    id: '5', 
    name: 'Résidence Marina', 
    description: 'Appartements modernes à 5 min de la plage.',
    longDescription: 'Complexe moderne à 5 minutes à pied de la plage. Appartements tout équipés, vue sur mer, piscine, sauna, salle de sport.',
    status: 'en_construction',
    type: 'appartement',
    images: [
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800'
    ],
    price: '1 500 000 DH',
    location: 'Front de Mer',
    surface: '100 - 160 m²',
    chambres: '2-3',
    livraison: 'Prévue en Mars 2026',
    adresse: 'Front de Mer, Sidi Rahal',
    promoteur: 'Marina Development',
    pointsForts: [
      'À 5 minutes à pied de la plage',
      'Vue sur mer garantie',
      'Finitions modernes haut de gamme',
      'Proche des commerces et restaurants'
    ],
    commodites: [
      'Piscine', 'Sauna', 'Salle de sport', 'Sécurité 24/7',
      'Parking souterrain', 'Ascenseur', 'Local à vélos',
      'Cuisine équipée', 'Climatisation réversible'
    ]
  },
  { 
    id: '6', 
    name: 'Villa Soleil', 
    description: 'Villa traditionnelle marocaine rénovée.',
    longDescription: 'Villa de charme alliant tradition marocaine et modernité. Riad intérieur, fontaine, patio, 4 suites, hammam privé.',
    status: 'livre',
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    price: '2 200 000 DH',
    location: 'Centre Ville',
    surface: '280 m²',
    chambres: '4',
    livraison: 'Immédiate',
    adresse: 'Centre Ville, Sidi Rahal',
    promoteur: 'Soleil Immobilier',
    pointsForts: [
      'Architecture traditionnelle marocaine',
      'Riad intérieur avec fontaine',
      'Hammam privé',
      'Patio andalou'
    ],
    commodites: [
      'Hammam privé', 'Riad intérieur', 'Fontaine traditionnelle',
      'Jardin andalou', 'Parking privé', 'Cheminée',
      'Terrasse solarium', 'Cuisine traditionnelle'
    ]
  }
];

export default function ResidenceDetail() {
  const { id } = useParams();
  const residence = residences.find(r => r.id === id);

  if (!residence) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Résidence non trouvée</h1>
          <Link to="/" className="text-stone-600 hover:text-stone-800 underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux résidences</span>
        </Link>
      </div>

      {/* Hero Section avec grande image */}
      <div className="relative h-[70vh] bg-stone-900 mt-4">
        <img 
          src={residence.images[0]} 
          alt={residence.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent"></div>
        
        {/* Badges flottants */}
        <div className="absolute top-6 left-6 flex gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
            residence.status === 'livre' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-amber-600 text-white'
          }`}>
            {residence.status === 'livre' ? 'Livré' : 'En construction'}
          </span>
          <span className="bg-stone-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {residence.type === 'villa' ? 'Villa' : 'Appartement'}
          </span>
        </div>
        
        {/* Titre en bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">{residence.name}</h1>
            <div className="flex items-center gap-2 text-stone-200">
              <MapPin className="w-5 h-5" />
              <span>{residence.adresse}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Colonne principale - Informations détaillées */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Prix */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-stone-800 mb-2">
                  {residence.price}
                </div>
                <p className="text-stone-500">Prix TTC</p>
              </div>
            </div>

            {/* Caractéristiques clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                <Bed className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                <div className="font-semibold text-stone-800">{residence.chambres}</div>
                <div className="text-sm text-stone-500">Chambres</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                <Ruler className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                <div className="font-semibold text-stone-800">{residence.surface}</div>
                <div className="text-sm text-stone-500">Surface</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                <Calendar className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                <div className="font-semibold text-stone-800">{residence.livraison}</div>
                <div className="text-sm text-stone-500">Livraison</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                <Home className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                <div className="font-semibold text-stone-800">{residence.type === 'villa' ? 'Villa' : 'Appartement'}</div>
                <div className="text-sm text-stone-500">Type</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">À propos de cette résidence</h2>
              <p className="text-stone-600 leading-relaxed mb-6">{residence.description}</p>
              <p className="text-stone-600 leading-relaxed">{residence.longDescription}</p>
            </div>

            {/* Points Forts */}
            <div className="bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl p-8 border border-stone-200">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-stone-700" />
                <h2 className="text-2xl font-bold text-stone-800">Points Forts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {residence.pointsForts.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-stone-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-stone-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commodités & Équipements */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Commodités & Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {residence.commodites.map((commodite, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
                    <span className="text-stone-600">{commodite}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Galerie d'images */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Galerie</h2>
              <div className="grid grid-cols-2 gap-4">
                {residence.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img}
                    alt={`${residence.name} vue ${index + 1}`}
                    className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer shadow-sm"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Colonne latérale - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-200">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Contactez le promoteur</h3>
                <p className="text-stone-500 text-sm mb-6">
                  Pour toute demande d'information ou visite
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-stone-700">
                    <Building2 className="w-5 h-5 text-stone-600" />
                    <span className="text-sm">{residence.promoteur}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-700">
                    <Phone className="w-5 h-5 text-stone-600" />
                    <span className="text-sm">+212 5XX XXX XXX</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-700">
                    <Mail className="w-5 h-5 text-stone-600" />
                    <span className="text-sm">contact@groupoatlas.ma</span>
                  </div>
                </div>

                <button className="w-full bg-stone-800 text-white py-3 rounded-xl hover:bg-stone-900 transition-colors font-semibold mb-3 shadow-sm">
                  Demander une visite
                </button>
                <button className="w-full border-2 border-stone-300 text-stone-700 py-3 rounded-xl hover:bg-stone-50 transition-colors font-semibold">
                  Télécharger la brochure
                </button>

                <div className="mt-6 pt-6 border-t border-stone-200 text-center">
                  <p className="text-xs text-stone-400">
                    * Les informations sont fournies à titre indicatif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}