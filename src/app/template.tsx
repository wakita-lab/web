'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Math.random()}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: 'linear',
          duration: 1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}