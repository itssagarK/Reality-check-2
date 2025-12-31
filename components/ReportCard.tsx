import React from 'react';
import { RealityCheckResponse } from '../types';
import RadialScore from './RadialScore';
import { AlertCircle, Activity, Brain, ShieldAlert, StopCircle, RefreshCw } from 'lucide-react';

interface ReportCardProps {
  data: RealityCheckResponse;
  onOpenPaths: () => void;
  onEdit: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ data, onOpenPaths, onEdit }) => {
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
    <div className="w-full h-full space-y-8 pb-20 animate-fade-in">
      
      {/* Header Section with Edit Button (Mobile Only) */}
      <div className="flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold text-white">Audit Results</h2>
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw size={14} />
            Edit & Re-run
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Score Card - Interactive Gauge */}
        <div 
            onClick={onEdit}
            className="glass-panel p-8 rounded-none md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-300 group border-l-4 border-l-cyan-500"
        >
          <RadialScore score={data.reality_score} />
          <div className={`mt-6 px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-widest ${getTagColor(data.reality_tag)}`}>
            {data.reality_tag}
          </div>
          <div className="mt-4 text-[10px] text-gray-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Edit Parameters
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="glass-panel p-8 rounded-none md:col-span-2 flex flex-col justify-center border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3 mb-6 text-red-400">
              <Activity size={20} />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Failure Diagnosis</h3>
            </div>
            <p className="text-2xl md:text-3xl text-white font-medium leading-tight mb-8 font-sans">
              "{data.failure_diagnosis.root_cause_summary}"
            </p>
            <div className="space-y-3">
                {data.failure_diagnosis.primary_reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 text-base text-gray-400">
                    <span className="text-red-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    {reason}
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-8">
        <button 
          onClick={onOpenPaths}
          className="flex-1 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-100 p-8 rounded-none flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
              <Brain size={32} className="text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-base font-bold uppercase tracking-wider text-blue-400 mb-1">Recommended Action</div>
              <div className="text-lg text-blue-200 opacity-90">View {data.alternative_paths.length} Alternative Paths</div>
            </div>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform text-blue-500">→</span>
        </button>

         <div className="flex-1 glass-panel p-8 rounded-none border-l-4 border-l-red-500 flex items-center gap-6">
            <div className="p-4 bg-red-500/10 rounded-full shrink-0">
                <StopCircle size={32} className="text-red-500" />
            </div>
            <div>
                 <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Stop Signal</div>
                 <p className="text-lg text-gray-200 leading-snug font-medium">{data.stop_signal}</p>
            </div>
         </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Overengineering Risk */}
        <div className="glass-panel p-8 rounded-none">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2 text-purple-400">
                <ShieldAlert size={20} />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Overengineering Risk</h3>
             </div>
             <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide
                ${data.overengineering_risk.risk_level === 'high' ? 'bg-red-500/20 text-red-400' : 
                  data.overengineering_risk.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'}`}>
                {data.overengineering_risk.risk_level} RISK
             </span>
          </div>
          
          <div className="mb-6">
             <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Warning Signs</span>
             <ul className="mt-4 space-y-2">
                {data.overengineering_risk.warning_signs.map((sign, i) => (
                    <li key={i} className="text-base text-gray-300 pl-4 border-l-2 border-gray-700">{sign}</li>
                ))}
             </ul>
          </div>

          <div className="bg-purple-500/10 p-5 rounded-none border border-purple-500/20">
             <span className="text-xs text-purple-400 font-bold uppercase block mb-2 tracking-wider">Simplification Advice</span>
             <p className="text-base text-gray-300 italic">"{data.overengineering_risk.simplification_advice}"</p>
          </div>
        </div>

        {/* Likely Consequences */}
        <div className="glass-panel p-8 rounded-none">
           <div className="flex items-center gap-2 text-orange-400 mb-6">
                <AlertCircle size={20} />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Likely Consequences</h3>
             </div>

             <div className="space-y-8">
                <div>
                    <h4 className="text-xs text-gray-500 uppercase mb-3 tracking-wider font-bold">Short Term (1-3 months)</h4>
                    <ul className="space-y-2">
                        {data.likely_consequences.short_term.map((c, i) => (
                            <li key={i} className="text-base text-gray-300 flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0"></span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs text-gray-500 uppercase mb-3 tracking-wider font-bold">Long Term (6+ months)</h4>
                    <ul className="space-y-2">
                        {data.likely_consequences.long_term.map((c, i) => (
                            <li key={i} className="text-base text-gray-300 flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0"></span>
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