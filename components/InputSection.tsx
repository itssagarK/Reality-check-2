import React from 'react';
import { UserContext } from '../types';
import { Sparkles, DollarSign, Clock, Trophy, ChevronRight, Edit2 } from 'lucide-react';
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
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
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
  onToggleParameters,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const isAnalyzing = status === 'analyzing';

  // --- Collapsed State (Spine Mode) ---
  if (isCollapsed && isSidebar) {
    return (
      <div 
        onClick={onToggleCollapse}
        className="h-full w-full flex flex-col items-center py-6 cursor-pointer hover:bg-white/5 transition-colors group border-r border-white/10 bg-slate-950"
        title="Expand Audit Parameters"
      >
        <div className="flex-1 flex items-center justify-center">
             <span className="writing-vertical-lr transform rotate-180 text-xs font-mono font-bold tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors uppercase whitespace-nowrap">
                Audit Parameters
             </span>
        </div>
      </div>
    );
  }

  // --- Expanded State (Terminal Mode) ---
  return (
    <form onSubmit={onSubmit} className={`flex flex-col h-screen w-full bg-slate-950 relative overflow-hidden`}>
       
       {!isSidebar && (
        <div className="text-center pt-8 pb-4 px-4 animate-fade-in-up shrink-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white tracking-tight">
              Audit your ambition.
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-mono">
              Evidence-based feasibility analysis.<br/>No motivation, just data.
            </p>
        </div>
      )}

      {/* Terminal Container */}
      <div className={`
          flex flex-col flex-1 relative min-h-0
          ${isSidebar ? 'h-full border-none' : 'max-w-3xl mx-auto w-full border border-white/10 shadow-2xl mb-4'}
          ${isGlowing ? 'shadow-[0_0_40px_rgba(56,189,248,0.1)] border-sky-500/40' : ''}
          bg-slate-900/50 transition-all duration-300
      `}>
          
          {/* Terminal Header - Only visible in sidebar mode */}
          {isSidebar && (
            <div className="shrink-0 h-14 flex items-center justify-between px-6 border-b border-white/5 bg-slate-900">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-sm ${isAnalyzing ? 'bg-yellow-500 animate-pulse' : 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]'}`}></div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-sky-500/70 uppercase">
                        Input // Audit Parameters
                    </span>
                </div>
                {onToggleCollapse && (
                    <button type="button" onClick={onToggleCollapse} className="text-slate-600 hover:text-white transition-colors">
                        <ChevronRight size={18} className="rotate-180"/>
                    </button>
                )}
            </div>
          )}

          {/* Text Area Container - Fills available vertical space */}
          <div className="flex-1 relative bg-slate-900/50 min-h-0"> 
              <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={INITIAL_INPUT_PLACEHOLDER}
                  className={`
                      w-full h-full bg-transparent p-5 md:p-8 resize-none focus:outline-none 
                      font-mono text-base md:text-lg leading-[1.8] text-slate-200 placeholder:text-slate-700
                      selection:bg-sky-900/50
                      scrollbar-hide
                  `}
                  spellCheck={false}
              />
          </div>

          {/* Constraints & Actions Footer (Merged) */}
          <div className="shrink-0 border-t border-white/5 bg-slate-900 z-20">
              <div className={`
                  grid grid-cols-1 ${isParametersVisible ? 'md:grid-cols-4' : 'md:grid-cols-1'} gap-4 p-4
              `}>
                  {isParametersVisible && (
                    <>
                      {/* Budget - Sky Glow */}
                      <div className="bg-slate-950 p-3 flex flex-col gap-1 transition-colors border border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                          <label className="text-[10px] font-bold text-sky-400 uppercase flex items-center gap-2 mb-1">
                                <DollarSign size={12}/> Budget
                          </label>
                          <input 
                              type="text" 
                              value={context.budget}
                              onChange={(e) => onContextChange({...context, budget: e.target.value})}
                              placeholder="N/A"
                              className="bg-transparent text-sm text-white focus:outline-none font-mono placeholder:text-slate-600 w-full font-bold"
                          />
                      </div>

                      {/* Hours - Indigo Glow (Numeric Input) */}
                      <div className="bg-slate-950 p-3 flex flex-col gap-1 transition-colors relative border border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                          <label className="text-[10px] font-bold text-indigo-400 uppercase flex items-center gap-2 mb-1">
                                <Clock size={12}/> Time (Hrs/Day)
                          </label>
                          <input 
                              type="number" 
                              step="0.5"
                              value={context.hoursPerDay}
                              onChange={(e) => onContextChange({...context, hoursPerDay: parseFloat(e.target.value)})}
                              className="bg-transparent text-sm text-white focus:outline-none font-mono placeholder:text-slate-600 w-full font-bold"
                          />
                      </div>

                      {/* Skill - Violet Glow */}
                      <div className="bg-slate-950 p-3 flex flex-col gap-1 transition-colors border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                          <label className="text-[10px] font-bold text-violet-400 uppercase flex items-center gap-2 mb-1">
                                <Trophy size={12}/> Skill
                          </label>
                          <select 
                              value={context.skillLevel}
                              onChange={(e) => onContextChange({...context, skillLevel: e.target.value as any})}
                              className="bg-transparent text-sm text-white focus:outline-none font-mono appearance-none cursor-pointer w-full font-bold"
                          >
                              <option value="Beginner" className="bg-slate-950">Beginner</option>
                              <option value="Intermediate" className="bg-slate-950">Intermediate</option>
                              <option value="Expert" className="bg-slate-950">Expert</option>
                          </select>
                      </div>
                    </>
                  )}

                  {/* Action Button - Moved Inline */}
                  <button
                      type="submit"
                      disabled={!input.trim() || isAnalyzing}
                      className={`h-full min-h-[58px] font-mono font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all flex items-center justify-center gap-2
                        ${isAnalyzing 
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]'
                        }`}
                  >
                      {isAnalyzing ? (
                        <>Processing...</>
                      ) : (
                        <>
                           Run Audit <Sparkles size={16} fill="white" />
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