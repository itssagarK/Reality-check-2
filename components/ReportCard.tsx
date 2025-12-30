import React from 'react';
import { RealityCheckResponse } from '../types';
import RadialScore from './RadialScore';
import { AlertCircle, Activity, Brain, ShieldAlert, StopCircle } from 'lucide-react';

interface ReportCardProps {
  data: RealityCheckResponse;
  onOpenPaths: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ data, onOpenPaths }) => {
  const getTagColor = (tag: string) => {
    switch (tag.toUpperCase()) {
      case 'POSSIBLE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'POSSIBLE WITH CHANGES': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'UNLIKELY': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'IMPOSSIBLE': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="glass-panel p-6 rounded-2xl md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden">
          <RadialScore score={data.reality_score} />
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${getTagColor(data.reality_tag)}`}>
            {data.reality_tag}
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="glass-panel p-6 rounded-2xl md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <Activity size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Failure Diagnosis</h3>
            </div>
            <p className="text-lg text-white font-medium leading-relaxed mb-4">
              "{data.failure_diagnosis.root_cause_summary}"
            </p>
          </div>
          <div className="space-y-2">
            {data.failure_diagnosis.primary_reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-500 mt-1">•</span>
                {reason}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={onOpenPaths}
          className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-100 p-4 rounded-xl flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
              <Brain size={20} className="text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold uppercase tracking-wider text-blue-400">Recommended Action</div>
              <div className="text-sm text-blue-200 opacity-80">View {data.alternative_paths.length} Alternative Paths</div>
            </div>
          </div>
          <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </button>

         <div className="flex-1 glass-panel p-4 rounded-xl border-l-4 border-l-red-500 flex items-center gap-4">
            <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                <StopCircle size={24} className="text-red-500" />
            </div>
            <div>
                 <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">Stop Signal</div>
                 <p className="text-sm text-gray-300 leading-tight">{data.stop_signal}</p>
            </div>
         </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Overengineering Risk */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-purple-400">
                <ShieldAlert size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Overengineering Risk</h3>
             </div>
             <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase
                ${data.overengineering_risk.risk_level === 'high' ? 'bg-red-500/20 text-red-400' : 
                  data.overengineering_risk.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'}`}>
                {data.overengineering_risk.risk_level}
             </span>
          </div>
          
          <div className="mb-4">
             <span className="text-xs text-gray-500 uppercase">Warning Signs</span>
             <ul className="mt-2 space-y-1">
                {data.overengineering_risk.warning_signs.map((sign, i) => (
                    <li key={i} className="text-sm text-gray-300 pl-3 border-l border-gray-700">{sign}</li>
                ))}
             </ul>
          </div>

          <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
             <span className="text-xs text-purple-400 font-bold uppercase block mb-1">Simplification Advice</span>
             <p className="text-sm text-gray-300 italic">{data.overengineering_risk.simplification_advice}</p>
          </div>
        </div>

        {/* Likely Consequences */}
        <div className="glass-panel p-6 rounded-2xl">
           <div className="flex items-center gap-2 text-orange-400 mb-4">
                <AlertCircle size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Likely Consequences</h3>
             </div>

             <div className="space-y-4">
                <div>
                    <h4 className="text-xs text-gray-500 uppercase mb-2">Short Term (1-3 months)</h4>
                    <ul className="space-y-1">
                        {data.likely_consequences.short_term.map((c, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-gray-500 mt-2 shrink-0"></span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs text-gray-500 uppercase mb-2">Long Term (6+ months)</h4>
                    <ul className="space-y-1">
                        {data.likely_consequences.long_term.map((c, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-gray-500 mt-2 shrink-0"></span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
        </div>
      </div>

    </div>
  );
};

export default ReportCard;