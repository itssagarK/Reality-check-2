import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { RealityCheckResponse } from '../types';

interface RiskRadarProps {
  data: RealityCheckResponse;
}

const RiskRadar: React.FC<RiskRadarProps> = ({ data }) => {
  const riskLevelValue = data.overengineering_risk.risk_level === 'high' ? 3 : data.overengineering_risk.risk_level === 'medium' ? 2 : 1;
  
  const chartData = [
    {
      subject: 'Overengineering',
      A: riskLevelValue * 33, // scale to ~100
      fullMark: 100,
    },
    {
      subject: 'Short-term Impact',
      A: Math.min(data.likely_consequences.short_term.length * 25, 100),
      fullMark: 100,
    },
    {
      subject: 'Long-term Impact',
      A: Math.min(data.likely_consequences.long_term.length * 25, 100),
      fullMark: 100,
    },
    {
      subject: 'Common Mistakes',
      A: Math.min((data.common_mistakes?.length || 0) * 20, 100),
      fullMark: 100,
    },
    {
      subject: 'Failure Points',
      A: Math.min(data.failure_diagnosis.primary_reasons.length * 25, 100),
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Risk Profile"
            dataKey="A"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
            itemStyle={{ color: '#06b6d4' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskRadar;
