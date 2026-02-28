import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Book, FileText, Download, 
  Zap, CheckCircle2, History, Settings, CheckSquare, ChevronDown 
} from 'lucide-react';

const COURSE_DATA = {
  pcsi: {
    title: "Filière PCSI",
    cycles: [
      {
        id: "01",
        title: "Analyse des systèmes - S.L.C.I",
        actions: { synthese: "#", quizz: "#", annales: "#" },
        resources: [
          { name: "Introduction aux S.I", type: "PDF", category: "Cours" },
          { name: "Modélisation par schémas blocs", type: "PDF", category: "Cours" },
          { name: "Étude d'un drone", type: "PDF", category: "TD", hasCorrection: true },
          { name: "Bras manipulateur", type: "PDF", category: "TD", hasCorrection: true },
          { name: "Système Maxpid", type: "PDF", category: "TP" },
        ]
      },
      {
        id: "02",
        title: "Modélisation Cinématique",
        actions: { synthese: "#", quizz: "#", annales: "#" },
        resources: [
          { name: "Théorie des mécanismes", type: "PDF", category: "Cours" },
          { name: "TD Pompe à huile", type: "PDF", category: "TD", hasCorrection: true },
        ]
      }
    ]
  }
};

const ResourceColumn = ({ title, icon: Icon, resources, colorClass, bgColor }) => (
  <div className="flex flex-col gap-4">
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bgColor} ${colorClass} w-full border border-current opacity-80 mb-2`}>
      <Icon size={18} />
      <span className="font-bold uppercase tracking-widest text-xs">{title}</span>
      <span className="ml-auto bg-white/50 px-2 py-0.5 rounded text-[10px]">{resources.length}</span>
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
            
            <div className="flex gap-2">
              {res.category === "TD" && res.hasCorrection && (
                <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-[11px] transition-all hover:-translate-y-0.5 hover:shadow-sm border border-emerald-100 bg-emerald-50/50 px-3 py-1.5 rounded-lg active:scale-95 uppercase tracking-tight">
                  <CheckSquare size={13} className="shrink-0" /> Corrigé
                </button>
              )}
              
              {res.category === "TP" && (
                <>
                  <button className="flex items-center font-black text-xs text-blue-600 hover:text-blue-700 border border-blue-100 bg-blue-50/50 px-3 py-1.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-sm hover:bg-blue-100/50 active:scale-95 uppercase tracking-tighter">
                    DT
                  </button>
                  <button className="flex items-center font-black text-xs text-indigo-600 hover:text-indigo-700 border border-indigo-100 bg-indigo-50/50 px-3 py-1.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-sm hover:bg-indigo-100/50 active:scale-95 uppercase tracking-tighter">
                    DR
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CycleSection = ({ cycle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cours = cycle.resources.filter(r => r.category === "Cours");
  const tds = cycle.resources.filter(r => r.category === "TD");
  const tps = cycle.resources.filter(r => r.category === "TP");

  return (
    <section className="border-b border-gray-100 pb-12 last:border-0">
      <div onClick={() => setIsOpen(!isOpen)} className="flex flex-col cursor-pointer group mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-black tracking-[0.2em] uppercase">
            Cycle {cycle.id}
          </div>
          <div className="h-[1px] flex-grow bg-gray-100 group-hover:bg-indigo-200 transition-colors"></div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-400 group-hover:text-indigo-600 transition-colors">
            <ChevronDown size={24} />
          </motion.div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">
          {cycle.title}
        </h2>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <a href={cycle.actions.synthese} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Zap size={18} fill="currentColor" /></div>
                  <span className="font-bold text-gray-900 text-sm">Synthèse</span>
                </a>
                <a href={cycle.actions.quizz} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl hover:border-emerald-200 transition-all group shadow-sm hover:shadow-md">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><CheckCircle2 size={18} /></div>
                  <span className="font-bold text-gray-900 text-sm">Quizz</span>
                </a>
                <a href={cycle.actions.annales} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl hover:border-amber-200 transition-all group shadow-sm hover:shadow-md">
                  <div className="bg-amber-50 p-2 rounded-lg text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all"><History size={18} /></div>
                  <span className="font-bold text-gray-900 text-sm">Annales</span>
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ResourceColumn title="Cours" icon={Book} resources={cours} colorClass="text-blue-600" bgColor="bg-blue-50/50" />
                <ResourceColumn title="Travaux Dirigés" icon={FileText} resources={tds} colorClass="text-orange-600" bgColor="bg-orange-50/50" />
                <ResourceColumn title="Travaux Pratiques" icon={Settings} resources={tps} colorClass="text-rose-600" bgColor="bg-rose-50/50" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default function CoursePage() {
  const { id } = useParams();
  const data = COURSE_DATA[id] || { title: "Filière", cycles: [] };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-6 transition-colors group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
        </Link>
        <div className="mb-16 border-b border-gray-200 pb-8">
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">Ressources pédagogiques</span>
          <h1 className="text-5xl font-black text-gray-900 mt-1 uppercase tracking-tight">{data.title}</h1>
        </div>

        <div className="flex flex-col gap-12">
          {data.cycles.map((cycle) => (
            <CycleSection key={cycle.id} cycle={cycle} />
          ))}
        </div>
      </div>
    </div>
  );
}