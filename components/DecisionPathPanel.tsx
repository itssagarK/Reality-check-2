import React from 'react';
import { AlternativePath } from '../types';
import { ArrowRight, GitBranch, AlertTriangle } from 'lucide-react';

interface DecisionPathPanelProps {
  paths: AlternativePath[];
  isOpen: boolean;
  onClose: () => void;
}

const DecisionPathPanel: React.FC<DecisionPathPanelProps> = ({ paths, isOpen, onClose }) => {
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
            <div key={index} className="glass-panel rounded-xl p-5 border-l-4 border-l-blue-500">
              <h3 className="text-xl font-bold text-white mb-2">{path.path_name}</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{path.description}</p>
              
              <div className="mb-4">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Why Feasible</h4>
                <p className="text-sm text-gray-400">{path.why_it_passes_feasibility}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                   <AlertTriangle size={12}/> Trade-offs
                </h4>
                <ul className="space-y-2">
                  {path.key_tradeoffs.map((tradeoff, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-orange-400 mt-2 shrink-0"></span>
                      {tradeoff}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionPathPanel;