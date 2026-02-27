import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Search, Box, Zap, Settings, 
  Eye, FileText, Cpu, BookOpen 
} from 'lucide-react';
import Navbar from '../components/Navbar';

const SYSTEMS = [
  { 
    id: 'maxpid', 
    name: 'Système Maxpid', 
    category: 'Robotique', 
    description: 'Bras manipulateur asservi en position pour l\'étude des SLCI.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'cordeuse', 
    name: 'Cordeuse de Raquette', 
    category: 'Automatique', 
    description: 'Système de tension de cordage avec régulation de force.',
    image: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 'pilote', 
    name: 'Pilote Automatique', 
    category: 'Nautisme', 
    description: 'Asservissement de cap pour voilier (vérin électrique).',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400'
  }
];

const CULTURE_DOCS = [
  { title: "Actionneurs", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "Transmetteurs", icon: Settings, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Capteurs", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Liaisons", icon: Box, color: "text-rose-600", bg: "bg-rose-50" }
];

export default function LaboPage() {
  const [search, setSearch] = useState("");

  const filteredSystems = SYSTEMS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Retour à l'accueil
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight uppercase">Laboratoire S2I</h1>
            <p className="text-gray-500 mt-2 text-lg">Systèmes et culture technique du laboratoire.</p>
          </div>
          
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Rechercher un système..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-900"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {CULTURE_DOCS.map((doc, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all"
            >
              <div className={`p-4 rounded-2xl ${doc.bg} ${doc.color} mb-4`}>
                <doc.icon size={28} />
              </div>
              <span className="font-bold text-gray-900">{doc.title}</span>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Cpu className="text-indigo-600" /> Systèmes disponibles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSystems.map((system) => (
            <div key={system.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="h-48 overflow-hidden relative">
                <img src={system.image} alt={system.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {system.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {system.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {system.description}
                </p>
                
                {/* Boutons côte à côte avec le même style sobre */}
                <div className="flex flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-tighter">
                    <FileText size={14} /> Technique
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-tighter">
                    <BookOpen size={14} /> Ressource
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}