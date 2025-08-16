import React from 'react';
import { FileText, Link2 } from 'lucide-react';

interface InputSectionProps {
  description: string;
  referenceContent: string;
  onDescriptionChange: (value: string) => void;
  onReferenceContentChange: (value: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  description,
  referenceContent,
  onDescriptionChange,
  onReferenceContentChange
}) => {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <FileText className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-100">Video Description</h3>
            <p className="text-slate-400">Describe what your content is about</p>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Tell us about your video content. What's the main topic? Who's your target audience? What key points will you cover?"
            className="elegant-input w-full min-h-32 p-4 rounded-xl resize-none text-lg placeholder:text-slate-500"
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-sm text-slate-500">
            {description.length}/500
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-slate-600/50 rounded-lg">
            <Link2 className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-100">
              Reference Content
              <span className="text-sm font-normal text-slate-500 ml-3">(optional)</span>
            </h3>
            <p className="text-slate-400">Add inspiration or style references</p>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={referenceContent}
            onChange={(e) => onReferenceContentChange(e.target.value)}
            placeholder="Share links to content you admire, or describe the style you're going for (e.g., 'Casual and funny like MrBeast' or 'Professional like TED Talks')"
            className="elegant-input w-full min-h-24 p-4 rounded-xl resize-none text-lg placeholder:text-slate-500"
            maxLength={300}
          />
          <div className="absolute bottom-3 right-3 text-sm text-slate-500">
            {referenceContent.length}/300
          </div>
        </div>
      </div>
    </div>
  );
};