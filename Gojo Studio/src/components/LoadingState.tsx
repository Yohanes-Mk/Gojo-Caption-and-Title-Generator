import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="elegant-card rounded-2xl p-16 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary-400 animate-pulse" />
          </div>
          <div className="absolute -inset-4 border-2 border-primary-500/30 rounded-full animate-ping"></div>
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-slate-100">
            Crafting Your Content
          </h3>
          <p className="text-slate-400 text-lg max-w-md">
            Our AI is analyzing your input and generating platform-optimized content
          </p>
        </div>

        <div className="flex items-center space-x-8 text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
            <span>Analyzing content</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <span>Optimizing for platform</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <span>Generating variations</span>
          </div>
        </div>
      </div>
    </div>
  );
};