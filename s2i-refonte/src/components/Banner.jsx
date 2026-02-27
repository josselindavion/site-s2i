import { useState } from 'react';
import { X } from 'lucide-react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between text-sm font-medium">
      <div className="flex-1 text-center">🚀 Nouvelle version du site S2I Achard en ligne !</div>
      <button onClick={() => setIsVisible(false)}><X size={16} /></button>
    </div>
  );
}