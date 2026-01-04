import { MapPin } from 'lucide-react';
import { Scene } from '../../types/alleyGame';

interface SceneDisplayProps {
  scene: Scene;
}

export const SceneDisplay = ({ scene }: SceneDisplayProps) => {
  return (
    <div
      className={`bg-gradient-to-br from-[#14161A] to-[#0B0D10] border-2 p-6 text-center
                  ${scene.isRare ? 'border-yellow-400 animate-pulse' : 'border-[#00FF9C]'}`}
      style={{
        transform: 'rotate(-0.3deg)',
        boxShadow: scene.isRare ? '0 0 20px rgba(234, 179, 8, 0.5)' : 'none',
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className={`w-5 h-5 ${scene.isRare ? 'text-yellow-400' : 'text-[#00FF9C]'}`} />
        <h2
          className={`text-2xl font-black uppercase tracking-wider
                      ${scene.isRare ? 'text-yellow-400' : 'text-[#00FF9C]'}`}
          style={{
            textShadow: scene.isRare ? '0 0 10px rgba(234, 179, 8, 0.8)' : '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {scene.name}
        </h2>
      </div>
      <p className="text-gray-400 text-sm italic font-mono">{scene.description}</p>
    </div>
  );
};
