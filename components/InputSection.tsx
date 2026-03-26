import React from 'react';
import { UserContext } from '../types';
import { Sparkles, DollarSign, Clock, Trophy, ChevronRight, Zap, Terminal, Loader2 } from 'lucide-react';
import { INITIAL_INPUT_PLACEHOLDER } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onToggleCollapse}
        className="h-full w-full flex flex-col items-center py-8 cursor-pointer hover:bg-white/5 transition-colors group border-r border-white/10 bg-slate-950 relative overflow-hidden"
        title="Expand Audit Parameters"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex-1 flex items-center justify-center relative z-10">
             <span className="writing-vertical-lr transform rotate-180 text-[10px] font-mono font-bold tracking-[0.5em] text-slate-500 group-hover:text-sky-400 transition-colors uppercase whitespace-nowrap">
                System Parameters
             </span>
        </div>
        <div className="mt-auto pb-4 text-slate-700 group-hover:text-sky-500 transition-colors">
          <Terminal size={16} />
        </div>
      </motion.div>
    );
  }

  // --- Expanded State (Terminal Mode) ---
  return (
    <form onSubmit={onSubmit} className={`flex flex-col h-screen w-full bg-slate-950 relative overflow-hidden`}>
       
       {!isSidebar && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-12 pb-8 px-6 shrink-0 relative z-10"
        >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white tracking-tighter uppercase">
              Audit your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">ambition.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-xl font-mono max-w-2xl mx-auto leading-relaxed">
              High-fidelity feasibility analysis powered by neural constraints.<br/>
              <span className="text-slate-600 text-sm mt-2 block uppercase tracking-[0.3em] font-bold">No motivation. Just cold, hard data.</span>
            </p>
        </motion.div>
      )}

      {/* Terminal Container */}
      <motion.div 
        layout
        className={`
          flex flex-col flex-1 relative min-h-0
          ${isSidebar ? 'h-full border-none' : 'max-w-4xl mx-auto w-full border border-white/10 shadow-2xl mb-8 rounded-2xl overflow-hidden'}
          ${isGlowing ? 'shadow-[0_0_50px_rgba(56,189,248,0.15)] border-sky-500/40' : ''}
          bg-slate-900/30 backdrop-blur-md transition-all duration-500
      `}>
          
          {/* Scanline Effect for Input Area */}
          <div className="scan-line"></div>

          {/* Terminal Header */}
          <div className="shrink-0 h-14 flex items-center justify-between px-6 border-b border-white/5 bg-slate-900/80">
              <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2"></div>
                  <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-yellow-500 animate-pulse' : 'bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]'}`}></div>
                      <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-sky-500/80 uppercase">
                          {isAnalyzing ? 'Analyzing_Stream...' : 'Ready_For_Input'}
                      </span>
                  </div>
              </div>
              {isSidebar && onToggleCollapse && (
                  <button type="button" onClick={onToggleCollapse} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg">
                      <ChevronRight size={20} className="rotate-180"/>
                  </button>
              )}
          </div>

          {/* Text Area Container */}
          <div className="flex-1 relative bg-slate-950/20 min-h-0 group"> 
              <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={INITIAL_INPUT_PLACEHOLDER}
                  className={`
                      w-full h-full bg-transparent p-6 md:p-10 resize-none focus:outline-none 
                      font-mono text-base md:text-xl leading-[1.8] text-slate-200 placeholder:text-slate-800
                      selection:bg-sky-500/20
                      scrollbar-hide relative z-10
                  `}
                  spellCheck={false}
              />
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10"></div>
          </div>

          {/* Constraints & Actions Footer */}
          <div className="shrink-0 border-t border-white/5 bg-slate-900/90 z-20 backdrop-blur-md">
              <div className={`
                  grid grid-cols-1 ${isParametersVisible ? 'md:grid-cols-4' : 'md:grid-cols-1'} gap-4 p-6
              `}>
                  <AnimatePresence>
                    {isParametersVisible && (
                      <>
                        {/* Budget */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-slate-950/50 p-4 rounded-xl flex flex-col gap-1.5 transition-all border border-sky-500/30 hover:border-sky-500/60 group/input"
                        >
                            <label className="text-[10px] font-bold text-sky-400/70 uppercase flex items-center gap-2 mb-1 group-hover/input:text-sky-400 transition-colors">
                                  <DollarSign size={12}/> Budget
                            </label>
                            <input 
                                type="text" 
                                value={context.budget}
                                onChange={(e) => onContextChange({...context, budget: e.target.value})}
                                placeholder="UNSET"
                                className="bg-transparent text-sm text-white focus:outline-none font-mono placeholder:text-slate-700 w-full font-bold tracking-wider"
                            />
                        </motion.div>

                        {/* Hours */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: 0.05 }}
                          className="bg-slate-950/50 p-4 rounded-xl flex flex-col gap-1.5 transition-all border border-indigo-500/30 hover:border-indigo-500/60 group/input"
                        >
                            <label className="text-[10px] font-bold text-indigo-400/70 uppercase flex items-center gap-2 mb-1 group-hover/input:text-indigo-400 transition-colors">
                                  <Clock size={12}/> Time Allocation
                            </label>
                            <div className="flex items-center gap-2">
                              <input 
                                  type="number" 
                                  step="0.5"
                                  value={context.hoursPerDay}
                                  onChange={(e) => onContextChange({...context, hoursPerDay: parseFloat(e.target.value)})}
                                  className="bg-transparent text-sm text-white focus:outline-none font-mono placeholder:text-slate-700 w-full font-bold tracking-wider"
                              />
                              <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">hrs/d</span>
                            </div>
                        </motion.div>

                        {/* Skill */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: 0.1 }}
                          className="bg-slate-950/50 p-4 rounded-xl flex flex-col gap-1.5 transition-all border border-violet-500/30 hover:border-violet-500/60 group/input"
                        >
                            <label className="text-[10px] font-bold text-violet-400/70 uppercase flex items-center gap-2 mb-1 group-hover/input:text-violet-400 transition-colors">
                                  <Trophy size={12}/> Proficiency
                            </label>
                            <select 
                                value={context.skillLevel}
                                onChange={(e) => onContextChange({...context, skillLevel: e.target.value as any})}
                                className="bg-transparent text-sm text-white focus:outline-none font-mono appearance-none cursor-pointer w-full font-bold tracking-wider"
                            >
                                <option value="Beginner" className="bg-slate-950">Level: 01 (Beginner)</option>
                                <option value="Intermediate" className="bg-slate-950">Level: 02 (Intermediate)</option>
                                <option value="Expert" className="bg-slate-950">Level: 03 (Expert)</option>
                            </select>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* Action Button */}
                  <button
                      type="submit"
                      disabled={!input.trim() || isAnalyzing}
                      className={`h-full min-h-[64px] rounded-xl font-display font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn
                        ${isAnalyzing 
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20 active:scale-95'
                        }`}
                  >
                      {isAnalyzing ? (
                        <div className="flex items-center gap-3">
                          <Loader2 size={18} className="animate-spin" />
                          <span>Processing_Data</span>
                        </div>
                      ) : (
                        <>
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                           <span>Initiate Audit</span> 
                           <Zap size={18} className="text-yellow-300 fill-yellow-300 group-hover/btn:scale-125 transition-transform" />
                        </>
                      )}
                  </button>
              </div>
          </div>
      </motion.div>
    </form>
  );
};

export default InputSection;