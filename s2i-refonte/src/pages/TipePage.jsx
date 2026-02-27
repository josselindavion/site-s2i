import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, FileText, Download, Calendar, 
  UploadCloud, ChevronDown, Presentation, CheckCircle2, Clock,
  User, GraduationCap, ArrowRight
} from 'lucide-react';

const TIPE_RESOURCES = [
  { name: "Attendus du TIPE - Bulletin Officiel", type: "PDF" },
  { name: "Procédure de rédaction de la MCOT", type: "PDF" },
  { name: "Guide de l'Oral et supports visuels", type: "PDF" },
];

const TIMELINE_STEPS = [
  { date: "Septembre", title: "Choix du sujet", desc: "Validation de la thématique et première problématique." },
  { date: "Décembre", title: "MCOT - Version 1", desc: "Cadrage du sujet, bibliographie et objectifs." },
  { date: "Mars", title: "Expérimentations", desc: "Phase active de tests, mesures et simulations." },
  { date: "Mai", title: "Finalisation", desc: "Rédaction finale et préparation du support oral." },
];

const SUBMISSIONS = [
  { id: 1, title: "MCOT - Version 1", deadline: "15 Décembre 2025", status: "open" },
  { id: 2, title: "MCOT - Version 2", deadline: "15 Février 2026", status: "closed" },
  { id: 3, title: "Dossier Final", deadline: "01 Juin 2026", status: "closed" },
];

const ARCHIVES_TIPE = [
  {
    year: "2024",
    projects: [
      { student: "Jean Dupont", topic: "Étude et optimisation d'un moteur Stirling de type Gamma", hasSlides: true, hasMCOT: true },
      { student: "Sophie Martin", topic: "Asservissement et stabilisation d'un drone quadrirotor en vol stationnaire", hasSlides: true, hasMCOT: true },
    ]
  },
  {
    year: "2023",
    projects: [
      { student: "Lucas Bernard", topic: "Analyse fréquentielle et amortissement d'un pont suspendu", hasSlides: true, hasMCOT: true },
    ]
  }
];

export default function TipePage() {
  const [openYear, setOpenYear] = useState(null);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">TIPE</h1>
          <p className="text-gray-500 mt-2 text-lg italic font-medium tracking-tight">Travaux d'Initiative Personnelle Encadrés</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLONNE GAUCHE (Inchangée) */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <FileText className="text-indigo-600" size={20} /> Documents de référence
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TIPE_RESOURCES.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group cursor-pointer">
                    <span className="text-sm font-bold text-gray-700">{res.name}</span>
                    <Download size={16} className="text-gray-300 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <UploadCloud className="text-indigo-600" size={20} /> Espace de rendu
              </h2>
              <div className="space-y-4">
                {SUBMISSIONS.map((sub) => (
                  <div key={sub.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-indigo-100 shadow-sm">
                    <div>
                      <h4 className="font-bold text-gray-900">{sub.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-rose-500 font-bold mt-1 uppercase tracking-tighter">
                        <Clock size={12} /> Date max : {sub.deadline}
                      </div>
                    </div>
                    <button className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${sub.status === 'open' ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'}`}>
                      {sub.status === 'open' ? 'Déposer mon fichier' : 'Rendu fermé'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLONNE DROITE (Inchangée) */}
          <aside className="bg-white border border-gray-100 rounded-3xl p-8 h-fit shadow-sm">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800">
              <Calendar className="text-indigo-600" size={20} /> Calendrier
            </h2>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-50">
              {TIMELINE_STEPS.map((step, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-4 border-indigo-600 rounded-full z-10 transition-transform group-hover:scale-125" />
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{step.date}</span>
                  <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* --- SECTION BAS : STYLE AMÉLIORÉ --- */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="flex flex-col mb-10">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              Inspirations & Archives
            </h2>
            <p className="text-gray-500 font-medium mt-1">Consultez les travaux remarquables des années précédentes.</p>
          </div>

          <div className="space-y-6">
            {ARCHIVES_TIPE.map((yearGroup) => {
              const isOpen = openYear === yearGroup.year;
              return (
                <div key={yearGroup.year} className={`bg-white border rounded-2xl transition-all duration-300 ${isOpen ? 'border-indigo-200 shadow-xl shadow-indigo-50' : 'border-gray-100 shadow-sm'}`}>
                  <button 
                    onClick={() => setOpenYear(isOpen ? null : yearGroup.year)}
                    className="w-full flex items-center justify-between p-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${isOpen ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'}`}>
                        SESSION {yearGroup.year}
                      </div>
                      <span className="font-bold text-gray-400 text-sm hidden sm:inline">•</span>
                      <span className="font-bold text-gray-500 text-sm italic">{yearGroup.projects.length} projets archivés</span>
                    </div>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {yearGroup.projects.map((proj, i) => (
                            <div key={i} className="group/card bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all flex flex-col justify-between min-h-[160px]">
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400 group-hover/card:bg-indigo-100 group-hover/card:text-indigo-600 transition-colors">
                                    <User size={14} />
                                  </div>
                                  <h5 className="font-bold text-gray-900 group-hover/card:text-indigo-600 transition-colors">{proj.student}</h5>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                                  {proj.topic}
                                </p>
                              </div>

                              <div className="flex gap-3 mt-6">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-[11px] font-bold uppercase py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-sm transition-all shadow-sm">
                                  <Presentation size={14} className="opacity-70" /> Support Oral
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-[11px] font-bold uppercase py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-sm transition-all shadow-sm">
                                  <FileText size={14} className="opacity-70" /> MCOT Finale
                                </button>
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
        </section>
      </div>
    </div>
  );
}