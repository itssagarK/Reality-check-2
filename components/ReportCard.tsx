import React from 'react';
import { RealityCheckResponse } from '../types';
import RadialScore from './RadialScore';
import RiskRadar from './RiskRadar';
import { AlertCircle, Activity, Brain, ShieldAlert, StopCircle, RefreshCw, AlertTriangle, XCircle, TrendingUp, TrendingDown, Clock, PieChart, ChevronRight, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full space-y-8 pb-24"
    >
      
      {/* Header Section with Edit Button (Mobile Only) */}
      <div className="flex justify-between items-center md:hidden px-4">
          <h2 className="text-xl font-display font-bold text-white tracking-tight">Audit Results</h2>
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-widest"
          >
            <RefreshCw size={14} />
            Re-calibrate
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Score Card - Interactive Gauge */}
        <motion.div 
            variants={itemVariants}
            onClick={onEdit}
            className="glass-panel p-10 rounded-2xl md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-500 group border border-white/10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
          <RadialScore score={data.reality_score} />
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`mt-8 px-6 py-2 rounded-full text-xs font-mono font-bold border uppercase tracking-[0.3em] ${getTagColor(data.reality_tag)} shadow-lg shadow-black/20`}
          >
            {data.reality_tag}
          </motion.div>
          <div className="mt-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <Zap size={10} /> Recalibrate Parameters
          </div>
        </motion.div>

        {/* Diagnosis Card */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel p-10 rounded-2xl md:col-span-2 flex flex-col justify-center border border-white/10 relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-50"></div>
            <div className="absolute -right-12 -top-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                <Activity size={300} />
            </div>
            <div className="flex items-center gap-3 mb-8 text-indigo-400 relative z-10">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Activity size={18} />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em]">Neural Diagnosis // Root Cause</h3>
            </div>
            <p className="text-3xl md:text-4xl text-white font-display font-bold leading-tight mb-10 relative z-10 tracking-tight">
              <span className="text-indigo-500/50 mr-2">"</span>
              {data.failure_diagnosis.root_cause_summary}
              <span className="text-indigo-500/50 ml-2">"</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {data.failure_diagnosis.primary_reasons.map((reason, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-5 bg-slate-950/40 border border-white/5 rounded-xl hover:bg-slate-950/60 transition-colors group/item"
                >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold shrink-0 border border-indigo-500/20 group-hover/item:bg-indigo-500/20 transition-colors">
                        0{idx + 1}
                    </div>
                    <span className="text-sm text-slate-400 leading-relaxed group-hover/item:text-slate-200 transition-colors">{reason}</span>
                </motion.div>
                ))}
            </div>
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-8">
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenPaths}
          className="flex-1 bg-sky-600/5 hover:bg-sky-600/10 border border-sky-500/20 text-sky-100 p-10 rounded-2xl flex items-center justify-between transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0 -translate-x-full group-hover:animate-shimmer"></div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="p-5 bg-sky-500/10 rounded-2xl group-hover:bg-sky-500/20 transition-colors border border-sky-500/20">
              <Brain size={36} className="text-sky-400" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-400 mb-2">Strategic Pivot</div>
              <div className="text-xl font-display font-bold text-sky-100 opacity-90">Explore {data.alternative_paths.length} Neural Paths</div>
            </div>
          </div>
          <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform text-sky-500/50 group-hover:text-sky-500" />
        </motion.button>

         <motion.div 
            variants={itemVariants}
            className="flex-1 glass-panel p-10 rounded-2xl border border-white/10 flex items-center gap-8 relative overflow-hidden group"
         >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
            <div className="p-5 bg-red-500/10 rounded-2xl shrink-0 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                <StopCircle size={36} className="text-red-500" />
            </div>
            <div className="relative z-10">
                 <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-red-400 mb-2">Termination Signal</div>
                 <p className="text-xl text-slate-200 leading-snug font-display font-bold tracking-tight">{data.stop_signal}</p>
            </div>
         </motion.div>
      </div>

      {/* Common Mistakes & Risk Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Common Mistakes Section */}
          {data.common_mistakes && data.common_mistakes.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="glass-panel p-10 rounded-2xl border border-white/10 md:col-span-2 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                <div className="flex items-center gap-3 mb-8 text-yellow-500">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle size={18} />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em]">System Vulnerabilities // Mistakes</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.common_mistakes.map((mistake, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 text-sm text-slate-400 bg-slate-950/40 p-5 border border-white/5 rounded-xl hover:text-slate-200 transition-colors"
                    >
                        <XCircle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{mistake}</span>
                    </motion.div>
                    ))}
                </div>
            </motion.div>
          )}

          {/* Risk Profile Radar */}
          <motion.div 
            variants={itemVariants}
            className="glass-panel p-10 rounded-2xl border border-white/10 md:col-span-1 flex flex-col justify-center relative overflow-hidden"
          >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
              <div className="flex items-center gap-3 mb-8 text-sky-400">
                  <div className="p-2 bg-sky-500/10 rounded-lg">
                    <PieChart size={18} />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em]">Risk Vector Analysis</h3>
              </div>
              <div className="flex-1 min-h-[250px] flex items-center justify-center">
                <RiskRadar data={data} />
              </div>
          </motion.div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Overengineering Risk */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel p-10 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-3 text-indigo-400">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <ShieldAlert size={18} />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em]">Complexity Audit</h3>
             </div>
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] border
                ${data.overengineering_risk.risk_level === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                  data.overengineering_risk.risk_level === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                  'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                {data.overengineering_risk.risk_level} CRITICALITY
             </span>
          </div>

          {/* Risk Level Bar */}
          <div className="mb-10">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-[1px]">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: data.overengineering_risk.risk_level === 'low' ? '33.33%' :
                           data.overengineering_risk.risk_level === 'medium' ? '66.66%' : '100%' 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                    data.overengineering_risk.risk_level === 'low' ? 'bg-green-500 shadow-green-500/20' :
                    data.overengineering_risk.risk_level === 'medium' ? 'bg-yellow-500 shadow-yellow-500/20' :
                    'bg-red-500 shadow-red-500/20'
                  }`}
               />
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] font-bold">
               <span className={data.overengineering_risk.risk_level === 'low' ? 'text-green-500' : ''}>Minimal</span>
               <span className={data.overengineering_risk.risk_level === 'medium' ? 'text-yellow-500' : ''}>Moderate</span>
               <span className={data.overengineering_risk.risk_level === 'high' ? 'text-red-500' : ''}>Extreme</span>
            </div>
          </div>
          
          <div className="mb-8">
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-bold block mb-6">Anomaly Detection</span>
             <ul className="space-y-4">
                {data.overengineering_risk.warning_signs.map((sign, i) => (
                    <li key={i} className="text-sm text-slate-400 pl-5 border-l-2 border-slate-800 hover:border-indigo-500 transition-colors py-1">{sign}</li>
                ))}
             </ul>
          </div>

          <div className="bg-indigo-500/5 p-6 rounded-xl border border-indigo-500/10 relative group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Brain size={24} />
             </div>
             <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block mb-3 tracking-[0.3em]">Optimization Protocol</span>
             <p className="text-sm text-slate-300 italic leading-relaxed">"{data.overengineering_risk.simplification_advice}"</p>
          </div>
        </motion.div>

        {/* Likely Consequences */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel p-10 rounded-2xl border border-white/10 relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
           <div className="flex items-center gap-3 text-orange-400 mb-10">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <AlertCircle size={18} />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em]">Temporal Projections</h3>
             </div>

             <div className="space-y-10 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                 {/* Short Term */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                     <div className="flex items-center justify-center w-6 h-6 rounded-full border border-orange-500/50 bg-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10">
                         <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                     </div>
                     <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] bg-slate-950/40 p-6 border border-white/5 rounded-2xl hover:bg-slate-950/60 transition-all group-hover:border-orange-500/20">
                         <div className="flex items-center gap-3 mb-4">
                             <Clock size={16} className="text-orange-400" />
                             <h4 className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.3em] font-bold text-center">T+ 90 Days</h4>
                         </div>
                         <ul className="space-y-3">
                             {data.likely_consequences.short_term.map((c, i) => (
                                 <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                                     <span className="text-orange-500/50 mt-1 shrink-0 font-mono">»</span>
                                     {c}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
                 
                 {/* Long Term */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                     <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-700 bg-slate-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                         <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                     </div>
                     <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] bg-slate-950/40 p-6 border border-white/5 rounded-2xl hover:bg-slate-950/60 transition-all group-hover:border-slate-500/20">
                         <div className="flex items-center gap-3 mb-4">
                             <TrendingUp size={16} className="text-slate-500" />
                             <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-bold">T+ 180 Days</h4>
                         </div>
                         <ul className="space-y-3">
                             {data.likely_consequences.long_term.map((c, i) => (
                                 <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                                     <span className="text-slate-600 mt-1 shrink-0 font-mono">»</span>
                                     {c}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
              </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default ReportCard;