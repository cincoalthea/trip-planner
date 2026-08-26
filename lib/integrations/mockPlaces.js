// Fallback used when GEOAPIFY_API_KEY isn't set.
export const MOCK_PLACES = {
  Tokyo: [
    { id: "tok-1", name: "Senso-ji Temple", category: "Historic site", address: "Asakusa, Tokyo" },
    { id: "tok-2", name: "TeamLab Planets", category: "Museum", address: "Koto City, Tokyo" },
    { id: "tok-3", name: "Shibuya Crossing", category: "Landmark", address: "Shibuya, Tokyo" },
    { id: "tok-4", name: "Tsukiji Outer Market", category: "Food market", address: "Chuo City, Tokyo" },
    { id: "tok-5", name: "Meiji Shrine", category: "Historic site", address: "Shibuya, Tokyo" },
    { id: "tok-6", name: "Ichiran Ramen", category: "Restaurant", address: "Multiple locations" },
  ],
  Paris: [
    { id: "par-1", name: "Eiffel Tower", category: "Landmark", address: "Champ de Mars, Paris" },
    { id: "par-2", name: "Musée d'Orsay", category: "Museum", address: "7th arrondissement" },
    { id: "par-3", name: "Le Marais", category: "Neighborhood", address: "4th arrondissement" },
    { id: "par-4", name: "Sainte-Chapelle", category: "Historic site", address: "Île de la Cité" },
    { id: "par-5", name: "Café de Flore", category: "Cafe", address: "Saint-Germain-des-Prés" },
  ],
  "New York": [
    { id: "nyc-1", name: "Central Park", category: "Park", address: "Manhattan" },
    { id: "nyc-2", name: "The Met", category: "Museum", address: "Upper East Side" },
    { id: "nyc-3", name: "Brooklyn Bridge", category: "Landmark", address: "Manhattan/Brooklyn" },
    { id: "nyc-4", name: "Katz's Delicatessen", category: "Restaurant", address: "Lower East Side" },
    { id: "nyc-5", name: "High Line", category: "Park", address: "Chelsea" },
  ],
  Cebu: [
    { id: "ceb-1", name: "Magellan's Cross", category: "Historic site", address: "Cebu City" },
    { id: "ceb-2", name: "Kawasan Falls", category: "Nature", address: "Badian" },
    { id: "ceb-3", name: "Temple of Leah", category: "Landmark", address: "Cebu City" },
    { id: "ceb-4", name: "Larsian BBQ", category: "Restaurant", address: "Cebu City" },
    { id: "ceb-5", name: "Oslob Whale Sharks", category: "Nature", address: "Oslob" },
  ],
  default: [
    { id: "def-1", name: "Old Town Square", category: "Landmark", address: "City center" },
    { id: "def-2", name: "Local History Museum", category: "Museum", address: "City center" },
    { id: "def-3", name: "Riverside Walk", category: "Park", address: "Riverside" },
    { id: "def-4", name: "Central Market", category: "Food market", address: "City center" },
  ],
};
