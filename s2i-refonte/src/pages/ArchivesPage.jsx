import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, FileText, CheckSquare, Trophy, 
  Landmark, GraduationCap, Calendar, Download,
  TrendingUp, Award, BarChart3, Star, ChevronDown 
} from 'lucide-react';

// --- DONNÉES ENRICHIES ---
const ARCHIVES_DS = [
  {
    year: "2024 - 2025",
    subjects: [
      { id: 1, name: "DS n°1 : Asservissements & Schémas blocs", date: "Oct 2024" },
      { id: 2, name: "DS n°2 : Cinématique du solide", date: "Dec 2024" },
    ]
  },
  {
    year: "2023 - 2024",
    subjects: [
      { id: 3, name: "DS n°3 : Statique & Liaisons", date: "Jan 2024" },
      { id: 4, name: "DS n°4 : Dynamique & Énergétique", date: "Mars 2024" },
    ]
  }
];

const CONCOURS_DATA = {
  "X / ENS": [
    { year: 2024, name: "Sujet SI : Robotique chirurgicale", hasCorr: true, complexity: 5 },
    { year: 2023, name: "Sujet SI : Drone de surveillance", hasCorr: true, complexity: 4 },
  ],
  "Mines-Ponts": [
    { year: 2024, name: "Sujet SI : Système de freinage TGV", hasCorr: true, complexity: 4 },
  ],
  "Centrale-Supélec": [
    { year: 2024, name: "Sujet SI : Télescope spatial", hasCorr: true, complexity: 3 },
  ],
  "CCINP": [
    { year: 2024, name: "Sujet SI : Pompe à insuline", hasCorr: true, complexity: 2 },
  ]
};

const LAKANAL_RESULTS = [
  { year: "2024", psi: "85%", mp: "82%", avg_si: "14.2" },
  { year: "2023", psi: "88%", mp: "79%", avg_si: "13.8" },
  { year: "2022", psi: "82%", mp: "85%", avg_si: "14.5" },
];

export default function ArchivesPage() {
  const [activeTab, setActiveTab] = useState('ds');
  const [openBank, setOpenBank] = useState(null); // État pour l'accordéon des concours

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
            <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
          </Link>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight uppercase">Archives S2I</h1>
          <p className="text-gray-500 mt-2 text-lg italic">Annales, corrigés et statistiques de réussite.</p>
        </div>

        {/* Navigation par Onglets */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm mb-12 w-fit">
          {[
            { id: 'ds', label: 'Devoirs Surveillés', icon: FileText },
            { id: 'concours', label: 'Annales Concours', icon: Landmark },
            { id: 'results', label: 'Résultats Lakanal', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu Dynamique */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* --- SECTION DS (Inchangée) --- */}
            {activeTab === 'ds' && (
              <div className="space-y-12 text-left">
                {ARCHIVES_DS.map((yearSection, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-4 mb-6">
                      <Calendar className="text-indigo-600" size={20} />
                      <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Année {yearSection.year}</h2>
                      <div className="h-[1px] flex-grow bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {yearSection.subjects.map((ds) => (
                        <div key={ds.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:border-indigo-100 transition-all flex items-center justify-between group">
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase mb-1 block">{ds.date}</span>
                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{ds.name}</h4>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1.5 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">Sujet</button>
                            <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100">Corrigé</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- SECTION CONCOURS (Accordéon + Étoiles) --- */}
            {activeTab === 'concours' && (
              <div className="grid grid-cols-1 gap-6 text-left max-w-4xl mx-auto lg:mx-0">
                {Object.keys(CONCOURS_DATA).map((bank) => {
                  const isExpanded = openBank === bank;
                  return (
                    <div key={bank} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <button 
                        onClick={() => setOpenBank(isExpanded ? null : bank)}
                        className="w-full flex items-center justify-between p-8 text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl transition-all ${isExpanded ? 'bg-indigo-600 text-white rotate-12 shadow-lg shadow-indigo-100' : 'bg-indigo-50 text-indigo-600'}`}>
                            <Landmark size={24} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-black uppercase tracking-tighter transition-colors ${isExpanded ? 'text-indigo-600' : 'text-gray-900'}`}>
                              Banque {bank}
                            </h3>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{CONCOURS_DATA[bank].length} sujets disponibles</span>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-300 group-hover:text-indigo-600 transition-colors">
                          <ChevronDown size={28} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 space-y-3">
                              <div className="h-[1px] bg-gray-50 mb-6 w-full"></div>
                              {CONCOURS_DATA[bank].map((sujet, i) => (
                                <div key={i} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50/50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all group">
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-3">
                                      <span className="font-mono text-sm font-black text-indigo-400">{sujet.year}</span>
                                      <span className="font-bold text-gray-800 text-sm">{sujet.name}</span>
                                    </div>
                                    {/* Notation Étoiles */}
                                    <div className="flex items-center gap-1 text-amber-400">
                                      {[...Array(5)].map((_, starIndex) => (
                                        <Star 
                                          key={starIndex} 
                                          size={12} 
                                          fill={starIndex < sujet.complexity ? "currentColor" : "transparent"} 
                                          className={starIndex < sujet.complexity ? "" : "text-gray-200"}
                                        />
                                      ))}
                                      <span className="text-[8px] font-black uppercase text-gray-400 ml-2 tracking-tighter">Complexité</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all" title="Sujet"><FileText size={18} /></button>
                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-600 hover:border-emerald-100 shadow-sm transition-all" title="Corrigé"><CheckSquare size={18} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- SECTION RÉSULTATS (Inchangée) --- */}
            {activeTab === 'results' && (
              <div className="space-y-8 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <BarChart3 className="mx-auto text-indigo-600 mb-4" size={32} />
                    <span className="block text-4xl font-black text-gray-900">14.2</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Moyenne SI Concours</span>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <TrendingUp className="mx-auto text-emerald-500 mb-4" size={32} />
                    <span className="block text-4xl font-black text-gray-900">85%</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admissibilité PSI</span>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <Award className="mx-auto text-amber-500 mb-4" size={32} />
                    <span className="block text-4xl font-black text-gray-900">1er quart</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Classement National</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">Année</th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">Réussite PSI</th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">Réussite MP</th>
                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 text-right">Moyenne SI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-medium">
                      {LAKANAL_RESULTS.map((res) => (
                        <tr key={res.year} className="hover:bg-indigo-50/30 transition-colors group">
                          <td className="p-6 text-gray-900 font-black">{res.year}</td>
                          <td className="p-6 text-emerald-600">{res.psi}</td>
                          <td className="p-6 text-indigo-600">{res.mp}</td>
                          <td className="p-6 text-right font-mono font-bold text-gray-500 group-hover:text-indigo-600 transition-colors">{res.avg_si} / 20</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}