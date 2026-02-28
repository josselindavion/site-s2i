import { Menu, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Identité Gauche */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-indigo-100 shadow-lg group-hover:scale-110 transition-transform">
          <GraduationCap size={24} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-black text-gray-900 tracking-tight text-lg uppercase">S2I ACHARD</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lycée Lakanal • Sceaux</span>
        </div>
      </Link>

      {/* Menu de navigation central */}
      <div className="hidden lg:flex gap-10 text-[13px] font-black text-gray-500 uppercase tracking-wider">
        <Link to="/journal" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        <Link to="/course/pcsi" className="hover:text-indigo-600 transition-colors">PCSI</Link>
        <Link to="/course/mpsi" className="hover:text-indigo-600 transition-colors">MPSI</Link>
        <Link to="/labo" className="hover:text-indigo-600 transition-colors">Laboratoire</Link>
        <Link to="/tipe" className="hover:text-indigo-600 transition-colors">TIPE</Link>
        <Link to="/course/archives" className="hover:text-indigo-600 transition-colors">Archives</Link>
      </div>

      {/* Logo Lakanal cliquable à Droite */}
      <div className="flex items-center gap-6">
        <div className="hidden md:block">
          <a 
            href="https://www.citescolairelakanal.fr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <img 
              src="/logo-lakanal.jpg" 
              alt="Site officiel Lakanal" 
              className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100 cursor-pointer"
            />
          </a>
        </div>
        
        {/* Menu Mobile */}
        <button className="lg:hidden p-2 text-gray-400 hover:text-indigo-600 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}