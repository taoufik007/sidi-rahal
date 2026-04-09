// Client mocké pour afficher les résidences
const base44 = {
  entities: {
    Residence: {
      list: async (sort, limit) => {
        // Données fictives de résidences
        return {
          data: [
            { 
              id: '1', 
              name: 'Résidence Ocean Bleu', 
              description: 'Magnifique résidence avec vue panoramique sur l\'océan. Appartements spacieux de 2 à 4 chambres.',
              status: 'livre',
              type: 'appartement',
              images: ['https://via.placeholder.com/800x600/3498db/ffffff?text=Ocean+Bleu'],
              price: '1 200 000 DH',
              location: 'Sidi Rahal Centre'
            },
            { 
              id: '2', 
              name: 'Villa Méditerranée', 
              description: 'Villa de luxe avec piscine privée et jardin paysager. Finitions haut de gamme.',
              status: 'livre',
              type: 'villa',
              images: ['https://via.placeholder.com/800x600/e74c3c/ffffff?text=Villa+Mediterranee'],
              price: '3 500 000 DH',
              location: 'Bord de Mer'
            },
            { 
              id: '3', 
              name: 'Résidence Les Palmiers', 
              description: 'Résidence calme avec espaces verts. Proche de toutes commodités.',
              status: 'en_construction',
              type: 'appartement',
              images: ['https://via.placeholder.com/800x600/2ecc71/ffffff?text=Les+Palmiers'],
              price: '950 000 DH',
              location: 'Quartier Résidentiel'
            },
            { 
              id: '4', 
              name: 'Villa Horizon', 
              description: 'Villa contemporaine avec terrasse et vue imprenable.',
              status: 'livre',
              type: 'villa',
              images: ['https://via.placeholder.com/800x600/f39c12/ffffff?text=Villa+Horizon'],
              price: '2 800 000 DH',
              location: 'Zone Touristique'
            },
            { 
              id: '5', 
              name: 'Résidence Marina', 
              description: 'Appartements modernes à 5 min de la plage.',
              status: 'en_construction',
              type: 'appartement',
              images: ['https://via.placeholder.com/800x600/1abc9c/ffffff?text=Marina'],
              price: '1 500 000 DH',
              location: 'Front de Mer'
            },
            { 
              id: '6', 
              name: 'Villa Soleil', 
              description: 'Villa traditionnelle marocaine rénovée.',
              status: 'livre',
              type: 'villa',
              images: ['https://via.placeholder.com/800x600/9b59b6/ffffff?text=Villa+Soleil'],
              price: '2 200 000 DH',
              location: 'Centre Ville'
            }
          ]
        };
      }
    },
    User: {
      me: async () => {
        return { 
          data: { 
            id: 'local_user', 
            name: 'Test User',
            email: 'test@example.com'
          } 
        };
      }
    }
  }
};

// Export both as default and named export
export { base44 };
export default base44;
