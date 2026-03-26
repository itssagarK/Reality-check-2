import React from 'react';
import { RealityCheckResponse } from '../types';
import RadialScore from './RadialScore';
import RiskRadar from './RiskRadar';
import { AlertCircle, Activity, Brain, ShieldAlert, StopCircle, RefreshCw, AlertTriangle, XCircle, TrendingUp, TrendingDown, Clock, PieChart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';

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
          <h2 className="text-xl font-display font-bold text-white">Audit Results</h2>
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <RefreshCw size={14} />
            Edit & Re-run
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Score Card - Interactive Gauge */}
        <div 
            onClick={onEdit}
            className="glass-panel p-8 rounded-none md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-300 group border-l-4 border-l-sky-500"
        >
          <RadialScore score={data.reality_score} />
          <div className={`mt-6 px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-widest ${getTagColor(data.reality_tag)}`}>
            {data.reality_tag}
          </div>
          <div className="mt-4 text-[10px] text-slate-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Edit Parameters
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="glass-panel p-8 rounded-none md:col-span-2 flex flex-col justify-center border-l-4 border-l-indigo-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Activity size={120} />
            </div>
            <div className="flex items-center gap-3 mb-6 text-indigo-400 relative z-10">
              <Activity size={20} />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Failure Diagnosis</h3>
            </div>
            <p className="text-2xl md:text-3xl text-white font-display font-medium leading-tight mb-8 relative z-10">
              "{data.failure_diagnosis.root_cause_summary}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {data.failure_diagnosis.primary_reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-950/40 border border-white/5 rounded-lg hover:bg-slate-950/60 transition-colors">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold shrink-0 border border-indigo-500/30">
                        {idx + 1}
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed">{reason}</span>
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-8">
        <button 
          onClick={onOpenPaths}
          className="flex-1 bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-sky-100 p-8 rounded-none flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-sky-500/20 rounded-full group-hover:bg-sky-500/30 transition-colors">
              <Brain size={32} className="text-sky-400" />
            </div>
            <div className="text-left">
              <div className="text-base font-bold uppercase tracking-wider text-sky-400 mb-1">Recommended Action</div>
              <div className="text-lg text-sky-200 opacity-90">View {data.alternative_paths.length} Alternative Paths</div>
            </div>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform text-sky-500">→</span>
        </button>

         <div className="flex-1 glass-panel p-8 rounded-none border-l-4 border-l-red-500 flex items-center gap-6">
            <div className="p-4 bg-red-500/10 rounded-full shrink-0">
                <StopCircle size={32} className="text-red-500" />
            </div>
            <div>
                 <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Stop Signal</div>
                 <p className="text-lg text-slate-200 leading-snug font-display font-medium">{data.stop_signal}</p>
            </div>
         </div>
      </div>

      {/* Common Mistakes & Risk Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Common Mistakes Section */}
          {data.common_mistakes && data.common_mistakes.length > 0 && (
            <div className="glass-panel p-8 rounded-none border-l-4 border-l-yellow-500 md:col-span-2">
                <div className="flex items-center gap-3 mb-6 text-yellow-400">
                  <AlertTriangle size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Common Mistakes to Avoid</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.common_mistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-base text-gray-300 bg-black/20 p-4 border border-white/5">
                        <XCircle size={18} className="text-yellow-500 mt-0.5 shrink-0" />
                        <span>{mistake}</span>
                    </div>
                    ))}
                </div>
            </div>
          )}

          {/* Risk Profile Radar */}
          <div className="glass-panel p-8 rounded-none border-l-4 border-l-sky-500 md:col-span-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6 text-sky-400">
                  <PieChart size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Risk Profile</h3>
              </div>
              <RiskRadar data={data} />
          </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Overengineering Risk */}
        <div className="glass-panel p-8 rounded-none">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2 text-indigo-400">
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

          {/* Risk Level Bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
               <div className={`h-full transition-all duration-1000 ${
                  data.overengineering_risk.risk_level === 'low' ? 'w-1/3 bg-green-500' :
                  data.overengineering_risk.risk_level === 'medium' ? 'w-2/3 bg-yellow-500' :
                  'w-full bg-red-500'
               }`}></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
               <span className={data.overengineering_risk.risk_level === 'low' ? 'text-green-500' : ''}>Low</span>
               <span className={data.overengineering_risk.risk_level === 'medium' ? 'text-yellow-500' : ''}>Medium</span>
               <span className={data.overengineering_risk.risk_level === 'high' ? 'text-red-500' : ''}>High</span>
            </div>
          </div>
          
          <div className="mb-6">
             <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Warning Signs</span>
             <ul className="mt-4 space-y-2">
                {data.overengineering_risk.warning_signs.map((sign, i) => (
                    <li key={i} className="text-base text-slate-300 pl-4 border-l-2 border-slate-700">{sign}</li>
                ))}
             </ul>
          </div>

          <div className="bg-indigo-500/10 p-5 rounded-none border border-indigo-500/20">
             <span className="text-xs text-indigo-400 font-bold uppercase block mb-2 tracking-wider">Simplification Advice</span>
             <p className="text-base text-slate-300 italic">"{data.overengineering_risk.simplification_advice}"</p>
          </div>
        </div>

        {/* Likely Consequences */}
        <div className="glass-panel p-8 rounded-none">
           <div className="flex items-center gap-2 text-orange-400 mb-6">
                <AlertCircle size={20} />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Likely Consequences</h3>
             </div>

             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-orange-500 bg-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(249,115,22,0.5)] z-10">
                         <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                     </div>
                     <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-950/40 p-5 border border-white/5 rounded-none">
                         <div className="flex items-center gap-2 mb-3">
                             <Clock size={14} className="text-orange-400" />
                             <h4 className="text-xs text-orange-400 uppercase tracking-wider font-bold">Short Term (1-3 months)</h4>
                         </div>
                         <ul className="space-y-2">
                             {data.likely_consequences.short_term.map((c, i) => (
                                 <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                     <span className="text-orange-500 mt-1 shrink-0">›</span>
                                     {c}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
                 
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-500 bg-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                         <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                     </div>
                     <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-950/40 p-5 border border-white/5 rounded-none">
                         <div className="flex items-center gap-2 mb-3">
                             <TrendingUp size={14} className="text-slate-400" />
                             <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold">Long Term (6+ months)</h4>
                         </div>
                         <ul className="space-y-2">
                             {data.likely_consequences.long_term.map((c, i) => (
                                 <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                     <span className="text-slate-500 mt-1 shrink-0">›</span>
                                     {c}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
              </div>
        </div>
      </div>

    </div>
  );
};

export default ReportCard;