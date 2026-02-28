import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Book, FileText, Settings, Download, 
  Clock, CheckSquare, ClipboardCheck, ArrowRight, 
  ListChecks, GraduationCap, Calendar
} from 'lucide-react';

// --- DONNÉES DU DASHBOARD ---
const DASHBOARD_DATA = {
  PCSI: {
    semaineColle: 20, 
    programmeColle: ["S.L.C.I : Schémas Blocs", "Cinématique : Vecteur rotation", "Statique : Modélisation des actions"],
    cours: [{ name: "S.L.C.I - Schémas Blocs", type: "PDF", category: "Cours" }],
    td: [{ name: "TD 04 : Drone civil", type: "PDF", category: "TD", hasCorrection: true }],
    tp: [{ name: "TP 02 : Maxpid (Identification)", type: "PDF", category: "TP" }],
    devoirs: [
      { id: 1, title: "Devoir Maison n°1", deadline: "12 Mars 2026", status: "open" },
      { id: 2, title: "DS n°3 - Préparation", deadline: "18 Mars 2026", status: "closed" }
    ]
  },
  MPSI: {
    semaineColle: 19, 
    programmeColle: ["Logique combinatoire", "Liaisons mécaniques"],
    cours: [{ name: "Logique & Algèbre de Boole", type: "PDF", category: "Cours" }],
    td: [{ name: "TD 05 : Liaisons mécaniques", type: "PDF", category: "TD", hasCorrection: true }],
    tp: [{ name: "TP 01 : Cordeuse (Statique)", type: "PDF", category: "TP" }],
    devoirs: [
      { id: 1, title: "DM n°1 - Automatique", deadline: "10 Mars 2026", status: "open" }
    ]
  }
};

// --- COMPOSANT COLONNE (Style PCSI) ---
const ResourceColumn = ({ title, icon: Icon, resources, colorClass, bgColor }) => (
  <div className="flex flex-col gap-4">
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bgColor} ${colorClass} w-full border border-current opacity-80 mb-2`}>
      <Icon size={18} />
      <span className="font-bold uppercase tracking-widest text-xs">{title}</span>
      <span className="ml-auto bg-white/50 px-2 py-0.5 rounded text-[10px] font-black">{resources.length}</span>
    </div>
    <div className="flex flex-col gap-3">
      {resources.map((res, index) => (
        <div key={index} className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between min-h-[110px]">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors text-sm leading-tight line-clamp-2">{res.name}</h4>
            <Download size={14} className="text-gray-300 group-hover:text-indigo-500 shrink-0 ml-2" />
          </div>
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              <span className="bg-gray-50 px-1.5 py-0.5 rounded">{res.type}</span>
            </div>
            {res.category === "TD" && res.hasCorrection && (
              <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] transition-all border border-emerald-100 bg-emerald-50/50 px-2 py-1 rounded-lg">
                <CheckSquare size={13} className="shrink-0" /> Corrigé
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function JournalPage() {
  const [filter, setFilter] = useState("PCSI");
  const data = DASHBOARD_DATA[filter];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Raffiné */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-4 transition-colors group">
              <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
            </Link>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight uppercase">Dashboard</h1>
            <p className="text-gray-500 mt-2 text-lg italic font-medium">Suivi des activités et ressources en temps réel.</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            {["PCSI", "MPSI"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* COLONNE GAUCHE : PROGRAMME DE COLLE AVEC NUMÉRO DE SEMAINE */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex flex-col gap-1 uppercase text-xs tracking-widest text-indigo-600">
                <div className="flex items-center gap-2">
                  <ListChecks size={18} /> Programme de colle
                </div>
                <span className="text-[10px] text-gray-400 font-black mt-1 bg-gray-50 px-2 py-1 rounded-md w-fit">
                  Semaine {data.semaineColle}
                </span>
              </h3>
              <ul className="space-y-4">
                {data.programmeColle.map((chap, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-gray-600 leading-tight">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {chap}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOUTON QUIZZ - VERSION AFFINÉE */}
            <button className="w-full bg-white border border-indigo-100 rounded-2xl p-4 flex items-center gap-4 hover:bg-indigo-50 transition-all shadow-sm group">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100">
                <ClipboardCheck size={20} />
              </div>
              <div className="text-left">
                <span className="block font-bold text-gray-900 text-sm uppercase tracking-tight">Quizz Hebdo</span>
                <span className="text-indigo-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  S'auto-évaluer <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          </div>

          {/* COLONNE CENTRE : DERNIÈRES RESSOURCES */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <ResourceColumn title="Dernier Cours" icon={Book} resources={data.cours} colorClass="text-blue-600" bgColor="bg-blue-50/50" />
              <ResourceColumn title="Dernier TD" icon={FileText} resources={data.td} colorClass="text-orange-600" bgColor="bg-orange-50/50" />
              <ResourceColumn title="Dernier TP" icon={Settings} resources={data.tp} colorClass="text-rose-600" bgColor="bg-rose-50/50" />
            </div>

            {/* ZONE DEVOIRS */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-2">
                <Calendar size={20} className="text-indigo-600" /> Travaux à rendre
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.devoirs.map((sub) => (
                  <div key={sub.id} className="p-5 border border-gray-50 rounded-2xl bg-gray-50/50 flex flex-col justify-between group hover:border-indigo-100 transition-all">
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{sub.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-rose-500 font-black mt-2 uppercase tracking-widest">
                        <Clock size={12} /> Échéance : {sub.deadline}
                      </div>
                    </div>
                    <button className={`w-full mt-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${sub.status === 'open' ? 'bg-white border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed border-transparent'}`}>
                      {sub.status === 'open' ? 'Déposer le rendu' : 'Rendu clos'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}