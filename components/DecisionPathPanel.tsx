import React from 'react';
import { AlternativePath } from '../types';
import { ArrowRight, GitBranch, AlertTriangle, PlayCircle } from 'lucide-react';

interface DecisionPathPanelProps {
  paths: AlternativePath[];
  isOpen: boolean;
  onClose: () => void;
  onSimulatePath: (path: AlternativePath) => void;
}

const DecisionPathPanel: React.FC<DecisionPathPanelProps> = ({ paths, isOpen, onClose, onSimulatePath }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0a0a0f] border-l border-glass-border transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } shadow-2xl overflow-y-auto`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-blue-400">
            <GitBranch size={20} />
            <h2 className="text-lg font-bold tracking-wider uppercase">Decision Path Analysis</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {paths.map((path, index) => (
            <div key={index} className="glass-panel rounded-xl p-6 border-l-4 border-l-blue-500 relative group hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400">
                      <GitBranch size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{path.path_name}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">{path.description}</p>
              
              <div className="mb-6">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    Why Feasible
                </h4>
                <p className="text-sm text-gray-400 pl-3 border-l border-green-500/30">{path.why_it_passes_feasibility}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <AlertTriangle size={14}/> Trade-offs
                </h4>
                <ul className="space-y-3 pl-3 border-l border-orange-500/30">
                  {path.key_tradeoffs.map((tradeoff, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5 shrink-0">›</span>
                      {tradeoff}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onSimulatePath(path)}
                className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <PlayCircle size={18} />
                Analyze This Path
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionPathPanel;