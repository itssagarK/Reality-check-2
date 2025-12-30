import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface RadialScoreProps {
  score: number;
}

const RadialScore: React.FC<RadialScoreProps> = ({ score }) => {
  const getColor = (s: number) => {
    if (s < 30) return '#ef4444'; // Red
    if (s < 50) return '#f97316'; // Orange
    if (s < 65) return '#eab308'; // Yellow
    if (s < 80) return '#84cc16'; // Lime
    return '#22c55e'; // Green
  };

  const data = [
    {
      name: 'Score',
      value: score,
      fill: getColor(score),
    },
  ];

  return (
    <div className="w-full h-48 flex items-center justify-center relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <span className="text-5xl font-mono font-bold text-white tracking-tighter">{score}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Reality Score</span>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="80%" 
            outerRadius="100%" 
            barSize={10} 
            data={data} 
            startAngle={180} 
            endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.05)' }}
            dataKey="value"
            cornerRadius={30}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialScore;