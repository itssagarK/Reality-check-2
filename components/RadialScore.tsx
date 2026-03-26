import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface RadialScoreProps {
  score: number;
}

const RadialScore: React.FC<RadialScoreProps> = ({ score }) => {
  const springScore = useSpring(0, { stiffness: 40, damping: 20 });
  const displayScore = useTransform(springScore, (latest) => Math.round(latest));

  useEffect(() => {
    springScore.set(score);
  }, [score, springScore]);

  const getColor = (s: number) => {
    if (s < 30) return '#ef4444'; // Red
    if (s < 50) return '#f97316'; // Orange
    if (s < 65) return '#eab308'; // Yellow
    if (s < 80) return '#84cc16'; // Lime
    return '#22c55e'; // Green
  };

  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const halfCircumference = circumference / 2;
  const offset = halfCircumference - (score / 100) * halfCircumference;

  return (
    <div className="w-full h-56 flex items-center justify-center relative group">
      {/* Background Glow */}
      <div 
        className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: getColor(score) }}
      ></div>

      <svg width="220" height="140" viewBox="0 0 220 140" className="relative z-10">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getColor(score)} stopOpacity="0.5" />
            <stop offset="100%" stopColor={getColor(score)} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <path
          d="M 30 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress Track */}
        <motion.path
          initial={{ strokeDashoffset: halfCircumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d="M 30 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={halfCircumference}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Ticks */}
        {[...Array(11)].map((_, i) => {
          const angle = 180 + (i * 18);
          const rad = (angle * Math.PI) / 180;
          const x1 = 110 + 85 * Math.cos(rad);
          const y1 = 110 + 85 * Math.sin(rad);
          const x2 = 110 + 95 * Math.cos(rad);
          const y2 = 110 + 95 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i * 10 <= score ? getColor(score) : "rgba(255,255,255,0.1)"}
              strokeWidth="1"
              className="transition-colors duration-500"
            />
          );
        })}
      </svg>

      {/* Score Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none z-20">
        <div className="flex items-baseline">
          <motion.span className="text-6xl font-display font-bold text-white tracking-tighter">
            {displayScore}
          </motion.span>
          <span className="text-xl font-mono font-bold text-slate-600 ml-1">%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em]">Reality Index</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full transition-all duration-500 ${i * 20 < score ? 'bg-sky-500 shadow-[0_0_5px_rgba(56,189,248,0.5)]' : 'bg-slate-800'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RadialScore;