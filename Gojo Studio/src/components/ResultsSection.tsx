import React, { useState } from 'react';
import { Copy, Check, Crown, Zap, BookOpen, Users } from 'lucide-react';
import { GeneratedContent } from '../types';
import { platforms } from '../data/platforms';

interface ResultsSectionProps {
  content: GeneratedContent;
  platform: string;
}

const styleIcons = {
  'Educational': BookOpen,
  'Casual': Users,
  'Viral Hook': Zap,
  'Story Time': Users,
  'Aesthetic': Crown,
  'Personal': Users,
  'Professional': BookOpen,
  'Thought Leadership': Crown,
};

export const ResultsSection: React.FC<ResultsSectionProps> = ({ content, platform }) => {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const selectedPlatform = platforms.find(p => p.id === platform);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatCaptionWithHashtags = (caption: any) => {
    return caption.hashtags ? `${caption.text}\n\n${caption.hashtags}` : caption.text;
  };

  return (
    <div className="space-y-12 animate-slide-up">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-slate-100 mb-3">Your Content is Ready</h2>
        <p className="text-slate-400 text-lg">Copy and customize as needed</p>
      </div>

      {/* Title Section */}
      <div className="elegant-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Crown className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100">
                {selectedPlatform?.name} Title
              </h3>
              <p className="text-slate-400">Optimized for engagement</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(content.title, 'title')}
            className={`copy-button px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
              copiedItems.has('title') ? 'copied' : ''
            }`}
          >
            {copiedItems.has('title') ? (
              <>
                <Check size={18} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy Title</span>
              </>
            )}
          </button>
        </div>
        
        <div className="content-output rounded-xl p-6">
          <p className="text-slate-200 font-medium text-xl leading-relaxed">
            {content.title}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              {content.title.length}/{selectedPlatform?.maxTitleLength} characters
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-400 font-medium">Optimal length</span>
            </div>
          </div>
        </div>
      </div>

      {/* Captions Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-100 mb-2">Caption Variations</h3>
          <p className="text-slate-400">Choose the style that matches your brand</p>
        </div>
        
        {content.captions.map((caption, index) => {
          const fullCaption = formatCaptionWithHashtags(caption);
          const captionId = `caption-${index}`;
          const IconComponent = styleIcons[caption.style as keyof typeof styleIcons] || BookOpen;
          
          return (
            <div key={index} className="elegant-card rounded-2xl p-8 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-slate-600/50 rounded-lg">
                    <IconComponent className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
                    {caption.style}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(fullCaption, captionId)}
                  className={`copy-button px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    copiedItems.has(captionId) ? 'copied' : ''
                  }`}
                >
                  {copiedItems.has(captionId) ? (
                    <>
                      <Check size={18} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>Copy Caption</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="content-output rounded-xl p-6 space-y-4">
                <p className="text-slate-200 whitespace-pre-line leading-relaxed text-lg">
                  {caption.text}
                </p>
                
                {caption.hashtags && (
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-primary-400 font-medium">
                      {caption.hashtags}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-slate-500">
                    {fullCaption.length}/{selectedPlatform?.maxCaptionLength} characters
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-green-400 font-medium">Perfect length</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};