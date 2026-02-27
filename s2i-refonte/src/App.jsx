import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import CoursePage from './pages/CoursePage';
import LaboPage from './pages/LaboPage';
import TipePage from './pages/TipePage'; 
import JournalPage from './pages/JournalPage'; // 1. Import du Carnet de bord
import { BookOpen, Cpu, FlaskConical, Database, Lightbulb, Activity } from 'lucide-react'; // 2. Ajout Activity

const Home = () => (
  <main className="max-w-6xl mx-auto px-6 py-20">
    {/* Section Intro Sobre et Centrée */}
    <div className="max-w-3xl mb-24 mx-auto text-center">
      <h1 className="text-5xl font-black text-gray-900 mb-10 tracking-tight">
        Sciences Industrielles <br /> de l'Ingénieur
      </h1>
      
      <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
        <p>
          Ce site est dédié aux étudiants en <span className="font-semibold text-gray-900">C.P.G.E. au Lycée Lakanal (92330 Sceaux)</span> dans les classes de PCSI, MPSI et MP.
        </p>
        <p>
          Il propose différentes ressources pédagogiques et pratiques relatives aux filières PCSI et MPSI/MP. 
          Il s'agit d'un espace à destination des étudiants et des collègues pour centraliser les documents de l'année.
        </p>
        
        <div className="flex justify-center pt-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] border-t border-gray-100 pt-6 px-12">
            Franck ACHARD — Professeur de S2I
          </p>
        </div>
      </div>
    </div>

    {/* Grille de Navigation Mise à jour (6 cartes) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/journal"> {/* 3. Nouvelle Carte Journal */}
        <CourseCard title="Carnet de bord" description="Suivi quotidien des séances et activités." Icon={Activity} />
      </Link>
      <Link to="/course/pcsi">
        <CourseCard title="Filière PCSI" description="Ressources de 1ère année." Icon={FlaskConical} />
      </Link>
      <Link to="/course/mpsi">
        <CourseCard title="MPSI / MP" description="Contenu MPSI et MP." Icon={BookOpen} />
      </Link>
      <Link to="/labo">
        <CourseCard title="Laboratoire" description="Systèmes et fiches techniques." Icon={Cpu} />
      </Link>
      <Link to="/tipe">
        <CourseCard title="TIPE" description="Calendrier, ressources et dépôts." Icon={Lightbulb} />
      </Link>
      <Link to="/course/archives">
        <CourseCard title="Archives" description="Annales et documents passés." Icon={Database} />
      </Link>
    </div>
  </main>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/labo" element={<LaboPage />} />
          <Route path="/tipe" element={<TipePage />} />
          <Route path="/journal" element={<JournalPage />} /> {/* 4. Nouvelle Route */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}