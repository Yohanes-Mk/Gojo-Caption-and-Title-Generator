import React from 'react';
import { Youtube, Instagram, Linkedin } from 'lucide-react';
import { platforms } from '../data/platforms';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformChange: (platformId: string) => void;
}

const platformIcons = {
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  ),
  instagram: Instagram,
  linkedin: Linkedin,
};

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onPlatformChange
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">Choose Platform</h2>
        <p className="text-slate-400 text-lg">Select where you'll be publishing your content</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          const IconComponent = platformIcons[platform.id as keyof typeof platformIcons];
          
          return (
            <button
              key={platform.id}
              onClick={() => onPlatformChange(platform.id)}
              className={`platform-card rounded-xl p-6 text-left transition-all duration-300 ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-3 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'bg-slate-700/50 text-slate-400'
                }`}>
                  <IconComponent />
                </div>
                <div className="text-center">
                  <h3 className={`font-medium ${
                    isSelected ? 'text-primary-300' : 'text-slate-300'
                  }`}>
                    {platform.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {platform.characteristics[0]}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};