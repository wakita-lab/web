'use client';

import { motion } from 'framer-motion';
import React from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        type: 'linear',
        duration: 1.5,
      }}
    >
      {children}
    </motion.div>
  );
}