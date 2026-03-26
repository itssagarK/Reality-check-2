import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { RealityCheckResponse } from '../types';

interface RiskRadarProps {
  data: RealityCheckResponse;
}

const RiskRadar: React.FC<RiskRadarProps> = ({ data }) => {
  const chartData = [
    {
      subject: 'Complexity',
      A: data.overengineering_risk.risk_level === 'high' ? 90 : data.overengineering_risk.risk_level === 'medium' ? 60 : 30,
      fullMark: 100,
    },
    {
      subject: 'Instability',
      A: Math.min(data.likely_consequences.short_term.length * 25, 100),
      fullMark: 100,
    },
    {
      subject: 'Debt',
      A: Math.min(data.likely_consequences.long_term.length * 25, 100),
      fullMark: 100,
    },
    {
      subject: 'Errors',
      A: Math.min((data.common_mistakes?.length || 0) * 20, 100),
      fullMark: 100,
    },
    {
      subject: 'Criticality',
      A: Math.min(data.failure_diagnosis.primary_reasons.length * 25, 100),
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(148, 163, 184, 0.8)', fontSize: 10, fontWeight: 'bold', letterSpacing: '0.1em' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Risk Vector"
            dataKey="A"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              border: '1px solid rgba(56, 189, 248, 0.2)', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              fontSize: '10px',
              fontFamily: 'monospace'
            }}
            itemStyle={{ color: '#38bdf8' }}
            cursor={{ stroke: '#38bdf8', strokeWidth: 1 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskRadar;
