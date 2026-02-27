import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Search, Box, Zap, Settings, 
  Eye, FileText, Cpu, BookOpen, X, ArrowRight, Download
} from 'lucide-react';

// --- DONNÉES DE CULTURE TECHNIQUE AVEC LIENS PDF ---
const CULTURE_DATA = {
  Actionneurs: {
    icon: Zap, color: "text-amber-600", bg: "bg-amber-50", pdfUrl: "#",
    description: "Convertissent l'énergie (électrique, pneumatique) en énergie mécanique.",
    items: [
      { name: "Moteur à Courant Continu", info: "Idéal pour l'asservissement de vitesse." },
      { name: "Vérin Pneumatique", info: "Génère des mouvements de translation linéaires." },
      { name: "Moteur Brushless", info: "Haute performance, sans balais." }
    ]
  },
  Transmetteurs: {
    icon: Settings, color: "text-blue-600", bg: "bg-blue-50", pdfUrl: "#",
    description: "Adaptent le mouvement (vitesse, couple) entre l'actionneur et la charge.",
    items: [
      { name: "Engrenages", info: "Transmission de puissance sans glissement." },
      { name: "Système Vis-Écrou", info: "Transforme la rotation en translation." },
      { name: "Poulies-Courroie", info: "Transmission à distance avec souplesse." }
    ]
  },
  Capteurs: {
    icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50", pdfUrl: "#",
    description: "Mesurent les grandeurs physiques (position, vitesse, effort).",
    items: [
      { name: "Codeur Incrémental", info: "Mesure précise de la position angulaire." },
      { name: "Capteur à Effet Hall", info: "Détection de proximité magnétique." },
      { name: "Jauge de contrainte", info: "Mesure des déformations et des efforts." }
    ]
  },
  Liaisons: {
    icon: Box, color: "text-rose-600", bg: "bg-rose-50", pdfUrl: "#",
    description: "Définissent les mobilités entre deux pièces mécaniques.",
    items: [
      { name: "Liaison Pivot", info: "1 rotation, 0 translation." },
      { name: "Liaison Glissière", info: "0 rotation, 1 translation." },
      { name: "Liaison Hélicoïdale", info: "Rotation et translation liées." }
    ]
  }
};

const SYSTEMS = [
  { id: 'maxpid', name: 'Système Maxpid', category: 'Robotique', description: 'Bras manipulateur asservi en position pour l\'étude des SLCI.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400' },
  { id: 'cordeuse', name: 'Cordeuse de Raquette', category: 'Automatique', description: 'Système de tension de cordage avec régulation de force.', image: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&q=80&w=400' },
  { id: 'pilote', name: 'Pilote Automatique', category: 'Nautisme', description: 'Asservissement de cap pour voilier (vérin électrique).', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400' }
];

export default function LaboPage() {
  const [search, setSearch] = useState("");
  const [selectedCulture, setSelectedCulture] = useState(null);

  const filteredSystems = SYSTEMS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight uppercase">Laboratoire S2I</h1>
            <p className="text-gray-500 mt-2 text-lg">Systèmes et culture technique du laboratoire.</p>
          </div>
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher un système..." className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-900" onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Cartes Culture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {Object.keys(CULTURE_DATA).map((key) => {
            const doc = CULTURE_DATA[key];
            const IsSelected = selectedCulture === key;
            return (
              <motion.div key={key} whileHover={{ y: -5 }} onClick={() => setSelectedCulture(IsSelected ? null : key)} className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center ${IsSelected ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-lg' : 'border-gray-100 hover:shadow-lg'}`}>
                <div className={`p-4 rounded-2xl ${doc.bg} ${doc.color} mb-4`}><doc.icon size={28} /></div>
                <span className="font-bold text-gray-900">{key}</span>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedCulture ? (
            <motion.div key="culture-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-indigo-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-black uppercase mb-2">{selectedCulture}</h2>
                  <p className="text-indigo-200 max-w-xl">{CULTURE_DATA[selectedCulture].description}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a 
                    href={CULTURE_DATA[selectedCulture].pdfUrl}
                    className="flex items-center gap-2 bg-white text-indigo-900 px-5 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    <Download size={18} />
                    Fiche Récap PDF
                  </a>
                  <button onClick={() => setSelectedCulture(null)} className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CULTURE_DATA[selectedCulture].items.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-sm text-indigo-100/70">{item.info}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="systems-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Cpu className="text-indigo-600" /> Systèmes disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSystems.map((system) => (
                  <div key={system.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div className="h-48 overflow-hidden relative">
                      <img src={system.image} alt={system.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{system.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{system.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{system.description}</p>
                      <div className="flex flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-tighter"><FileText size={14} /> Technique</button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-tighter"><BookOpen size={14} /> Ressource</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}