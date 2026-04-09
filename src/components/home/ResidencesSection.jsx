import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Livre", value: "livre" },
  { label: "En construction", value: "en_construction" },
  { label: "Villas", value: "villa" },
  { label: "Appartements", value: "appartement" },
];

const mockResidences = [
  { 
    id: '1', 
    name: 'Résidence Ocean Bleu', 
    description: 'Magnifique résidence avec vue panoramique sur l\'océan.',
    status: 'livre',
    type: 'appartement',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    price: '1 200 000 DH',
    location: 'Sidi Rahal Centre'
  },
  { 
    id: '2', 
    name: 'Villa Méditerranée', 
    description: 'Villa de luxe avec piscine privée.',
    status: 'livre',
    type: 'villa',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
    price: '3 500 000 DH',
    location: 'Bord de Mer'
  },
  { 
    id: '3', 
    name: 'Résidence Les Palmiers', 
    description: 'Résidence calme avec espaces verts.',
    status: 'en_construction',
    type: 'appartement',
    images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800'],
    price: '950 000 DH',
    location: 'Quartier Résidentiel'
  },
  { 
    id: '4', 
    name: 'Villa Horizon', 
    description: 'Villa contemporaine avec terrasse panoramique.',
    status: 'livre',
    type: 'villa',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    price: '2 800 000 DH',
    location: 'Zone Touristique'
  },
  { 
    id: '5', 
    name: 'Résidence Marina', 
    description: 'Appartements modernes à 5 min de la plage.',
    status: 'en_construction',
    type: 'appartement',
    images: ['https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800'],
    price: '1 500 000 DH',
    location: 'Front de Mer'
  },
  { 
    id: '6', 
    name: 'Villa Soleil', 
    description: 'Villa traditionnelle marocaine rénovée.',
    status: 'livre',
    type: 'villa',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
    price: '2 200 000 DH',
    location: 'Centre Ville'
  }
];

export default function ResidencesSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [residences, setResidences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setResidences(mockResidences);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredResidences = residences.filter(residence => {
    if (activeFilter === "all") return true;
    if (activeFilter === "villa") return residence.type === "villa";
    if (activeFilter === "appartement") return residence.type === "appartement";
    return residence.status === activeFilter;
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">Chargement des résidences...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Résidences</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === filter.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResidences.map((residence) => (
            <Link to={`/residence/${residence.id}`} key={residence.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              >
                <img
                  src={residence.images?.[0]}
                  alt={residence.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{residence.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{residence.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-lg">{residence.price}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      residence.status === 'livre' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {residence.status === 'livre' ? 'Livre' : 'En construction'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">📍 {residence.location}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredResidences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune résidence trouvée.</p>
          </div>
        )}
      </div>
    </section>
  );
}
