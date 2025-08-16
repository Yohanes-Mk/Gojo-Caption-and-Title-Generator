import React, { useState } from 'react';
import { PlatformSelector } from './components/PlatformSelector';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { LoadingState } from './components/LoadingState';
import { generateContent } from './utils/contentGenerator';
import { GeneratedContent } from './types';
import { Sparkles, Lightbulb } from 'lucide-react';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [description, setDescription] = useState('');
  const [referenceContent, setReferenceContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const content = await generateContent({
        platform: selectedPlatform,
        description: description.trim(),
        referenceContent: referenceContent.trim() || undefined
      });
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = description.trim().length > 10;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 bg-primary-500/20 rounded-2xl">
                <Sparkles className="w-8 h-8 text-primary-400" />
              </div>
              <h1 className="text-5xl font-semibold text-slate-100">
                GOJO Content Studio
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Generate compelling titles and captions that drive engagement. 
              Tailored for each platform's unique audience and algorithm.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {/* Platform Selection */}
          <div className="elegant-card rounded-2xl p-10">
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
          </div>

          {/* Input Section */}
          <div className="elegant-card rounded-2xl p-10">
            <InputSection
              description={description}
              referenceContent={referenceContent}
              onDescriptionChange={setDescription}
              onReferenceContentChange={setReferenceContent}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={`elegant-button px-12 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                !canGenerate || isGenerating ? '' : 'hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Content...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Content</span>
                </div>
              )}
            </button>
          </div>

          {/* Results */}
          {isGenerating && <LoadingState />}

          {generatedContent && !isGenerating && (
            <ResultsSection
              content={generatedContent}
              platform={selectedPlatform}
            />
          )}

          {/* Tips Section */}
          {!generatedContent && !isGenerating && (
            <div className="elegant-card rounded-2xl p-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-100">Tips for Better Results</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-400 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Be Specific</h4>
                      <p className="text-slate-400 leading-relaxed">Include your target audience, main topic, and key takeaways for more targeted results</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-400 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Add Context</h4>
                      <p className="text-slate-400 leading-relaxed">Mention your niche, video format, and the tone you want to achieve</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-400 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Use References</h4>
                      <p className="text-slate-400 leading-relaxed">Share examples of content you admire to guide the style and tone</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-400 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Platform Matters</h4>
                      <p className="text-slate-400 leading-relaxed">Each platform has unique audience expectations and content formats</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;