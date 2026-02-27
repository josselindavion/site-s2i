import { Search, Menu, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-indigo-100 shadow-lg group-hover:scale-110 transition-transform">
          <GraduationCap size={24} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-black text-gray-900 tracking-tight text-lg">S2I ACHARD</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lycée Lakanal • Sceaux</span>
        </div>
      </Link>

      {/* Menu de navigation 100% homogène */}
      <div className="hidden lg:flex gap-10 text-[13px] font-bold text-gray-500 uppercase tracking-wider">
        <Link to="/course/pcsi" className="hover:text-indigo-600 transition-colors">Filière PCSI</Link>
        <Link to="/course/mpsi" className="hover:text-indigo-600 transition-colors">Filière MPSI / MP</Link>
        <Link to="/labo" className="hover:text-indigo-600 transition-colors">Laboratoire</Link>
        <Link to="/tipe" className="hover:text-indigo-600 transition-colors">TIPE</Link>
        <Link to="/course/archives" className="hover:text-indigo-600 transition-colors">Archives</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 text-gray-400 focus-within:border-indigo-200 focus-within:bg-white transition-all">
          <Search size={16} />
          <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none text-sm text-gray-700 w-32" />
        </div>
        <button className="lg:hidden p-2 text-gray-400"><Menu size={24} /></button>
      </div>
    </nav>
  );
}