"use client";

import { motion } from "framer-motion";

const leafPositions = [
  { x: 96, y: 150, rotate: -20, delay: 1.0 },
  { x: 168, y: 235, rotate: 25, delay: 1.3 },
  { x: 110, y: 330, rotate: -10, delay: 1.6 },
  { x: 190, y: 420, rotate: 20, delay: 1.9 },
  { x: 120, y: 510, rotate: -25, delay: 2.2 },
];

function Leaf({ x, y, rotate, delay }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      transform={`translate(${x} ${y}) rotate(${rotate})`}
    >
      <path
        d="M0 0 C 14 -4, 26 6, 24 20 C 22 32, 8 34, 0 24 C -6 16, -6 6, 0 0 Z"
        fill="#6FAA5F"
        stroke="#2C5A29"
        strokeWidth="1.2"
      />
      <path d="M0 0 C 6 8, 10 16, 12 24" stroke="#2C5A29" strokeWidth="0.8" fill="none" />
    </motion.g>
  );
}

export default function VineAnimation() {
  return (
    <svg
      viewBox="0 0 260 560"
      className="h-[420px] w-full max-w-[240px] md:h-[560px] md:max-w-[260px]"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M60 0 C 20 60, 140 90, 100 150 C 60 210, 200 240, 160 300
           C 120 360, 40 380, 80 440 C 110 490, 150 500, 130 560"
        stroke="#3F7D3A"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {leafPositions.map((leaf) => (
        <Leaf key={`${leaf.x}-${leaf.y}`} {...leaf} />
      ))}
    </svg>
  );
}
