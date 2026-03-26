import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="initial"
      animate="animate"
    >
      {/* Outer Hexagon */}
      <motion.path
        d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 2, ease: "easeInOut" }
          }
        }}
      />
      
      {/* Inner Neural Nodes / Core */}
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="currentColor"
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: { 
            scale: [0, 1.2, 1], 
            opacity: 1,
            transition: { delay: 1, duration: 0.5 }
          }
        }}
      />
      
      {/* Check Mark - The "Reality Check" symbol */}
      <motion.path
        d="M35 50L45 60L65 40"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: { 
            pathLength: 1, 
            opacity: 1,
            transition: { delay: 1.5, duration: 0.8, ease: "easeOut" }
          }
        }}
      />
      
      {/* Connection Lines */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { 
              pathLength: 1, 
              opacity: 0.3,
              transition: { delay: 2 + i * 0.1, duration: 0.5 }
            }
          }}
        />
      ))}
      
      {/* Pulsing Core Glow */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="currentColor"
        className="opacity-20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
};

export default Logo;
