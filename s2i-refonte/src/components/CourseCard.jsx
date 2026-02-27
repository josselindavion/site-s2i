import { ArrowRight } from 'lucide-react';

export default function CourseCard({ title, description, Icon }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{description}</p>
      <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
        Accéder aux ressources <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
}