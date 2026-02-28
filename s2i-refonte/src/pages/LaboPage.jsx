import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Box, Zap, Settings, 
  Eye, FileText, Cpu, BookOpen, X, ArrowRight, Download,
  Info, Target, ExternalLink, Globe, Layout, Activity,
  Move
} from 'lucide-react';

// --- COMPOSANT DE RENDU DES TORSEURS ---
const TorsorDisplay = ({ title, col1, col2, point, characteristic }) => (
  <div className="p-5 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
    <span className="text-[9px] font-black text-indigo-400 uppercase mb-4 block tracking-widest">{title}</span>
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center font-serif italic text-base text-indigo-950">
        <span className="text-4xl font-extralight mr-2 select-none">{"{"}</span>
        <div className="grid grid-cols-2 gap-x-8 text-center leading-relaxed">
          <div className="flex flex-col">
            {col1.map((v, i) => <span key={i} className="min-h-[20px]">{v}</span>)}
          </div>
          <div className="flex flex-col">
            {col2.map((v, i) => <span key={i} className="min-h-[20px]">{v}</span>)}
          </div>
        </div>
        <span className="text-4xl font-extralight ml-2 select-none">{"}"}</span>
        <div className="self-end mb-[-6px] ml-1">
           <span className="text-[11px] font-bold not-italic text-indigo-400">{point}</span>
        </div>
      </div>
      {characteristic && (
        <div className="mt-4 pt-2 border-t border-indigo-100/50 w-full text-center">
          <span className="text-[10px] font-bold text-indigo-500 uppercase italic tracking-tight">
             {characteristic}
          </span>
        </div>
      )}
    </div>
  </div>
);

const CULTURE_DATA = {
  Actionneurs: {
    icon: Zap, color: "text-amber-600", bg: "bg-amber-50",
    description: "Ils transforment l'énergie modulée en puissance mécanique.",
    items: [
      { 
        name: "Moteur à Courant Continu", 
        info: "Asservissement de vitesse.",
        details: "Le moteur à courant continu (MCC) est un convertisseur réversible. Il transforme l'énergie électrique en puissance mécanique par interaction électromagnétique.",
        principe: "Force de Laplace : interaction courant / champ magnétique.",
        entrees_sorties: { entrée: "U (V), I (A)", sortie: "Ω (rad/s), C (Nm)" },
        caracs: ["C = Kc · I", "E = Ke · Ω", "U = E + R · I"],
        links: [
          { label: "Fiche Éduscol : Le MCC", url: "https://eduscol.education.fr/" },
          { label: "Animation : Force de Laplace", url: "#" }
        ],
        img: "/mcc.webp"
      }
    ]
  },
  Transmetteurs: {
    icon: Settings, color: "text-blue-600", bg: "bg-blue-50",
    description: "Ils adaptent le mouvement entre l'actionneur et la charge.",
    items: [
      { 
        name: "Engrenages", 
        info: "Transmission sans glissement.",
        details: "Transmission par obstacle entre roues dentées assurant un rapport constant.",
        principe: "Obstacle mécanique entre dentures successives.",
        entrees_sorties: { entrée: "Vitesse Ω1, Couple C1", sortie: "Vitesse Ω2, Couple C2" },
        caracs: ["r = Zin / Zout", "a = (d1 + d2) / 2"],
        links: [
          { label: "Normes AFNOR : Dentures", url: "#" }
        ],
        img: "https://images.unsplash.com/photo-1530047625168-4b29bf8214ec?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  Capteurs: {
    icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50",
    description: "Ils mesurent les grandeurs physiques pour informer la commande.",
    items: [
      { 
        name: "Codeur Incrémental", 
        info: "Position angulaire précise.",
        details: "Capteur optique générant des impulsions pour déduire la position et la vitesse.",
        principe: "Hachage d'un faisceau lumineux par un disque tournant.",
        entrees_sorties: { entrée: "Position θ", sortie: "Impulsions" },
        caracs: ["Résolution (pts/tr)"],
        links: [
          { label: "Principe du comptage optique", url: "#" }
        ],
        img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  Liaisons: {
    icon: Box, color: "text-rose-600", bg: "bg-rose-50",
    description: "Définissent les mobilités relatives entre deux solides.",
    items: [
      { 
        name: "Liaison Pivot", 
        afnor: "NF EN ISO 3952",
        def_geo: "Axe (O, x₁)",
        degres: { rot: "1 (Rx)", tra: "0" },
        details: "Liaison autorisant une unique rotation autour de son axe.",
        ex_labo: ["Bras Maxpid", "Axe Moteur Cordeuse"],
        img: "https://images.unsplash.com/photo-1516339901600-2e1a62986307?auto=format&fit=crop&q=80&w=600",
        tors_cin: { col1: ["ωx", "0", "0"], col2: ["0", "0", "0"], point: "P", char: "P ∈ (O, x₁)" },
        tors_stat: { col1: ["X", "Y", "Z"], col2: ["0", "M", "N"], point: "P", char: "P ∈ (O, x₁)" },
        schematisation: { ortho: "Projection Orthogonale", persp: "Vue en Perspective" }
      },
      { 
        name: "Liaison Glissière", 
        afnor: "NF EN ISO 3952",
        def_geo: "Direction x₁",
        degres: { rot: "0", tra: "1 (Tx)" },
        details: "Liaison n'autorisant qu'une unique translation suivant un axe.",
        ex_labo: ["Vérin AFP Twingo"],
        img: "https://images.unsplash.com/photo-1530907858209-8ad0c8bd04bc?auto=format&fit=crop&q=80&w=600",
        tors_cin: { col1: ["0", "0", "0"], col2: ["Vx", "0", "0"], point: "P", char: "P Quelconque" },
        tors_stat: { col1: ["0", "Y", "Z"], col2: ["L", "M", "N"], point: "P", char: "P Quelconque" },
        schematisation: { ortho: "Projection Orthogonale", persp: "Vue en Perspective" }
      }
    ]
  }
};

const SYSTEMS = [
  { id: 'maxpid', name: 'Bras asservi Maxpid', image: '/maxpid.jpg', links: { dt: "#", dr: "#" } },
  { id: 'afp', name: 'Assistance Freinage Twingo', image: '/afp.jpg', links: { dt: "#", dr: "#" } },
  { id: 'indexa', name: 'Capsuleuse Indexa', image: '/indexa.jpg', links: { dt: "#", dr: "#" } }
];

export default function LaboPage() {
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const currentItem = (selectedCulture && selectedItemName)
    ? CULTURE_DATA[selectedCulture]?.items.find(i => i.name === selectedItemName)
    : null;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 py-12 text-left">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight uppercase">Laboratoire S2I</h1>
          <p className="text-gray-500 mt-2 text-lg italic font-medium">Exploration technique et modélisation.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {Object.keys(CULTURE_DATA).map((key) => {
            const doc = CULTURE_DATA[key];
            const isSelected = selectedCulture === key;
            return (
              <div key={key} 
                onClick={() => { setSelectedCulture(isSelected ? null : key); setSelectedItemName(null); }} 
                className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-sm ${isSelected ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600' : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'}`}
              >
                <div className={`p-4 rounded-xl ${doc.bg} ${doc.color} mb-4`}><doc.icon size={28} /></div>
                <span className="font-bold text-gray-900 text-xs uppercase tracking-widest">{key}</span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedCulture && (
            <motion.div key="culture-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-indigo-900 text-white rounded-[2rem] p-8 shadow-xl mb-20">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase mb-2 tracking-tight">{selectedCulture}</h2>
                  <p className="text-indigo-200 max-w-xl text-sm leading-relaxed">{CULTURE_DATA[selectedCulture].description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-white text-indigo-900 px-4 py-2.5 rounded-xl font-bold text-xs hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95 uppercase tracking-tighter shadow-sm">
                    <Download size={16} /> Fiche récap
                  </button>
                  <button onClick={() => setSelectedCulture(null)} className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition-colors shadow-sm">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CULTURE_DATA[selectedCulture]?.items.map((item, i) => (
                  <button key={i} 
                    onClick={() => setSelectedItemName(selectedItemName === item.name ? null : item.name)}
                    className={`p-4 rounded-xl transition-all border flex items-center justify-between group shadow-sm ${selectedItemName === item.name ? 'bg-white text-indigo-900 border-white shadow-xl' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    <span className="font-bold text-sm uppercase tracking-tight">{item.name}</span>
                    <ArrowRight size={14} className={`${selectedItemName === item.name ? 'text-indigo-600' : 'text-indigo-400'}`} />
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {currentItem && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-12 pt-12 border-t border-white/10 overflow-hidden">
                    
                    {selectedCulture === 'Liaisons' ? (
                      <div className="bg-white rounded-[1.5rem] p-8 text-gray-900 shadow-2xl">
                        <div className="flex justify-between items-start mb-10">
                          <div>
                            <h3 className="text-4xl font-black uppercase tracking-tight">{currentItem.name}</h3>
                            <div className="flex gap-2 mt-2">
                               <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded">AFNOR : {currentItem.afnor}</span>
                               <span className="text-[10px] font-black text-rose-600 uppercase bg-rose-50 px-2 py-1 rounded">DÉFINITION : {currentItem.def_geo}</span>
                            </div>
                          </div>
                          <button onClick={() => setSelectedItemName(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="space-y-6">
                            <div className="rounded-2xl overflow-hidden h-48 border border-gray-100 shadow-inner">
                              <img src={currentItem.img} className="w-full h-full object-cover" alt={currentItem.name} />
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-center">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><Move size={14}/> Mobilités</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100"><span className="block text-[8px] uppercase font-black text-indigo-400 mb-1">Rotation</span><span className="font-bold text-sm text-gray-700">{currentItem.degres.rot}</span></div>
                                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100"><span className="block text-[8px] uppercase font-black text-indigo-400 mb-1">Translation</span><span className="font-bold text-sm text-gray-700">{currentItem.degres.tra}</span></div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 text-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-2 justify-center"><Layout size={14}/> Schématisations</h4>
                            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50 min-h-[140px] flex flex-col justify-center shadow-inner">
                              <span className="text-[9px] font-bold text-gray-400 uppercase mb-3 italic">{currentItem.schematisation.ortho}</span>
                              <div className="w-32 h-20 mx-auto bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-[9px] text-gray-300 uppercase font-black">Schéma 2D</div>
                            </div>
                            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50 min-h-[140px] flex flex-col justify-center shadow-inner">
                              <span className="text-[9px] font-bold text-gray-400 uppercase mb-3 italic">{currentItem.schematisation.persp}</span>
                              <div className="w-32 h-20 mx-auto bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-[9px] text-gray-300 uppercase font-black">Schéma 3D</div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-2"><FileText size={14}/> Torseurs</h4>
                            <TorsorDisplay title="Cinématique {V}" col1={currentItem.tors_cin.col1} col2={currentItem.tors_cin.col2} point={currentItem.tors_cin.point} characteristic={currentItem.tors_cin.char} />
                            <TorsorDisplay title="Statique {T}" col1={currentItem.tors_stat.col1} col2={currentItem.tors_stat.col2} point={currentItem.tors_stat.point} characteristic={currentItem.tors_stat.char} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-[1.5rem] p-8 text-gray-900 flex flex-col lg:flex-row gap-10 shadow-2xl">
                        <div className="lg:w-1/3 space-y-6">
                          <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-100 h-64 border border-gray-100">
                            <img src={currentItem.img} className="w-full h-full object-cover" alt={currentItem.name} />
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-gray-50 pb-2"><Info size={14}/> Analyse</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{currentItem.details}</p>
                          </div>

                          {/* SECTION RÉFÉRENCES (TITRE INDIGO) */}
                          <div className="pt-4 border-t border-gray-50">
                            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">
                              <Globe size={14}/> Ressources Externes
                            </h4>
                            <div className="flex flex-col gap-2">
                              {currentItem.links?.map((link, idx) => (
                                <a 
                                  key={idx} 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all text-[11px] font-bold border border-transparent hover:border-indigo-100 group/link"
                                >
                                  {link.label}
                                  <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="lg:w-2/3 space-y-8">
                          <div className="flex justify-between items-start">
                            <h3 className="text-3xl font-black uppercase tracking-tight">{currentItem.name}</h3>
                            <button onClick={() => setSelectedItemName(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all"><X size={20} className="text-gray-400" /></button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2"><Activity size={14}/> Physique</h4>
                               <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 italic font-medium">"{currentItem.principe}"</p>
                               <div className="flex items-center gap-3 bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl shadow-sm">
                                  <div className="flex-1 text-center"><span className="block text-[8px] text-indigo-400 uppercase mb-1 font-black">In</span><span className="text-[10px] font-bold text-gray-700 italic">{currentItem.entrees_sorties?.entrée}</span></div>
                                  <ArrowRight size={14} className="text-indigo-300" />
                                  <div className="flex-1 text-center"><span className="block text-[8px] text-indigo-400 uppercase mb-1 font-black">Out</span><span className="text-[10px] font-bold text-gray-700 italic">{currentItem.entrees_sorties?.sortie}</span></div>
                               </div>
                            </div>
                            <div className="space-y-6">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2"><Target size={14}/> Modélisation</h4>
                              <div className="space-y-2">
                                {currentItem.caracs?.map((c, idx) => <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center font-serif text-sm font-medium italic text-indigo-700">{c}</div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION SYSTÈMES */}
        {!selectedCulture && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Cpu className="text-indigo-600" size={24} /> Systèmes du laboratoire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SYSTEMS.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
                  <div className="h-75 overflow-hidden relative border-b border-gray-50">
                    <img src={s.image} className="w-full h-full object-cover" alt={s.name} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-5 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{s.name}</h3>
                    <div className="flex gap-2">
                      <a href={s.links.dt} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 py-2.5 rounded-xl text-[10px] font-black transition-all hover:-translate-y-0.5 hover:shadow-md uppercase tracking-tighter border border-transparent shadow-sm">
                        <FileText size={14} /> Doc. Tech
                      </a>
                      <a href={s.links.dr} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 py-2.5 rounded-xl text-[10px] font-black transition-all hover:-translate-y-0.5 hover:shadow-md uppercase tracking-tighter border border-transparent shadow-sm">
                        <BookOpen size={14} /> Doc. Ress
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}