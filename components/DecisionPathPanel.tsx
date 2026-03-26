import React from 'react';
import { AlternativePath } from '../types';
import { ArrowRight, GitBranch, AlertTriangle, PlayCircle, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DecisionPathPanelProps {
  paths: AlternativePath[];
  isOpen: boolean;
  onClose: () => void;
  onSimulatePath: (path: AlternativePath) => void;
}

const DecisionPathPanel: React.FC<DecisionPathPanelProps> = ({ paths, isOpen, onClose, onSimulatePath }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[520px] bg-slate-950/95 backdrop-blur-xl border-l border-white/10 z-50 shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-slate-900/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20">
            <GitBranch size={22} className="text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white tracking-tight">Neural Path Analysis</h2>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em]">Alternate Realities Detected</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
        >
          <X size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {paths.map((path, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-2xl p-8 border border-white/10 relative group hover:border-sky-500/30 transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-sky-500/30 group-hover:bg-sky-500 transition-colors"></div>
            
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors">
                    <Zap size={18} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">{path.path_name}</h3>
            </div>

            <p className="text-slate-400 text-sm mb-8 leading-relaxed bg-slate-950/50 p-5 rounded-xl border border-white/5 font-sans italic">
              "{path.description}"
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    Feasibility Logic
                </h4>
                <p className="text-sm text-slate-300 pl-5 border-l border-green-500/20 leading-relaxed">{path.why_it_passes_feasibility}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                   <AlertTriangle size={14} className="text-orange-500"/> System Trade-offs
                </h4>
                <ul className="space-y-3 pl-5 border-l border-orange-500/20">
                  {path.key_tradeoffs.map((tradeoff, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-3 group/item">
                      <span className="text-orange-500/50 mt-1 shrink-0 font-mono group-hover/item:text-orange-500 transition-colors">»</span>
                      <span className="group-hover/item:text-slate-200 transition-colors">{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(56, 189, 248, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSimulatePath(path)}
              className="w-full mt-10 py-4 bg-sky-600/10 text-sky-400 hover:text-white border border-sky-500/30 rounded-xl text-xs font-mono font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-lg shadow-sky-500/5 group/btn overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
              <Zap size={18} className="group-hover/btn:scale-125 transition-transform text-yellow-400" />
              <span>Execute Neural Simulation</span>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-slate-900/80 border-t border-white/5 text-center">
        <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">Neural Simulation Engine v4.2.0</p>
      </div>
    </motion.div>
  );
};

export default DecisionPathPanel;