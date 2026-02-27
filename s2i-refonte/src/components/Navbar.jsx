import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 text-white font-bold p-1.5 rounded-lg shadow-sm">S2I</div>
        <span className="font-bold text-gray-900">Achard CPGE</span>
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
        <a href="/course/pcsi" className="hover:text-indigo-600 transition-colors">PCSI</a>
        <a href="/course/mpsi" className="hover:text-indigo-600 transition-colors">MPSI / MP</a>
        <a href="/labo" className="hover:text-indigo-600 transition-colors">Laboratoire</a>
      </div>

      <div className="flex items-center gap-4 text-gray-400">
        <Search size={20} className="cursor-pointer hover:text-indigo-600 transition-colors" />
        <Menu size={20} className="md:hidden cursor-pointer" />
      </div>
    </nav>
  );
}