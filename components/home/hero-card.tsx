"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Braces, Database } from "lucide-react";
import { CountUp, BlurReveal } from "@/components/scroll/scroll-primitives";

const stats = [
  { label: "Active Users", value: 100, suffix: "K+", icon: Database, color: "text-cyan-400" },
  { label: "Problems Solved", value: 1500, suffix: "+", icon: Code2, color: "text-green-400" },
  { label: "Years Exp", value: 2, suffix: "+", icon: Terminal, color: "text-yellow-400" },
  { label: "Plugins Built", value: 5, suffix: "+", icon: Braces, color: "text-purple-400" },
];

export function HeroCard() {

  return (
    <section className="flex items-center justify-center overflow-hidden">
      {/* Animated grid */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar */}
        <BlurReveal direction="up" className="mt-16 lg:mt-20">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 p-1">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ backgroundColor: "rgba(100, 200, 180, 0.05)", y: -2 }}
                  className={`p-4 md:p-6 text-center transition-colors ${
                    index < stats.length - 1 ? "border-r border-primary/10" : ""
                  }`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <div className={`text-2xl md:text-3xl font-bold font-mono ${stat.color} mb-1`}>
                    <CountUp to={stat.value} suffix={stat.suffix} duration={1.6 + index * 0.2} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
