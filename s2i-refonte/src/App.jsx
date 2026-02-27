import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import CoursePage from './pages/CoursePage';
import LaboPage from './pages/LaboPage';
import { BookOpen, Cpu, FlaskConical, Database } from 'lucide-react';

const Home = () => (
  <main className="max-w-7xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-black mb-4 tracking-tight text-gray-900">
        Sciences Industrielles
      </h1>
      <p className="text-gray-500 text-lg">
        Toutes les ressources CPGE pour le Lycée Lakanal.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link to="/course/pcsi">
        <CourseCard title="PCSI" description="Cours et TP de 1ère année." Icon={FlaskConical} />
      </Link>
      <Link to="/course/mpsi">
        <CourseCard title="MPSI / MP" description="Contenu pour les classes de maths-physique." Icon={BookOpen} />
      </Link>
      <Link to="/labo">
        <CourseCard title="Labo S2I" description="Systèmes et fiches techniques." Icon={Cpu} />
      </Link>
      <Link to="/course/archives">
        <CourseCard title="Archives" description="Statistiques et annales de concours." Icon={Database} />
      </Link>
    </div>
  </main>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/labo" element={<LaboPage />} />
        </Routes>
      </div>
    </Router>
  );
}