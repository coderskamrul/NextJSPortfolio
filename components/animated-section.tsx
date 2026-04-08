"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function FadeIn({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  className, 
  delay = 0,
  direction = "left" 
}: AnimatedSectionProps & { direction?: "left" | "right" | "up" | "down" }) {
  const variants = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: -50 },
    down: { x: 0, y: 50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
