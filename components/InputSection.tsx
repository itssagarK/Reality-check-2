import React from 'react';
import { UserContext } from '../types';
import { Sparkles, DollarSign, Clock, Trophy, Settings2, ChevronDown } from 'lucide-react';
import { INITIAL_INPUT_PLACEHOLDER } from '../constants';

interface InputSectionProps {
  input: string;
  context: UserContext;
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  onInputChange: (val: string) => void;
  onContextChange: (ctx: UserContext) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSidebar?: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
  isGlowing?: boolean;
  isParametersVisible?: boolean;
  onToggleParameters?: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  input, 
  context, 
  status, 
  onInputChange, 
  onContextChange, 
  onSubmit,
  isSidebar = false,
  inputRef,
  isGlowing = false,
  isParametersVisible = true,
  onToggleParameters
}) => {
  const isAnalyzing = status === 'analyzing';

  return (
    <form onSubmit={onSubmit} className={`flex flex-col h-full ${isSidebar ? '' : 'max-w-2xl mx-auto'}`}>
       {!isSidebar && (
        <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
              Audit your ambition.
            </h2>
            <p className="text-gray-400 text-lg">
              Evidence-based feasibility analysis. No motivation, just data.
            </p>
        </div>
      )}

      {/* Main Container with Neon Gradient Border Effect */}
      <div 
        className={`
            relative flex flex-col transition-all duration-500 ease-in-out
            ${isSidebar 
                ? 'h-full md:rounded-none rounded-b-2xl p-[1.5px]' 
                : 'glass-panel rounded-2xl p-2'
            }
            ${isGlowing ? 'shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-[1.01]' : 'shadow-none scale-100'}
        `}
        style={isSidebar ? {
            background: 'linear-gradient(180deg, rgba(34,211,238,1) 0%, rgba(124,58,237,1) 100%)',
            boxShadow: '0 0 5px rgba(124,58,237, 0.5)'
        } : {}}
      >
        {/* Inner Content Container */}
        <div className={`
            flex flex-col h-full w-full bg-[#050505] relative overflow-hidden
            ${isSidebar ? 'md:rounded-none rounded-b-[14px]' : 'rounded-xl'}
        `}>
            
            {/* Main Text Area - Dynamic Height */}
            <div className={`
                relative flex-grow transition-all duration-500
                ${isSidebar ? 'min-h-[500px]' : 'min-h-[50vh]'}
            `}>
                {/* Aurora Glow Effect for Text Area (Active State) */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isGlowing || !isParametersVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm"></div>
                </div>

                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder={INITIAL_INPUT_PLACEHOLDER}
                    className={`
                        w-full h-full bg-transparent text-white p-6 focus:outline-none placeholder:text-gray-600 font-mono resize-none
                        ${isSidebar ? 'text-sm' : 'text-lg'}
                        scrollbar-hide
                    `}
                    style={{
                        overflowY: 'auto'
                    }}
                />
            </div>

            {/* Collapsed Parameters Breadcrumb */}
            {isSidebar && !isParametersVisible && (
                <button
                    type="button"
                    onClick={onToggleParameters}
                    className="w-full py-3 px-6 border-t border-white/5 hover:bg-white/5 flex items-center justify-between group transition-colors"
                >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors">
                        <Settings2 size={14} />
                        <span>Edit Parameters</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-1 rounded">
                            {context.budget || '$0'} • {context.hoursPerDay}h • {context.skillLevel}
                        </span>
                        <ChevronDown size={14} className="text-gray-500 transform rotate-180" />
                    </div>
                </button>
            )}

            {/* Evidence & Constraints - Collapsible Section */}
            <div className={`
                transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden
                ${isParametersVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className={`
                    px-6 py-6 space-y-4
                    ${isSidebar 
                        ? 'border-t border-white/5 bg-gradient-to-t from-white/[0.03] to-transparent' 
                        : 'bg-black/20 border-t border-white/5'
                    }
                `}>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Evidence & Constraints</h3>
                        {isSidebar && onToggleParameters && (
                             <button type="button" onClick={onToggleParameters} className="text-gray-600 hover:text-white transition-colors">
                                <ChevronDown size={14} />
                             </button>
                        )}
                    </div>
                    
                    {/* Grid for inputs */}
                    <div className={`grid gap-4 ${isSidebar ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                        
                        {/* Budget */}
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 focus-within:border-cyan-500/50 transition-colors">
                            <DollarSign size={18} className="text-green-400 shrink-0"/>
                            <div className="w-full">
                                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Budget</span>
                                <input 
                                    type="text" 
                                    value={context.budget}
                                    onChange={(e) => onContextChange({...context, budget: e.target.value})}
                                    placeholder="e.g. $500"
                                    className="bg-transparent w-full text-sm focus:outline-none text-white placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 focus-within:border-cyan-500/50 transition-colors">
                            <Clock size={18} className="text-blue-400 shrink-0"/>
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold mb-1">
                                    <span>Daily Hours</span>
                                    <span className="text-white font-mono">{context.hoursPerDay}h</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0.5" 
                                    max="12" 
                                    step="0.5"
                                    value={context.hoursPerDay}
                                    onChange={(e) => onContextChange({...context, hoursPerDay: parseFloat(e.target.value)})}
                                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Skill Level */}
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 focus-within:border-cyan-500/50 transition-colors relative">
                            <Trophy size={18} className="text-yellow-400 shrink-0"/>
                            <div className="w-full">
                                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Skill Level</span>
                                <select 
                                    value={context.skillLevel}
                                    onChange={(e) => onContextChange({...context, skillLevel: e.target.value as any})}
                                    className="bg-transparent w-full text-sm focus:outline-none text-white appearance-none cursor-pointer"
                                >
                                    <option value="Beginner" className="bg-black text-gray-300">Beginner</option>
                                    <option value="Intermediate" className="bg-black text-gray-300">Intermediate</option>
                                    <option value="Expert" className="bg-black text-gray-300">Expert</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button - Pinned to bottom */}
            <div className={`
                p-4 shrink-0
                ${isSidebar ? 'bg-black/40 border-t border-white/5' : 'bg-black/40 border-t border-white/5'}
            `}>
            <button
                type="submit"
                disabled={!input.trim() || isAnalyzing}
                className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 
                    ${isAnalyzing 
                        ? 'bg-purple-900/50 text-purple-300 cursor-wait' 
                        : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    }`}
            >
                {isAnalyzing ? (
                    <>Analyzing...</>
                ) : (
                    <>
                    {status === 'complete' ? 'Re-Audit Plan' : 'Run Audit'}
                    <Sparkles size={16} />
                    </>
                )}
            </button>
            </div>
        </div>
      </div>
    </form>
  );
};

export default InputSection;